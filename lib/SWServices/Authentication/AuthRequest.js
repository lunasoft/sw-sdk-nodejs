const helper = require("../Helper/Helper.js");

class AuthRequest {

	static sendReq(url, pass, user, callback) {
		var container = helper.getUrlAndModule(url);
		url = container.url;
		var module = container.module;

		var options = {
		  hostname: url,
		  path: '/security/authenticate',
		  method: 'POST',
		  headers: {
			      	'cache-control': 'no-cache',
		            'password': pass,
		            'user' : user,
		            'content-length': '0',
		            'content-type': 'application/json; charset=utf-8',
			      },
		};

		var req = module.request(options, (res) => {
			if(res.statusCode != 200){
				let errRes = {
					status: 'error',
					message: res.statusCode,
					messageDetail: res.statusMessage
				}
				callback(errRes, null);
			} else {
				let body = '';
			  	res.on('data', (d) => {
			  		body+= d;
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

		req.end();
	}
}

module.exports = AuthRequest;