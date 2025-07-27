const Services = require('../Services.js');
const Helper = require("../Helper/ValidateHelper.js");
const StampRequest = require('./StampRequest.js');
const Authentication = require('../Authentication/AuthenticationService.js');

/**
 * @class StampService
 * Clase que expone métodos para el timbrado por Timbrado.
 * @extends Services
 */
class StampServiceV4 extends Services {
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
        return new StampServiceV4(params);
    }

    ServiceV4StampV1(xml, callback, isB64 = false, customServiceV4 = {}) { this._checkAndSend(xml, 'v1', callback, isB64, customServiceV4); }
    ServiceV4StampV2(xml, callback, isB64 = false, customServiceV4 = {}) { this._checkAndSend(xml, 'v2', callback, isB64, customServiceV4); }
    ServiceV4StampV3(xml, callback, isB64 = false, customServiceV4 = {}) { this._checkAndSend(xml, 'v3', callback, isB64, customServiceV4); }
    ServiceV4StampV4(xml, callback, isB64 = false, customServiceV4 = {}) { this._checkAndSend(xml, 'v4', callback, isB64, customServiceV4); }

    _checkAndSend(xml, version, callback, isB64, customServiceV4 = {}) {

        try {
            customServiceV4 = Helper.validateCustomServiceV4(customServiceV4);
        } catch (validationError) {
            return callback(validationError, null);
        }

        if (this.renewToken()) {
            this._authenticateAndSendRequest(xml, version, callback, isB64, customServiceV4);
        } else {
            this._sendRequestV4(xml, version, callback, isB64, customServiceV4);
        }
    }

    _authenticateAndSendRequest(xml, version, callback, isB64 = false, customServiceV4 = {}) {
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
            this._sendRequestV4(xml, version, callback, isB64, customServiceV4);
        });
    }

    _sendRequestV4(xml, version, callback, isB64, customServiceV4 = {}) {
        const customHeaders = {};
        
        if (customServiceV4.customId) {
            customHeaders["customid"] = customServiceV4.customId;
        }
        if (customServiceV4.pdf === true) {
            customHeaders["extra"] = "pdf"; // Ejemplo, cambia si tu API espera otro nombre
        }
        if (customServiceV4.email && Array.isArray(customServiceV4.email)) {
            customHeaders["email"] = customServiceV4.email.join(",");
        }
        StampRequest.sendReqV4(this.get_url(), this.get_token(), xml, version, isB64, callback, customHeaders);
    }
}

module.exports = StampServiceV4;
