const fs = require("fs");
const helper = require("../Helper/Helper.js");

class IssueRequest {

    static sendReq(url, token, xml, version, callback) {
        var container = helper.getUrlAndModule(url);
        url = container.url;
        var module = container.module;

        var delimiter = '-------------' + IssueRequest._uniqid();
        var fileFields = {
            xml: {
                type: "text/xml",
                content: xml
            }
        };

        var data = "";

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

        var options = {
            hostname: url,
            path: `/cfdi33/issue/${version}`,
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
                body += d;
            });

            res.on('end', () => {
                if (res.statusCode != 200) {
                    if (body)
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

        var delimiter = '-------------'+ IssueRequest._uniqid();

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
            path: `/cfdi33/issue/${version}/b64`,
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
                body += d;
            });

            res.on('end', () => {
                if (res.statusCode != 200) {
                    if (body)
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
            console.log('Error en sendJSONReq', e);
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

	static _uniqid (prefix, more_entropy) {
        if (typeof prefix === 'undefined') {
          prefix = "";
        }
  
        var retId;
        var formatSeed = function (seed, reqWidth) {
          seed = parseInt(seed, 10).toString(16);
          if (reqWidth < seed.length) {
            return seed.slice(seed.length - reqWidth);
          }
          if (reqWidth > seed.length) {
            return Array(1 + (reqWidth - seed.length)).join('0') + seed;
          }
          return seed;
        };
  
        if (!this.php_js) {
          this.php_js = {};
        }
        if (!this.php_js.uniqidSeed) {
          this.php_js.uniqidSeed = Math.floor(Math.random() * 0x75bcd15);
        }
        this.php_js.uniqidSeed++;
  
        retId = prefix;
        retId += formatSeed(parseInt(new Date().getTime() / 1000, 10), 8);
        retId += formatSeed(this.php_js.uniqidSeed, 5);
        if (more_entropy) {
          retId += (Math.random() * 10).toFixed(8).toString();
        }
  
        return retId;
      }
}

module.exports = IssueRequest;
