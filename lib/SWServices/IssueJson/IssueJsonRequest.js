const helper = require("../Helper/Helper.js");

class IssueJsonRequest {
	static sendReq(url, token, jsonData, version, callback) {
		this._sendRequest(url, token, jsonData, version, callback);
	}

	static sendReqV4(url, token, jsonData, version, callback, customHeaders = {}) {
		this._sendRequestV4(url, token, jsonData, version, callback, customHeaders);
	}

	static _sendRequest(url, token, jsonData, version, callback) {
		const { url: hostname, module: httpModule, agent } = helper.getUrlAndModule(url);

		const data = typeof jsonData === 'string' ? jsonData : JSON.stringify(jsonData);

		const options = {
			hostname,
			path: `/v3/cfdi33/issue/json/${version}`,
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${token}`,
				'Content-Type': 'application/jsontoxml',
				'Content-Length': Buffer.byteLength(data, 'utf8')
			},
			agent: agent
		};

		const req = httpModule.request(options, (res) => {
			const body = [];

			res.on('data', (chunk) => {
				body.push(chunk);
			});

			res.on('end', () => {
				const responseData = Buffer.concat(body).toString();

				try {
					if (res.statusCode !== 200) {
						const errRes = {
							status: 'error',
							message: res.statusCode,
							messageDetail: res.statusMessage,
							response: responseData
						};
						callback(errRes, null);
					} else {
						const parsed = JSON.parse(responseData);
						callback(null, parsed);
					}
				} catch (e) {
					console.error(`Error en sendReq`, e);
					callback(e, null);
				}
			});
		});

		req.on('error', (e) => {
			const errRes = {
				status: 'error',
				message: e.code,
				messageDetail: e.message
			};
			callback(errRes, null);
		});

		req.write(data);
		req.end();
	}

	static _sendRequestV4(url, token, jsonData, version, callback, customHeaders = {}) {
		const { url: hostname, module: httpModule, agent } = helper.getUrlAndModule(url);

		const data = typeof jsonData === 'string' ? jsonData : JSON.stringify(jsonData);

		const defaultHeaders = {
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/jsontoxml',
			'Content-Length': Buffer.byteLength(data, 'utf8')
		};

		const headers = { ...defaultHeaders, ...customHeaders };

		const options = {
			hostname,
			path: `/v4/cfdi33/issue/json/${version}`,
			method: 'POST',
			headers,
			agent: agent
		};

		const req = httpModule.request(options, (res) => {
			const body = [];

			res.on('data', (chunk) => {
				body.push(chunk);
			});

			res.on('end', () => {
				const responseData = Buffer.concat(body).toString();

				try {
					if (res.statusCode !== 200) {
						const errRes = {
							status: 'error',
							message: res.statusCode,
							messageDetail: res.statusMessage,
							response: responseData
						};
						callback(errRes, null);
					} else {
						const parsed = JSON.parse(responseData);
						callback(null, parsed);
					}
				} catch (e) {
					console.error(`Error en sendReqV4`, e);
					callback(e, null);
				}
			});
		});

		req.on('error', (e) => {
			const errRes = {
				status: 'error',
				message: e.code,
				messageDetail: e.message
			};
			callback(errRes, null);
		});

		req.write(data);
		req.end();
	}
}

module.exports = IssueJsonRequest;