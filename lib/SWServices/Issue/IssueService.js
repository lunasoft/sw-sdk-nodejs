const Services = require('../Services.js');
const IssueRequest = require('./IssueRequest.js');
const Authentication = require('../Authentication/AuthenticationService.js');

class IssueService extends Services {

    constructor(params) {
        super(params);
    }

    static Set(params) {
        return new IssueService(params);
    }

    IssueV1(xml, callback, isb64 = false) {
		this._checkAndSend(xml, 'v1', callback, isb64);
	}

	IssueV2(xml, callback, isb64 = false) {
		this._checkAndSend(xml, 'v2', callback, isb64);
	}

	IssueV3(xml, callback, isb64 = false) {
		this._checkAndSend(xml, 'v3', callback, isb64);
	}

	IssueV4(xml, callback, isb64 = false) {
		this._checkAndSend(xml, 'v4', callback, isb64);
	}

	_checkAndSend(xml, version, callback, isb64){
		if(this.renewToken()) {
			this._authenticateAndSendRequest(xml, version, callback, isb64);
		} else {
			this._sendRequest(xml, version, callback, isb64);
		}
	}

	_authenticateAndSendRequest(xml, version, callback, isb64 = false) {
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
                this._sendRequest(xml, version, callback, isb64);
            }
        });
    }

	_sendRequest(xml, version, callback, isb64) {
		if(isb64) 
            IssueRequest.sendReqB64(this.get_url(), this.get_token(), xml, version, callback);
		else
            IssueRequest.sendReq(this.get_url(), this.get_token(), xml, version, callback);
	}
}

module.exports = IssueService;
