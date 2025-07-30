const helper = require("../Helper/Helper.js");

class StampRequest {
	/**
	 * Envía una petición al servicio de Timbrado Corporativo.
	 * @param {string} url 					– URL base del servicio.
	 * @param {string} token 				– Token de autenticación.
	 * @param {string} xml 					– XML a timbrar.
	 * @param {'v1'|'v2'|'v3'|'v4'} version – Versión del servicio.
	 * @param {boolean} isB64 				– Indica si el XML está en base64.
	 * @param {Function} callback 			– (error, JSON response)
	 */
	static sendReq(url, token, xml, version, isB64, callback) {
		this._sendRequest(url, token, xml, version, isB64, callback);
	}

	static sendReqV4(url, token, xml, version, isB64, callback, customHeaders) {
		this._sendRequestV4(url, token, xml, version, isB64, callback, customHeaders);
	}

	static _sendRequest(url, token, xml, version, isB64, callback) {
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
		const options = {
			hostname,
			path: `/cfdi33/stamp/${version}${pathSuffix}`,
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
					if (res.statusCode !== 200) {
						const errRes = body ? JSON.parse(body) : {
							status: 'error',
							message: res.statusCode,
							messageDetail: res.statusMessage
						};
						callback(errRes, null);
					} else {
						callback(null, JSON.parse(body));
					}
				});
			} catch (e) {
				console.error(`Error en sendReq${isB64 ? 'B64' : ''}`, e);
				callback(e, null);
			}
		});

		req.on('error', (e) => {
			console.error(`Error en sendReq${isB64 ? 'B64' : ''}`, e);
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

/*----------------------------------------------------------ServiceV4Stamp----------------------------------------------------------*/
	static _sendRequestV4(url, token, xml, version, isB64, callback, customHeaders = {}) {
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
		const defaultHeaders = {
			"Content-Type": `multipart/form-data; boundary=${delimiter}`,
			"Content-Length": Buffer.byteLength(data, 'utf8'),
			"Authorization": `Bearer ${token}`
		};

		const headers = { ...defaultHeaders, ...customHeaders };

		const optionsReq = {
			hostname,
			path: `/v4/cfdi33/stamp/${version}${pathSuffix}`,
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
				console.error(`Error en sendReq${isB64 ? 'B64' : ''}`, e);
				callback(e, null);
			}
		});

		req.on('error', (e) => {
			console.error(`Error en sendReq${isB64 ? 'B64' : ''}`, e);
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

}

module.exports = StampRequest;