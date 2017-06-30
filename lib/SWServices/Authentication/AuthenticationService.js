const Services = require('../Services.js');
const AR = require('./AuthRequest.js');

class AuthenticationService extends Services {
	
	constructor(params) {
		super(params);
	}

	static auth(params) {
		if(Object.getOwnPropertyNames(params).length === 0) {
			throw 'No hay valores';
		}
		return new AuthenticationService(params);
	}

	Token(callback) {
		return AR.sendReq(this.get_url(), this.get_password(), this.get_user(), callback);
	}

	TokenSync() {
		return AR.sendReq(this.get_url(), this.get_password(), this.get_user());
	}

}

module.exports = AuthenticationService;
