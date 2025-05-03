const https = require("https");

const httpsAgentTLS12 = new https.Agent({
	secureProtocol: 'TLSv1_2_method'
});

var helper = {
	getUrlAndModule: (url) => {
		if (!url.startsWith("https://")) {
			throw new Error("Solo se permiten peticiones HTTPS.");
		}

		let module = https;
		let agent = httpsAgentTLS12;
		url = url.replace("https://", "");

		return { url: url, module: module, agent: agent }
	}
}

module.exports = helper;