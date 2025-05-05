const helper = require("../Helper/Helper.js");
const StampRequest = require("../Stamp/StampRequest.js");

class CancelationRequest {
	//Cancelacion por UUID
	static sendReqUUID(url, token, rfc, uuid, motivo, folioSustitucion, callback) {
		const container = helper.getUrlAndModule(url);
		url = container.url;
		const module = container.module;
		const agent = container.agent;

		const folio = folioSustitucion == null ? "" : folioSustitucion;
		const path = `/cfdi33/cancel/${rfc}/${uuid}/${motivo}/${folio}`;
		const options = {
			hostname: url,
			path: path,
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer " + token
			},
			agent: agent
		};

		const req = module.request(options, (res) => {
			let body = '';
			res.on('data', (d) => { body += d; });
			res.on('end', () => {
				if (res.statusCode !== 200) {
					callback(JSON.parse(body), null);
				} else {
					callback(null, JSON.parse(body));
				}
			});
		});

		req.on('error', (e) => {
			callback({ status: 'error', message: e.code, messageDetail: e.message }, null);
		});

		req.end();
	}
	//Cancelacion por CSD
	static sendReqCSD(url, token, cfdiData, callback) {
		const container = helper.getUrlAndModule(url);
		url = container.url;
		const module = container.module;
		const agent = container.agent;

		const path = '/cfdi33/cancel/csd';
		const data = JSON.stringify(cfdiData);

		const options = {
			hostname: url,
			path: path,
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer " + token,
				"Content-Length": Buffer.byteLength(data, 'utf8')
			},
			agent: agent
		};

		const req = module.request(options, (res) => {
			let body = '';
			res.on('data', (d) => { body += d; });
			res.on('end', () => {
				if (res.statusCode !== 200) {
					callback(JSON.parse(body), null);
				} else {
					callback(null, JSON.parse(body));
				}
			});
		});

		req.on('error', (e) => {
			callback({ status: 'error', message: e.code, messageDetail: e.message }, null);
		});

		req.write(data);
		req.end();
	}
	//Cancelacion por PFX
	static sendReqPFX(url, token, cfdiData, callback) {
		const container = helper.getUrlAndModule(url);
		url = container.url;
		const module = container.module;
		const agent = container.agent;

		const path = '/cfdi33/cancel/pfx';
		const data = JSON.stringify(cfdiData);

		const options = {
			hostname: url,
			path: path,
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer " + token,
				"Content-Length": Buffer.byteLength(data, 'utf8')
			},
			agent: agent
		};

		const req = module.request(options, (res) => {
			let body = '';
			res.on('data', (d) => { body += d; });
			res.on('end', () => {
				if (res.statusCode !== 200) {
					callback(JSON.parse(body), null);
				} else {
					callback(null, JSON.parse(body));
				}
			});
		});

		req.on('error', (e) => {
			callback({ status: 'error', message: e.code, messageDetail: e.message }, null);
		});

		req.write(data);
		req.end();
	}
	//Cancelacion por XML
	static sendReqXML(url, token, xml, callback) {
		const container = helper.getUrlAndModule(url);
		url = container.url;
		const module = container.module;
		const agent = container.agent;

		const delimiter = '-------------' + StampRequest._uniqid();
		const fileFields = {
			xml: {
				type: "text/xml",
				content: xml
			}
		};
		let data = "";
		Object.keys(fileFields).forEach(function (name) {
			let file = fileFields[name];
			data += "--" + delimiter + "\r\n";
			data += 'Content-Disposition: form-data; name="' + name + '"; ';
			data += 'filename="' + name + '"\r\n';
			data += "Content-Type: " + file.type + "\r\n";
			data += "\r\n";
			data += file.content + "\r\n";
		});
		data += "--" + delimiter + "--\r\n";

		const path = '/cfdi33/cancel/xml';
		const options = {
			hostname: url,
			path: path,
			method: "POST",
			headers: {
				"Authorization": "Bearer " + token,
				"Content-Type": "multipart/form-data; boundary=" + delimiter,
				"Content-Length": Buffer.byteLength(data, 'utf8')
			},
			agent: agent
		};

		const req = module.request(options, (res) => {
			let body = '';
			res.on('data', (d) => { body += d; });
			res.on('end', () => {
				if (res.statusCode !== 200) {
					callback(JSON.parse(body), null);
				} else {
					callback(null, JSON.parse(body));
				}
			});
		});

		req.on('error', (e) => {
			callback({ status: 'error', message: e.code, messageDetail: e.message }, null);
		});

		req.write(data);
		req.end();
	}
}

module.exports = CancelationRequest;