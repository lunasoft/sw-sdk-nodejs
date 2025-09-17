const Services = require('../Services.js');
const RequestHelper = require('../Helper/RequestHelper.js');
const Authentication = require('../Authentication/AuthenticationService.js');

/**
 * @class StampRetentionService
 * Clase que expone métodos para el Timbrado de Retenciones.
 * @extends Services
 */
class StampRetentionService extends Services {
	/**
	 * @param {Object} params
	 * @param {string} [params.url]    – URL base services.
	 * @param {string} [params.urlApi] – URL base api.
	 * @param {string} [params.token]  – Token.
	 * @param {string} [params.user]   – Usuario.
	 * @param {string} [params.password] – Contraseña.
	 */

	constructor(params) {
		super(params);
	}

	/**
	 * Fabrica la instancia configurada.
	 * @param {Object} params
	 * @returns {AccountBalanceService}
	 */
	static Set(params) {
		return new StampRetentionService(params);
	}
    
	StampV3(xml, callback, isB64 = false) { this._checkAndSend(xml, 'v3', callback, isB64); }

	_checkAndSend(xml, version, callback, isB64) {
		if (this.renewToken()) {
			this._authenticateAndSendRequest(xml, version, callback, isB64);
		} else {
			this._sendRequest(xml, version, callback, isB64);
		}
	}

	_authenticateAndSendRequest(xml, version, callback, isB64 = false) {
		const authParams = {
			user: this.get_user(),
			password: this.get_password(),
			url: this.get_url()
		};
		const auth = Authentication.auth(authParams);

		auth.Token((err, res) => {
			if (err) return callback(err, null);
			this.set_token(res.data.token);
			this._setExpirationDate();
			this._sendRequest(xml, version, callback, isB64);
		});
	}

	_sendRequest(xml, version, callback, isB64) {
		RequestHelper.sendRequest(this.get_url(), this.get_token(), xml, 'retencion', version, isB64, callback);
	}
}

module.exports = StampRetentionService;
