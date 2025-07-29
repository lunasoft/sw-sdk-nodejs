const Services = require('../Services.js');
const Helper = require("../Helper/ValidateHelper.js");
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

    ServiceV4IssueJsonV1(json, callback, customServiceV4 = {}) { this._checkAndSendV4(json, 'v1', callback, customServiceV4); }
	ServiceV4IssueJsonV2(json, callback, customServiceV4 = {}) { this._checkAndSendV4(json, 'v2', callback, customServiceV4); }
	ServiceV4IssueJsonV3(json, callback, customServiceV4 = {}) { this._checkAndSendV4(json, 'v3', callback, customServiceV4); }
	ServiceV4IssueJsonV4(json, callback, customServiceV4 = {}) { this._checkAndSendV4(json, 'v4', callback, customServiceV4); }

    _checkAndSendV4(json, version, callback, customServiceV4 = {}) {
		try {
			customServiceV4 = Helper.validateCustomServiceV4(customServiceV4);
		} catch (validationError) {
			return callback(validationError, null);
		}

		if (this.renewToken()) {
			this._authenticateAndSendRequestV4(json, version, callback, customServiceV4);
		} else {
			this._sendRequestV4(json, version, callback, customServiceV4);
		}
	}

    _authenticateAndSendRequestV4(json, version, callback, customServiceV4 = {}) {
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
			this._sendRequestV4(json, version, callback, customServiceV4);
		});
	}

    _sendRequestV4(json, version, callback, customServiceV4 = {}) {
		const customHeaders = {};
		
		if (customServiceV4.customId) {
			customHeaders["customid"] = customServiceV4.customId;
		}
		if (customServiceV4.pdf === true) {
			customHeaders["extra"] = "pdf";
		}
		if (customServiceV4.email && Array.isArray(customServiceV4.email)) {
			customHeaders["email"] = customServiceV4.email.join(",");
		}
		IssueJsonRequest.sendReqV4(this.get_url(), this.get_token(), json, version, callback, customHeaders);
	}
}

module.exports = IssueJsonService;