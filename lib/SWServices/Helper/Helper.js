const https = require('https');

const httpsAgentTLS12 = new https.Agent({
	secureProtocol: 'TLSv1_2_method'
});

/**
 * Valida que la URL sea https y retorna {url, module, agent}.
 * @param {string} url
 * @returns {{url: string, module: typeof https, agent: https.Agent}}
 * @throws {Error}
 */
const getUrlAndModule = url => {
	if (typeof url !== 'string' || !url.startsWith('https://')) {
		throw new Error('Solo se permiten peticiones HTTPS.');
	}

	const trimmedUrl = url.replace(/^https:\/\//, '');
	return {
		url: trimmedUrl,
		module: https,
		agent: httpsAgentTLS12
	};
};

module.exports = { getUrlAndModule };
