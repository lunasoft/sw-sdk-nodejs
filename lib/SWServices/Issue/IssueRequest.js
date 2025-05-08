const helper = require("../Helper/Helper.js");

class IssueRequest {
    /**
     * Envía la petición al servicio Emisión Timbrado.
     *
     * @param {string} url      – URL base services.
     * @param {string} token    – Token.
     * @param {string} xml      – XML o XML en base64.
     * @param {'v1'|'v2'|'v3'|'v4'} version
     * @param {boolean} isB64
     * @param {Function} callback – (error, JSON response)
     */
    static sendReq(url, token, xml, version, isB64, callback) {
        const { url: hostname, module: httpModule, agent } = helper.getUrlAndModule(url);

        const boundary = "----IssueBoundary" + IssueRequest._uniqid();

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

    static _uniqid(prefix = "", more_entropy) {
        let retId, seed = Math.floor(Math.random() * 0x75bcd15);
        const formatSeed = (s, w) => {
            s = parseInt(s, 10).toString(16);
            return w > s.length ? "0".repeat(w - s.length) + s : s.slice(-w);
        };
        if (!this.php_js) this.php_js = { uniqidSeed: 0 };
        this.php_js.uniqidSeed++;
        retId = prefix +
            formatSeed(Math.floor(Date.now() / 1000), 8) +
            formatSeed(this.php_js.uniqidSeed, 5);
        if (more_entropy) retId += (Math.random() * 10).toFixed(8);
        return retId;
    }
}

module.exports = IssueRequest;
