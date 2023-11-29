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

    IssueV1(xml, callback, isB64 = false) {
        this._checkAndSend(xml, 'v1', callback, isB64);
    }

    IssueV2(xml, callback, isB64 = false) {
        this._checkAndSend(xml, 'v2', callback, isB64);
    }

    IssueV3(xml, callback, isB64 = false) {
        this._checkAndSend(xml, 'v3', callback, isB64);
    }

    IssueV4(xml, callback, isB64 = false) {
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
        const authParams = {
            user: this.get_user(),
            password: this.get_password(),
            url: this.get_url(),
        };

        const auth = Authentication.auth(authParams);

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
        IssueRequest.sendReq(this.get_url(), this.get_token(), xml, version, isB64, callback);
    }
}

module.exports = IssueService;
