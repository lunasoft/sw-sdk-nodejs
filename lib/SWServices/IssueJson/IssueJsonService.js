const Services = require('../Services.js');
const IssueJsonRequest = require('./IssueJsonRequest.js');
const Authentication = require('../Authentication/AuthenticationService.js');

/**
 * @class IssueJsonService
 * Clase que expone métodos para el timbrado por Timbrado JSON.
 * @extends Services
 */
class IssueJsonService extends Services {
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
		return new IssueJsonService(params);
	}

	IssueJsonV1(json, callback) { this._checkAndSend(json, 'v1', callback); }
	IssueJsonV2(json, callback) { this._checkAndSend(json, 'v2', callback); }
	IssueJsonV3(json, callback) { this._checkAndSend(json, 'v3', callback); }
	IssueJsonV4(json, callback) { this._checkAndSend(json, 'v4', callback); }

	_checkAndSend(json, version, callback) {
		if (this.renewToken()) {
			this._authenticateAndSendRequest(json, version, callback);
		} else {
			this._sendRequest(json, version, callback);
		}
	}

	_authenticateAndSendRequest(json, version, callback) {
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
			this._sendRequest(json, version, callback);
		});
	}

	_sendRequest(json, version, callback) {
		IssueJsonRequest.sendReq(this.get_url(), this.get_token(), json, version, callback);
	}
}

module.exports = IssueJsonService;
