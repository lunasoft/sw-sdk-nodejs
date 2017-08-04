const StampRequest = require("../Stamp/StampRequest.js");
const helper = require("../Helper/Helper.js");

class CancelationRequest {
	
	static sendReqCSD(url, token, cfdiData, callback) {
		var container = helper.getUrlAndModule(url);
		url = container.url;
		module = container.module;

		let data = JSON.stringify(cfdiData);
		var options = {
		  	hostname: url,
		  	path: "/cfdi33/cancel/csd",
		 	method: "POST",
		  	headers: {
		  		"Content-Type": "application/json;",
		        "Content-Length": Buffer.byteLength(data, 'utf8'),
		        "Authorization": "Bearer " + token
			},
		};

		var req = module.request(options, (res) => {
			let body = "";

			res.on('data', (d) => {
				body+= d;
			});

			res.on('end', () => {
				if(res.statusCode != 200 && res.statusCode != 201 && res.statusCode != 202) {
					if(body)
						callback(JSON.parse(body), null);
					else {
						let errRes = {
							status: 'error',
							message: res.statusCode,
							messageDetail: res.statusMessage
						}
						callback(errRes, null);
					}
				} else {
					callback(null, JSON.parse(body));
				}
			});
		});

		req.on('error', (e) => {
			console.log('Error en sendReqCSD', e);
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

	static sendReqXML(url, token, xml, callback) {
		var container = helper.getUrlAndModule(url);
		url = container.url;
		var module = container.module;

		var delimiter = '-------------'+ StampRequest._uniqid();

		var fileFields = {
			xml : {
				type: "text/xml",
				content: xml
			}
		};

		var data = "";

		Object.keys(fileFields).forEach(function(name) {
			let file = fileFields[name];
			data+= "--" + delimiter + "\r\n";
			data+= 'Content-Disposition: form-data; name="' + name + '"; ';
			data+= 'filename="' + name + '"\r\n';
			data+= "Content-Type: "+ file.type + "\r\n";
			data+= "\r\n";
			data+= file.content+"\r\n";
		});

		data+= "--"+delimiter+"--\r\n";

		var options = {
		  	hostname: url,
		  	path: "/cfdi33/cancel/xml",
		 	method: "POST",
		  	headers: {
		  		"Content-Type": "multipart/form-data; boundary=" + delimiter,
		        "Content-Length": Buffer.byteLength(data, 'utf8'),
		        "Authorization": "Bearer " + token
			},
		};

		var req = module.request(options, (res) => {
			let body = "";

			res.on('data', (d) => {
				body+= d;
			});

			res.on('end', () => {
				if(res.statusCode != 200 && res.statusCode != 201 && res.statusCode != 202) {
					if(body)
						callback(JSON.parse(body), null);
					else {
						let errRes = {
							status: 'error',
							message: res.statusCode,
							messageDetail: res.statusMessage
						}
						callback(errRes, null);
					}
				} else {
					callback(null, JSON.parse(body));
				}
			});

		});

		req.on('error', (e) => {
			console.log('Error en sendReqXML', e);
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

module.exports = CancelationRequest;