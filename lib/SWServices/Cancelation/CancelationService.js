const CancelationRequest = require('./CancelationRequest.js');

class CancelationService {
	
	constructor(params) {
		let c = Object.keys(params).length;
		if(c == 6)
			this._setUUID(params);
		else if(c == 8)
			this._setPFX(params);
		else if(c == 9)
			this._setCSD(params);
		else if (c == 3)
			this._setXML(params);
		else
			throw new Error('Número de parametros incompletos');
	}

	static Set(params) {
		return new CancelationService(params);
	}

	CancelationByUUID(callback) {
		CancelationRequest.sendReqUUID(this._url, this._token, this._rfc, this._uuid, this._motivo, this._folioSustitucion = null, callback);
	}

	CancelationByCSD(callback) {
		CancelationRequest.sendReqCSD(this._url, this._token, this._cfdiData, callback);
	}

	CancelationByPFX(callback) {
		CancelationRequest.sendReqPFX(this._url, this._token, this._cfdiData, callback);
	}

	CancelationByXML(callback) {
		CancelationRequest.sendReqXML(this._url, this._token, this._xml, callback);
	}

	_setUUID(params) {
		if(params.url && params.token && params.rfc && params.uuid && params.motivo) {
			this._url = params.url;
			this._token = params.token;
			this._rfc = params.rfc;
			this._uuid = params.uuid;
			this._motivo = params.motivo;
			this._folioSustitucion = params.folioSustitucion;
		}else
			throw new Error('Parámetros incompletos. Debe especificarse url, token, rfc, uuid, motivo y folioSustitucion');
	}

	_setCSD(params) {
		if(params.url && params.token && params.uuid && params.password && params.rfc && params.b64Cer && params.b64Key && params.motivo) {
			this._cfdiData = {
				uuid: params.uuid,
				password: params.password,
				rfc: params.rfc,
				b64Cer: params.b64Cer,
				b64Key: params.b64Key,
				motivo: params.motivo,
				folioSustitucion: params.folioSustitucion
			};
			this._url = params.url;
			this._token = params.token;
		} else
			throw new Error('Parámetros incompletos. Debe especificarse uuid, password, rfc, b64Cer, b64Key, motivo y folioSustitucion');
	}

	_setPFX(params) {
		if(params.url && params.token && params.password && params.rfc && params.b64Pfx && params.uuid && params.motivo){
			this._cfdiData = {
				uuid: params.uuid,
				password: params.password,
				rfc: params.rfc,
				b64Pfx: params.b64Pfx,
				motivo: params.motivo,
				folioSustitucion: params.folioSustitucion
			};
			this._url = params.url;
			this._token = params.token;
		} else {
			throw new Error('Parámetros incompletos. Debe especificarse url, token, pfx, uuid, motivo y folioSustitucion')
		}
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