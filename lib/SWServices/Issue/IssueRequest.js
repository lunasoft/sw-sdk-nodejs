const helper = require("../Helper/Helper.js");

class IssueRequest {

    static sendReq(url, token, xml, version, isB64, callback) {
        this._sendRequest(url, token, xml, version, isB64, callback);
    }

    static _sendRequest(url, token, xml, version, isB64, callback) {
        const container = helper.getUrlAndModule(url);
        url = container.url;
        const module = container.module;
        const agent = container.agent;

        const delimiter = '-------------' + IssueRequest._uniqid();
        const fileFields = {
            xml: {
                type: "text/xml",
                content: xml
            }
        };

        let data = "";

        Object.keys(fileFields).forEach(function (name) {
            const file = fileFields[name];
            data += `--${delimiter}\r\n`;
            data += `Content-Disposition: form-data; name="${name}"; `;
            data += `filename="${name}"\r\n`;
            data += `Content-Type: ${file.type}\r\n`;
            data += "\r\n";
            data += `${file.content}\r\n`;
        });

        data += `--${delimiter}--\r\n`;

        const pathSuffix = isB64 ? '/b64' : '';
        const options = {
            hostname: url,
            path: `/cfdi33/issue/${version}${pathSuffix}`,
            method: "POST",
            headers: {
                "Content-Type": `multipart/form-data; boundary=${delimiter}`,
                "Content-Length": Buffer.byteLength(data, 'utf8'),
                "Authorization": `Bearer ${token}`
            },
            agent: agent
        };

        const req = module.request(options, (res) => {
            const body = [];

            res.on('data', (d) => {
                body.push(d);
            });

            try {
                res.on('end', () => {
                    if (res.statusCode !== 200) {
                        const errRes = body ? JSON.parse(body) : {
                            status: 'error',
                            message: res.statusCode,
                            messageDetail: res.statusMessage
                        };
                        callback(errRes, null);
                    } else {
                        callback(null, JSON.parse(body));
                    }
                });
            } catch (e) {
                console.error(`Error en sendReq${isB64 ? 'B64' : ''}`, e);
                callback(e, null);
            }
        });

        req.on('error', (e) => {
            console.error(`Error en sendReq${isB64 ? 'B64' : ''}`, e);
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

    static _uniqid(prefix, more_entropy) {
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
