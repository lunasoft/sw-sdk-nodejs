class Services {
	/**
	 * Clase base para manejar:
	 *  - URL services
	 *  - URL api
	 *  - Autenticación por token
	 *  - Autenticación por credenciales
	 * @param {Object} params
	 * @param {string} [params.url]
	 * @param {string} [params.urlApi]
	 * @param {string} [params.user]
	 * @param {string} [params.password]
	 * @param {string} [params.token]
	 */
	constructor(params) {
		if (!params) {
			throw new Error('No tiene datos');
		}

		if (params.url) {
			this._url = params.url;
		} else if (params.urlApi) {
			this._url = params.urlApi;
		} else {
			throw new Error('URL debe especificarse');
		}

		this._urlApi = params.urlApi || params.url;

		if (!params.user && !params.password && !params.token) {
			throw new Error('Datos de autenticación deben especificarse');
		}
		if (params.user) this._user = params.user;
		if (params.password) this._password = params.password;

		this._timeSession = 2;

		if (params.token) {
			this._token = params.token;
			this._setExpirationDate();
		}
	}

	/** @returns {string} */
	get_url() {
		return this._url;
	}

	/** @returns {string} */
	get_urlApi() {
		return this._urlApi;
	}

	/** @returns {string} */
	get_user() {
		return this._user;
	}

	/** @returns {string} */
	get_password() {
		return this._password;
	}

	/** @returns {string} */
	get_token() {
		return this._token;
	}

	/** @param {string} token */
	set_token(token) {
		this._token = token;
	}

	/**
	 * Setea expiración del token
	 * @private
	 */
	_setExpirationDate() {
		const now = Date.now();
		const expire = now + this._timeSession * 60 * 60 * 1000;
		this._expirationDate = new Date(expire);
	}

	/**
	 * @returns {boolean} – Retorna true si no hay token o ya expiró
	 */
	renewToken() {
		return !this._token || Date.now() > this._expirationDate.getTime();
	}

	/**
	 * Llama al servicio de autenticación para obtener un nuevo token temporal.
	 * Guarda el nuevo token y actualiza fecha de expiración.
	 * @param {Function} callback – (error)
	 * @private
	 */
	_authenticate(callback) {
		const Authentication = require('./Authentication/AuthenticationService.js');
		const authService = Authentication.auth({
			user: this.get_user(),
			password: this.get_password(),
			url: this.get_url()
		});

		authService.Token((err, res) => {
			if (err) {
				return callback(err);
			}
			if (res.status !== 'success') {
				return callback(new Error(
					`Authentication error: ${res.message} Detail: ${res.messageDetail}`
				));
			}
			this.set_token(res.data.token);
			this._setExpirationDate();
			callback(null);
		});
	}
}

module.exports = Services;
