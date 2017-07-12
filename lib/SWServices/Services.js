class Services {

	constructor(params) {
		if(!params) {
			throw new Error('No tiene datos');
		}
		if(params.url) {
			this._url = params.url;
		}else{
			throw new Error('URL debe especificarse');
		}

		if(!params.user && !params.password && !params.token) {
			throw new Error('Datos de autenticación deben especificarse');
		}

		if(params.user) {
			this._user = params.user;
		}

		if(params.password) {
			this._password = params.password;
		}

		this._timeSession = 2;
		if(params.token) {
			this._token = params.token;
			this._setExpirationDate();
		}
	}

	get_token() {
		return this._token;
	}

	get_url() {
		return this._url;
	}

	get_user() {
		return this._user;
	}

	get_password() {
		return this._password;
	}

	set_token(token) {
		this._token = token;
	}

	_setExpirationDate() {
		let d1 = new Date ();
		let d2 = new Date ( d1 );
		d2.setHours ( d1.getHours() + this._timeSession);
		this._expirationDate = d2;
	}

	renewToken() {
		return this._token == null || new Date().getTime() > this._expirationDate.getTime();
	}

}

module.exports = Services;