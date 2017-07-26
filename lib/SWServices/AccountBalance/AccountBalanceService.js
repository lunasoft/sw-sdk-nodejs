const AccountBalanceRequest = require('./AccountBalanceRequest.js');

class AccountBalanceService {
	
	constructor(params) {
		if(!params) {
			throw new Error('No tiene datos');
		}
		if(params.url) {
			this._url = params.url;
		} else {
			throw new Error('URL debe especificarse');
		}

		if(params.token) {
			this._token = params.token;
		} else {
			throw new Error('Datos de autenticación deben especificarse');
		}
	}

	static Set(params) {
		return new AccountBalanceService(params);
	}

	GetAccountBalance(callback) {
		AccountBalanceRequest.sendReq(this._url, this._token, callback);
	}
}

module.exports = AccountBalanceService;