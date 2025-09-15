const RequestHelper = require("../Helper/RequestHelper.js");

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
		RequestHelper.sendRequest(url, token, xml, 'stamp', version, isB64, callback);
	}

	static sendReqV4(url, token, xml, version, isB64, callback, customHeaders) {
		RequestHelper.sendRequestV4(url, token, xml, 'stamp', version, isB64, callback, customHeaders);
	}
}

module.exports = StampRequest;