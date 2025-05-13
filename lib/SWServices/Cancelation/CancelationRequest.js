const helper = require("../Helper/Helper.js");
const StampRequest = require("../Stamp/StampRequest.js");

class CancelationRequest {
	/**
	 * Cancelación por UUID.
	 */
	static sendReqUUID(url, token, rfc, uuid, motivo, folioSustitucion, callback) {
		const folio = folioSustitucion == null ? "" : folioSustitucion;
		const path = `/cfdi33/cancel/${rfc}/${uuid}/${motivo}/${folio}`;
		this._sendRequest(url, token, path, null, callback);
	}

	/**
	 * Cancelación por CSD.
	 */
	static sendReqCSD(url, token, body, callback) {
		this._sendRequest(url, token, '/cfdi33/cancel/csd', body, callback);
	}

	/**
	 * Cancelación por PFX.
	 */
	static sendReqPFX(url, token, body, callback) {
		this._sendRequest(url, token, '/cfdi33/cancel/pfx', body, callback);
	}

	/**
	 * Cancelación por XML.
	 */
	static sendReqXML(url, token, xml, callback) {
		const delimiter = '-------------' + StampRequest._uniqid();
		const fileFields = { xml: { type: "text/xml", content: xml } };
		let data = '';

		Object.keys(fileFields).forEach(name => {
			const file = fileFields[name];
			data += `--${delimiter}\r\n`;
			data += `Content-Disposition: form-data; name="${name}"; filename="${name}"\r\n`;
			data += `Content-Type: ${file.type}\r\n\r\n`;
			data += `${file.content}\r\n`;
		});
		data += `--${delimiter}--\r\n`;

		this._sendRequest(url, token, '/cfdi33/cancel/xml', data, callback, { multipart: true, boundary: delimiter });
	}

	/**
	 * Envia una petición al servicio de cancelación según el tipo de petición.
	 * @param {string} url
	 * @param {string} token
	 * @param {string} path
	 * @param {object|string|null} body - Cuerpo JSON o datos multipart.
	 * @param {function} callback
	 * @param {object} [opts]
	 * @param {boolean} [opts.multipart]
	 * @param {string} [opts.boundary]
	 */
	static _sendRequest(url, token, path, body, callback, opts = {}) {
		let data;
		const headers = { "Authorization": `Bearer ${token}` };
		const { url: hostname, module: httpModule, agent } = helper.getUrlAndModule(url);

		if (opts.multipart) {
			headers["Content-Type"] = `multipart/form-data; boundary=${opts.boundary}`;
			data = body;
		} else if (body != null) {
			data = JSON.stringify(body);
			headers["Content-Type"] = "application/json";
			headers["Content-Length"] = Buffer.byteLength(data, 'utf8');
		}

		const requestOptions = { hostname, path, method: "POST", headers, agent };
		const req = httpModule.request(requestOptions, res => {
			const chunks = [];
			res.on('data', d => chunks.push(d));
			res.on('end', () => {
				const raw = Buffer.concat(chunks).toString();
				let parsed;
				try {
					parsed = JSON.parse(raw);
				} catch (e) {
					return callback({
						status: 'error',
						message: res.statusCode,
						messageDetail: res.statusMessage
					}, null);
				}
				if (res.statusCode !== 200) {
					callback(parsed, null);
				} else {
					callback(null, parsed);
				}
			});
		});

		req.on('error', e => {
			callback({
				status: 'error',
				message: e.code,
				messageDetail: e.message
			}, null);
		});

		if (data) req.write(data);
		req.end();
	}
}

module.exports = CancelationRequest;
