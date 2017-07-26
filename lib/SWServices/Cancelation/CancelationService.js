const CancelationRequest = require('./CancelationRequest.js');

class CancelationService {
	
	constructor(params) {
		let c = Object.keys(params).length;
		if(c == 7)
			this._setCSD(params);
		else if (c == 3)
			this._setXML(params);
		else
			throw new Error('Número de parametros incompletos');
	}

	static Set(params) {
		return new CancelationService(params);
	}

	CancelationByCSD(callback) {
		CancelationRequest.sendReqCSD(this._url, this._token, this._cfdiData, callback);
	}

	CancelationByXML(callback) {
		CancelationRequest.sendReqXML(this._url, this._token, this._xml, callback);
	}

	_setCSD(params) {
		if(params.url && params.token && params.uuid && params.password && params.rfc && params.b64Cer && params.b64Key) {
			this._cfdiData = {
				uuid: params.uuid,
				password: params.password,
				rfc: params.rfc,
				b64Cer: params.b64Cer,
				b64Key: params.b64Key
			};
			this._url = params.url;
			this._token = params.token;
		} else
			throw new Error('Parámetros incompletos. Debe especificarse uuid, password, rfc, b64Cer, b64Key');
	}

	_setXML(params) {
		if(params.url && params.token && params.xml) {
			this._url = params.url;
			this._token = params.token;
			this._xml = params.xml;
		} else
			throw new Error('Parámetros incompletos. Debe especificarse url, token, y archivo xml');
	}
}

module.exports = CancelationService;