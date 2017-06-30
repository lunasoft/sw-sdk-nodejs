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
		//this._expirationDate.setHours(this._expirationDate.getHours()-3); 
		//this._token = null;
		// if(this._token == null || new Date().getTime() > this._expirationDate.getTime()) {
			
		// 	let params = {
		// 		url : this._url,
		// 		user : this._user,
		// 		password: this._password
		// 	};
		// 	const Authentication = require('./Authentication/AuthenticationService.js');
		// 	const StampRequest = require('./Stamp/StampRequest.js');
		// 	var auth = Authentication.auth(params);
		// 	auth.Token((err, data) => {
		// 		if(err) {
		// 			throw (JSON.stringify(err));
		// 		} else{
		// 			this.set_token(data.data.token);
		// 			this._setExpirationDate();
		// 			StampRequest.sendReq(this.get_url(), data.data.token, xml, version, callback);
		// 		}
		// 	});
		// 	return null;
		// }

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