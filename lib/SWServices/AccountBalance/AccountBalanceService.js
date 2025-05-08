const Services = require('../Services.js');
const AccountBalanceRequest = require('./AccountBalanceRequest.js');
const Authentication = require('../Authentication/AuthenticationService.js');

/**
 * @class AccountBalanceService
 * Clase que expone métodos para la gestión y distribución de timbres.
 * @extends Services
 */
class AccountBalanceService extends Services {
	/**
	 * @param {Object} params
	 * @param {string} [params.url]      – URL base services.
	 * @param {string} [params.urlApi]   – URL base api.
	 * @param {string} [params.user]     – Usuario.
	 * @param {string} [params.password] – Contraseña.
	 * @param {string} [params.token]    – Token.
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
		return new AccountBalanceService(params);
	}

	/**
	 * Consulta el balance de la cuenta.
	 * @param {Function} callback – (error, JSON response)
	 */
	GetAccountBalance(callback) {
		this._checkAndSend(() => {
			AccountBalanceRequest.getBalanceRequest(this.get_urlApi(), this.get_token(), callback);
		}, callback);
	}

	/**
	 * Añade timbres a la cuenta.
	 * @param {string} id – ID del usuario.
	 * @param {number} stamps – Cantidad de timbres.
	 * @param {string|Function} [comment] – Comentario u opción callback.
	 * @param {Function} [callback] – (error, JSON response)
	 */
	AddStamps(id, stamps, comment, callback) {
		if (typeof comment === 'function') {
			callback = comment;
			comment = null;
		}
		this._checkAndSend(() => {
			AccountBalanceRequest.distributionStampRequest(this.get_urlApi(), this.get_token(), 'POST', id, stamps, comment, callback);
		}, callback);
	}

	/**
	 * Elimina timbres de la cuenta.
	 * @param {string} id – ID del usuario.
	 * @param {number} stamps – Cantidad de timbres.
	 * @param {string|Function} [comment] – Comentario u opción callback.
	 * @param {Function} [callback] – (error, JSON response)
	 */
	RemoveStamps(id, stamps, comment, callback) {
		if (typeof comment === 'function') {
			callback = comment;
			comment = null;
		}
		this._checkAndSend(() => {
			AccountBalanceRequest.distributionStampRequest(this.get_urlApi(), this.get_token(), 'DELETE', id, stamps, comment, callback);
		}, callback);
	}

	/**
	 * Comprueba si el token debe renovarse.
	 * @private
	 * @param {Function} doRequest – Función que lanza la petición.
	 * @param {Function} callback – Callback de la petición.
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
}

module.exports = AccountBalanceService;
