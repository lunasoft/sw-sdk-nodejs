const http = require("http");
const https = require("https");

// Agente personalizado para TLS 1.2
const httpsAgentTLS12 = new https.Agent({
	secureProtocol: 'TLSv1_2_method'
});

var helper = {
	getUrlAndModule: (url) => {
		var module = url.indexOf("https") === -1 ? http : https;
		var agent = null;

		if (url.indexOf("https") === -1) {
			module = http;
			url = url.replace("http://", "");
		} else {
			module = https;
			url = url.replace("https://", "");
			agent = httpsAgentTLS12;
		}

		return { url: url, module: module, agent: agent }
	}
}

module.exports = helper;