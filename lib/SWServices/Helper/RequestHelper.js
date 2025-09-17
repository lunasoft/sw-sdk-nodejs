const helper = require("./Helper.js");

/**
 * Clase centralizada para manejar requests HTTP a los servicios de SW
 * Soporta los servicios: stamp, issue, retencion
 */
class RequestHelper {
	/**
	 * Envía una petición multipart/form-data al servicio especificado.
	 * @param {string} url 					– URL base del servicio.
	 * @param {string} token 				– Token de autenticación.
	 * @param {string} xml 					– XML a procesar.
	 * @param {'stamp'|'issue'|'retencion'} serviceType – Tipo de servicio.
	 * @param {'v1'|'v2'|'v3'|'v4'} version – Versión del servicio.
	 * @param {boolean} isB64 				– Indica si el XML está en base64.
	 * @param {Function} callback 			– (error, JSON response)
	 */
	static sendRequest(url, token, xml, serviceType, version, isB64, callback) {
		this._sendRequest(url, token, xml, serviceType, version, isB64, callback);
	}

	/**
	 * Envía una petición multipart/form-data al servicio V4 especificado.
	 * @param {string} url 					– URL base del servicio.
	 * @param {string} token 				– Token de autenticación.
	 * @param {string} xml 					– XML a procesar.
	 * @param {'stamp'|'issue'|'retencion'} serviceType – Tipo de servicio.
	 * @param {'v1'|'v2'|'v3'|'v4'} version – Versión del servicio.
	 * @param {boolean} isB64 				– Indica si el XML está en base64.
	 * @param {Function} callback 			– (error, JSON response)
	 * @param {Object} customHeaders 		– Headers personalizados adicionales.
	 */
	static sendRequestV4(url, token, xml, serviceType, version, isB64, callback, customHeaders = {}) {
		this._sendRequestV4(url, token, xml, serviceType, version, isB64, callback, customHeaders);
	}

	/**
	 * Método privado para enviar requests estándar (v1-v3).
	 * @private
	 */
	static _sendRequest(url, token, xml, serviceType, version, isB64, callback) {
		const { url: hostname, module: httpModule, agent } = helper.getUrlAndModule(url);

		const delimiter = '-------------' + helper.uniqid();
		const fileFields = {
			xml: {
				type: "text/xml",
				content: xml
			}
		};

		let data = "";

		Object.keys(fileFields).forEach(function (name) {
			const file = fileFields[name];
			data += `--${delimiter}\r\n`;
			data += `Content-Disposition: form-data; name="${name}"; `;
			data += `filename="${name}"\r\n`;
			data += `Content-Type: ${file.type}\r\n`;
			data += "\r\n";
			data += `${file.content}\r\n`;
		});

		data += `--${delimiter}--\r\n`;

		const pathSuffix = isB64 ? '/b64' : '';
		const path = this._buildPath(serviceType, version, pathSuffix, false);
		
		const options = {
			hostname,
			path,
			method: "POST",
			headers: {
				"Content-Type": `multipart/form-data; boundary=${delimiter}`,
				"Content-Length": Buffer.byteLength(data, 'utf8'),
				"Authorization": `Bearer ${token}`
			},
			agent: agent
		};

		const req = httpModule.request(options, (res) => {
			const body = [];

			res.on('data', (d) => {
				body.push(d);
			});

			try {
				res.on('end', () => {
					const responseBody = Buffer.concat(body).toString();
					if (res.statusCode !== 200) {
						const errRes = responseBody ? JSON.parse(responseBody) : {
							status: 'error',
							message: res.statusCode,
							messageDetail: res.statusMessage
						};
						callback(errRes, null);
					} else {
						callback(null, JSON.parse(responseBody));
					}
				});
			} catch (e) {
				console.error(`Error en sendRequest para ${serviceType}`, e);
				callback(e, null);
			}
		});

		req.on('error', (e) => {
			console.error(`Error en sendRequest para ${serviceType}`, e);
			const errRes = {
				status: 'error',
				message: e.code,
				messageDetail: e.message
			};
			callback(errRes, null);
		});

		req.write(data);
		req.end();
	}

	/**
	 * Método privado para enviar requests V4.
	 * @private
	 */
	static _sendRequestV4(url, token, xml, serviceType, version, isB64, callback, customHeaders = {}) {
		const { url: hostname, module: httpModule, agent } = helper.getUrlAndModule(url);

		const delimiter = '-------------' + helper.uniqid();
		const fileFields = {
			xml: {
				type: "text/xml",
				content: xml
			}
		};

		let data = "";

		Object.keys(fileFields).forEach(function (name) {
			const file = fileFields[name];
			data += `--${delimiter}\r\n`;
			data += `Content-Disposition: form-data; name="${name}"; `;
			data += `filename="${name}"\r\n`;
			data += `Content-Type: ${file.type}\r\n`;
			data += "\r\n";
			data += `${file.content}\r\n`;
		});

		data += `--${delimiter}--\r\n`;

		const pathSuffix = isB64 ? '/b64' : '';
		const path = this._buildPath(serviceType, version, pathSuffix, true);

		const defaultHeaders = {
			"Content-Type": `multipart/form-data; boundary=${delimiter}`,
			"Content-Length": Buffer.byteLength(data, 'utf8'),
			"Authorization": `Bearer ${token}`
		};

		const headers = { ...defaultHeaders, ...customHeaders };

		const optionsReq = {
			hostname,
			path,
			method: "POST",
			headers,
			agent
		};

		const req = httpModule.request(optionsReq, (res) => {
			const body = [];

			res.on('data', (d) => {
				body.push(d);
			});

			try {
				res.on('end', () => {
					const responseBody = Buffer.concat(body).toString();
					if (res.statusCode !== 200) {
						const errRes = responseBody ? JSON.parse(responseBody) : {
							status: 'error',
							message: res.statusCode,
							messageDetail: res.statusMessage
						};
						callback(errRes, null);
					} else {
						callback(null, JSON.parse(responseBody));
					}
				});
			} catch (e) {
				console.error(`Error en sendRequestV4 para ${serviceType}`, e);
				callback(e, null);
			}
		});

		req.on('error', (e) => {
			console.error(`Error en sendRequestV4 para ${serviceType}`, e);
			const errRes = {
				status: 'error',
				message: e.code,
				messageDetail: e.message
			};
			callback(errRes, null);
		});

		req.write(data);
		req.end();
	}

	/**
	 * Construye el path del endpoint según el tipo de servicio y versión.
	 * @private
	 * @param {'stamp'|'issue'|'retencion'} serviceType – Tipo de servicio.
	 * @param {'v1'|'v2'|'v3'|'v4'} version – Versión del servicio.
	 * @param {string} pathSuffix – Sufijo del path (ej: '/b64').
	 * @param {boolean} isV4 – Indica si es versión V4.
	 * @returns {string} Path construido.
	 */
	static _buildPath(serviceType, version, pathSuffix, isV4) {
		const v4Prefix = isV4 ? '/v4' : '';
		
		// El servicio de retenciones tiene un path diferente
		if (serviceType === 'retencion') {
			return `${v4Prefix}/retencion/stamp/${version}${pathSuffix}`;
		}
		
		// Para stamp e issue usan el path estándar
		return `${v4Prefix}/cfdi33/${serviceType}/${version}${pathSuffix}`;
	}
}

module.exports = RequestHelper;
