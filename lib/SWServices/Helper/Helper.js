const https = require('https');
const http = require('http');

const httpsAgentTLS12 = new https.Agent({
	secureProtocol: 'TLSv1_2_method'
});

const httpAgent = new http.Agent();

/**
 * Valida que la URL sea HTTP o HTTPS y retorna { url, module, agent }.
 * @param {string} url
 * @returns {{url: string, module: typeof https | typeof http, agent: https.Agent | http.Agent}}
 * @throws {Error}
 */
const getUrlAndModule = url => {
	if (typeof url !== 'string' ||(!url.startsWith('https://') && !url.startsWith('http://'))) {
		throw new Error('Solo se permiten peticiones HTTP o HTTPS.');
	}

	let trimmedUrl, module, agent;
	if (url.startsWith('https://')) {
		trimmedUrl = url.replace(/^https:\/\//, '');
		module = https;
		agent = httpsAgentTLS12;
	} else {
		trimmedUrl = url.replace(/^http:\/\//, '');
		module = http;
		agent = httpAgent;
	}

	return {
		url: trimmedUrl,
		module: module,
		agent: agent
	};
};

module.exports = { getUrlAndModule };
