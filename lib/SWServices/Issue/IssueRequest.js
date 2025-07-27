const helper = require("../Helper/Helper.js");

class IssueRequest {
    /**
     * Envía la petición al servicio Emisión Timbrado.
     *
     * @param {string} url                  – URL base services.
     * @param {string} token                – Token.
     * @param {string} xml                  – XML o XML en base64.
     * @param {'v1'|'v2'|'v3'|'v4'} version – Versión del servicio.
     * @param {boolean} isB64               – Indica si el XML está en base64.
     * @param {Function} callback           – (error, JSON response)
     */
    static sendReq(url, token, xml, version, isB64, callback) {
        this._sendRequest(url, token, xml, version, isB64, callback);
    }

    static sendReqV4(url, token, xml, version, isB64, callback, customHeaders = {}) {
        this._sendRequestV4(url, token, xml, version, isB64, callback, customHeaders);
    }

    static _sendRequest(url, token, xml, version, isB64, callback) {
        const { url: hostname, module: httpModule, agent } = helper.getUrlAndModule(url);

        const boundary = "----IssueBoundary" + helper.uniqid();

        let body = `--${boundary}\r\n` +
            `Content-Disposition: form-data; name="xml"; filename="xml"\r\n` +
            `Content-Type: text/xml\r\n\r\n` +
            xml + `\r\n` +
            `--${boundary}--\r\n`;

        const options = {
            hostname,
            path: `/cfdi33/issue/${version}${isB64 ? '/b64' : ''}`,
            method: "POST",
            headers: {
                "Content-Type": `multipart/form-data; boundary=${boundary}`,
                "Content-Length": Buffer.byteLength(body, "utf8"),
                "Authorization": `Bearer ${token}`
            },
            agent
        };

        const req = httpModule.request(options, res => {
            let data = "";
            res.on("data", chunk => data += chunk);
            res.on("end", () => {
                if (res.statusCode !== 200) {
                    let errObj;
                    try {
                        errObj = JSON.parse(data);
                    }
                    catch {
                        errObj = {
                            status: "error",
                            message: res.statusCode,
                            messageDetail: res.statusMessage
                        };
                    }
                    return callback(errObj, null);
                }
                try {
                    callback(null, JSON.parse(data));
                } catch (e) {
                    callback({
                        status: "error",
                        message: "ParseError",
                        messageDetail: e.message
                    }, null);
                }
            });
        });

        req.on("error", e => {
            callback({
                status: "error",
                message: e.code,
                messageDetail: e.message
            }, null);
        });

        req.write(body);
        req.end();
    }

    static _sendRequestV4(url, token, xml, version, isB64, callback, customHeaders = {}) {
        const { url: hostname, module: httpModule, agent } = helper.getUrlAndModule(url);

        const boundary = "----IssueBoundary" + helper.uniqid();

        let body = `--${boundary}\r\n` +
            `Content-Disposition: form-data; name="xml"; filename="xml"\r\n` +
            `Content-Type: text/xml\r\n\r\n` +
            xml + `\r\n` +
            `--${boundary}--\r\n`;

        const defaultHeaders = {
            "Content-Type": `multipart/form-data; boundary=${boundary}`,
            "Content-Length": Buffer.byteLength(body, "utf8"),
            "Authorization": `Bearer ${token}`
        };

        const headers = { ...defaultHeaders, ...customHeaders };

        const options = {
            hostname,
            path: `/v4/cfdi33/issue/${version}${isB64 ? '/b64' : ''}`,
            method: "POST",
            headers,
            agent
        };

        const req = httpModule.request(options, res => {
            let data = "";
            res.on("data", chunk => data += chunk);
            res.on("end", () => {
                if (res.statusCode !== 200) {
                    let errObj;
                    try {
                        errObj = JSON.parse(data);
                    }
                    catch {
                        errObj = {
                            status: "error",
                            message: res.statusCode,
                            messageDetail: res.statusMessage
                        };
                    }
                    return callback(errObj, null);
                }
                try {
                    callback(null, JSON.parse(data));
                } catch (e) {
                    callback({
                        status: "error",
                        message: "ParseError",
                        messageDetail: e.message
                    }, null);
                }
            });
        });

        req.on("error", e => {
            callback({
                status: "error",
                message: e.code,
                messageDetail: e.message
            }, null);
        });

        req.write(body);
        req.end();
    }
}

module.exports = IssueRequest;
