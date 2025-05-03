const Services = require('../Services.js');
const StampRequest = require('./StampRequest.js');
const Authentication = require('../Authentication/AuthenticationService.js');

class StampService extends Services {

	constructor(params) {
		super(params);
	}

	static Set(params) {
		return new StampService(params);
	}

	StampV1(xml, callback, isB64 = false) {
		this._checkAndSend(xml, 'v1', callback, isB64);
	}

	StampV2(xml, callback, isB64 = false) {
		this._checkAndSend(xml, 'v2', callback, isB64);
	}

	StampV3(xml, callback, isB64 = false) {
		this._checkAndSend(xml, 'v3', callback, isB64);
	}

	StampV4(xml, callback, isB64 = false) {
		this._checkAndSend(xml, 'v4', callback, isB64);
	}

	_checkAndSend(xml, version, callback, isB64) {
		if (this.renewToken()) {
			this._authenticateAndSendRequest(xml, version, callback, isB64);
		} else {
			this._sendRequest(xml, version, callback, isB64);
		}
	}


	_authenticateAndSendRequest(xml, version, callback, isB64 = false) {
		var obj = {
			user: this.get_user(),
			password: this.get_password(),
			url: this.get_url(),
		}
		var auth = Authentication.auth(obj);

		auth.Token((err, data) => {
			if (err) {
				callback(err, null);
			} else {
				this.set_token(data.data.token);
				this._setExpirationDate();
				this._sendRequest(xml, version, callback, isB64);
			}
		});
	}

	_sendRequest(xml, version, callback, isB64) {
		StampRequest.sendReq(this.get_url(), this.get_token(), xml, version, isB64, callback);
	}
}

module.exports = StampService;
