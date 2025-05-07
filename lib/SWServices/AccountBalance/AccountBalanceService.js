const Services = require('../Services.js');
const AccountBalanceRequest = require('./AccountBalanceRequest.js');

/**
 * @class AccountBalanceService
 * Clase que expone métodos para la gestión y distribución de timbres.
 */
class AccountBalanceService extends Services {
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
		return new AccountBalanceService(params);
	}

	/**
	 * Consulta el balance de la cuenta.
	 * @param {Function} callback – (error, responseJson)
	 */
	GetAccountBalance(callback) {
		const doRequest = () => {
			AccountBalanceRequest.getBalanceRequest(
				this.get_urlApi(),
				this.get_token(),
				callback
			);
		};

		if (this.renewToken()) {
			this._authenticate()
				.then(doRequest)
				.catch(err => callback(err, null));
		} else {
			doRequest();
		}
	}

	/**
	 * Añade timbres a la cuenta.
	 * @param {string} id
	 * @param {number} stamps
	 * @param {string|Function} [comment] – Si es función, se asume callback.
	 * @param {Function} [callback]
	 */
	AddStamps(id, stamps, comment, callback) {
		if (typeof comment === 'function') {
			callback = comment;
			comment = null;
		}
		const doRequest = () => {
			AccountBalanceRequest.distributionStampRequest(
				this.get_urlApi(),
				this.get_token(),
				'POST',
				id,
				stamps,
				comment,
				callback
			);
		};
		if (this.renewToken()) {
			this._authenticate()
				.then(doRequest)
				.catch(err => callback(err, null));
		} else {
			doRequest();
		}
	}

	/**
	 * Elimina timbres de la cuenta.
	 * @param {string} id
	 * @param {number} stamps
	 * @param {string|Function} [comment] – Si es función, se asume callback.
	 * @param {Function} [callback]
	 */
	RemoveStamps(id, stamps, comment, callback) {
		if (typeof comment === 'function') {
			callback = comment;
			comment = null;
		}
		const doRequest = () => {
			AccountBalanceRequest.distributionStampRequest(
				this.get_urlApi(),
				this.get_token(),
				'DELETE',
				id,
				stamps,
				comment,
				callback
			);
		};
		if (this.renewToken()) {
			this._authenticate()
				.then(doRequest)
				.catch(err => callback(err, null));
		} else {
			doRequest();
		}
	}
}

module.exports = AccountBalanceService;
