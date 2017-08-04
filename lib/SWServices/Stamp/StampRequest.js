const fs = require("fs")
const helper = require("../Helper/Helper.js");

class StampRequest {

	static sendReq(url, token, xml, version, callback) {
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
		  	path: "/cfdi33/stamp/"+version,
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
				if(res.statusCode != 200) {
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
			console.log('Error en sendReq', e);
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

	static sendReqB64(url, token, xml, version, callback) {
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
		  	path: "/cfdi33/stamp/"+version+"/b64",
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
				if(res.statusCode != 200) {
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
			console.log('Error en sendReqB64', e);
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


	static _readXml(url, token, xmlURL, version, callback) {
		fs.readFile(xmlURL, 'utf8', function(err, contents) {
			if(err) {
				let errRes = {
					status: 'error',
					message: err.message,
					messageDetail: err.message
				}
				callback(errRes, null);
			 } 
			else {
			 	StampRequest.sendReq(url, token, contents, version, callback);
			 }
		});
	}

	static test(url, token, xmlURL, version, callback){
		this._readXml(url, token, xmlURL, version, callback);
	}

	static _uniqid (prefix, more_entropy) {
	  if (typeof prefix === 'undefined') {
	    prefix = "";
	  }

	  var retId;
	  var formatSeed = function (seed, reqWidth) {
	    seed = parseInt(seed, 10).toString(16); // to hex str
	    if (reqWidth < seed.length) { // so long we split
	      return seed.slice(seed.length - reqWidth);
	    }
	    if (reqWidth > seed.length) { // so short we pad
	      return Array(1 + (reqWidth - seed.length)).join('0') + seed;
	    }
	    return seed;
	  };

	  // BEGIN REDUNDANT
	  if (!this.php_js) {
	    this.php_js = {};
	  }
	  // END REDUNDANT
	  if (!this.php_js.uniqidSeed) { // init seed with big random int
	    this.php_js.uniqidSeed = Math.floor(Math.random() * 0x75bcd15);
	  }
	  this.php_js.uniqidSeed++;

	  retId = prefix; // start with prefix, add current milliseconds hex string
	  retId += formatSeed(parseInt(new Date().getTime() / 1000, 10), 8);
	  retId += formatSeed(this.php_js.uniqidSeed, 5); // add seed hex string
	  if (more_entropy) {
	    // for more entropy we add a float lower to 10
	    retId += (Math.random() * 10).toFixed(8).toString();
	  }

	  return retId;
	}

}

module.exports = StampRequest;