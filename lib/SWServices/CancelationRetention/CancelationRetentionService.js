const Services = require('../Services.js');
const CancelationRequest = require('../Cancelation/CancelationRequest.js');
const Authentication = require('../Authentication/AuthenticationService.js');

/**
 * Lanza un error con la lista de campos faltantes.
 * @param {string[]} required – Lista de nombres de parámetros requeridos.
 * @param {Object} params     – Objeto recibido con params.
 * @param {string} context    – Texto contextual de la función con error.
 */
function paramsMissing(required, params, context) {
	const missing = required.filter(key => !(key in params) || params[key] == null);
	if (missing.length) {
		const sufijo = missing.length > 1 ? 'n' : '';
		throw new Error(
			`Parámetros incompletos para cancelación ${context}: falta ${sufijo} ${missing.join(', ')}`
		);
	}
}

/**
 * @class CancelationRetentionService
 * Clase que expone métodos para la cancelación de CFDI.
 * @extends Services
 */
class CancelationRetentionService extends Services {

	/**
	 * @param {Object} params
	 * @param {string} [params.url]             		– URL base services.
	 * @param {string} [params.urlApi]          		– URL base api.
	 * @param {string} [params.token]           		– Token.
	 * @param {string} [params.user]            		– Usuario.
	 * @param {string} [params.password]        		– Contraseña.
	 * @param {string} [params.rfc]             		– RFC emisor.
	 * @param {string} [params.uuid]            		– UUID.
	 * @param {string} [params.motivo]          		– Motivo de cancelación.
	 * @param {string|null} [params.folioSustitucion] 	– Folio sustitución (de aplicar).
	 * @param {string} [params.b64Cer]          		– Certificado.
	 * @param {string} [params.passwordCer]      		– Contraseña del certificado.
	 * @param {string} [params.b64Key]          		– Llave privada.
	 * @param {string} [params.b64Pfx]          		– PFX.
	 * @param {string} [params.passwordPfx]      		– Contraseña del PFX.
	 * @param {string} [params.xml]             		– XML de cancelación.
	 */
	constructor(params) {
		super(params);

		// CSD
		if (params.b64Cer && params.b64Key && params.passwordCer && params.uuid && params.rfc && params.motivo) {
			this._body = {
				uuid: params.uuid,
				password: params.passwordCer,
				rfc: params.rfc,
				b64Cer: params.b64Cer,
				b64Key: params.b64Key,
				motivo: params.motivo,
				folioSustitucion: params.folioSustitucion
			};
		}

		// PFX
		if (params.b64Pfx && params.passwordPfx && params.uuid && params.rfc && params.motivo) {
			this._body = {
				uuid: params.uuid,
				password: params.passwordPfx,
				rfc: params.rfc,
				b64Pfx: params.b64Pfx,
				motivo: params.motivo,
				folioSustitucion: params.folioSustitucion
			};
		}

		// XML
		if (params.xml) {
			this._xml = params.xml;
		}

		if (!this._uuid && !this._body && !this._xml) {
			throw new Error('Parámetros insuficientes para realizar la petición de cancelación');
		}
	}

	/**
	 * Fabrica la instancia configurada.
	 * @param {Object} params
	 * @returns {CancelationRetentionService}
	 */
	static Set(params) {
		return new CancelationRetentionService(params);
	}

	/**
	 * Cancelación por CSD.
	 * @param {Function} callback – (error, response)
	 */
	CancelationByCSD(callback) {
		this._checkAndSend(() => CancelationRequest.sendReqRetCSD(
			this.get_url(),
			this.get_token(),
			this._body,
			callback
		),
			callback
		);
	}

	/**
	 * Cancelación por PFX.
	 * @param {Function} callback – (error, response)
	 */
	CancelationByPFX(callback) {
		this._checkAndSend(() => CancelationRequest.sendReqRetPFX(
			this.get_url(),
			this.get_token(),
			this._body,
			callback
		),
			callback
		);
	}

	/**
	 * Cancelación por XML.
	 * @param {Function} callback – (error, response)
	 */
	CancelationByXML(callback) {
		this._checkAndSend(() => CancelationRequest.sendReqRetXML(
			this.get_url(),
			this.get_token(),
			this._xml,
			callback
		),
			callback
		);
	}

	/**
	 * Comprueba si el token debe renovarse.
	 * @private
	 * @param {Function} doRequest – Función que lanza la petición.
	 * @param {Function} callback  – Callback de la petición.
	 */
	_checkAndSend(doRequest, callback) {
		if (this.renewToken()) {
			this._authenticateAndSend(doRequest, callback);
		} else {
			doRequest();
		}
	}

	/**
	 * Autentica y ejecuta la petición.
	 * @private
	 * @param {Function} doRequest – Función que lanza la petición.
	 * @param {Function} callback – Callback de la petición.
	 */
	_authenticateAndSend(doRequest, callback) {
		const authService = Authentication.auth({
			user: this.get_user(),
			password: this.get_password(),
			url: this.get_url()
		});
		authService.Token((err, res) => {
			if (err) {
				return callback(err, null);
			}
			this.set_token(res.data.token);
			this._setExpirationDate();
			doRequest();
		});
	}

	_setCSD(params) {
		const required = ['url', 'token', 'rfc', 'uuid', 'passwordCsd', 'b64Cer', 'b64Key', 'motivo'];
		if (params.motivo === '01') { required.push('folioSustitucion'); }
		paramsMissing(required, params, 'CSD');

		this._body = {
			rfc: params.rfc,
			uuid: params.uuid,
			password: params.passwordCsd,
			b64Cer: params.b64Cer,
			b64Key: params.b64Key,
			motivo: params.motivo,
			folioSustitucion: params.folioSustitucion
		};
	}

	_setPFX(params) {
		const required = ['url', 'token', 'rfc', 'uuid', 'passwordPfx', 'b64Pfx', 'motivo'];
		if (params.motivo === '01') { required.push('folioSustitucion'); }
		paramsMissing(required, params, 'PFX');

		this._body = {
			rfc: params.rfc,
			uuid: params.uuid,
			password: params.passwordPfx,
			b64Pfx: params.b64Pfx,
			motivo: params.motivo,
			folioSustitucion: params.folioSustitucion
		};
	}

	_setXML(params) {
		const required = ['url', 'token', 'xml'];
		paramsMissing(required, params, 'XML');
		
		this._xml = params.xml;
	}
}

module.exports = CancelationRetentionService;