const helper = require("../Helper/Helper.js");

class AuthRequest {

	static sendReq(url, pass, user, callback) {
		var container = helper.getUrlAndModule(url);
		url = container.url;
		var module = container.module;
		var agent = container.agent;

		const data = JSON.stringify({
			user: user,
			password: pass
		});

		var options = {
			hostname: url,
			path: '/v2/security/authenticate',
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Content-Length': Buffer.byteLength(data)
			},
			agent: agent
		};

		var req = module.request(options, (res) => {
			if (res.statusCode != 200) {
				let errRes = {
					status: 'error',
					message: res.statusCode,
					messageDetail: res.statusMessage
				}
				callback(errRes, null);
			} else {
				let body = '';
				res.on('data', (d) => {
					body += d;
				});

				res.on('end', () => {
					callback(null, JSON.parse(body));
				});
			}
		});

		req.on('error', (e) => {
			let errRes = {
				status: 'error',
				message: e.code,
				messageDetail: e.message
			}
			callback(errRes, null);
		});

		req.write(data);
		req.end();
	}
}

module.exports = AuthRequest;