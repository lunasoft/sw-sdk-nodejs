const https = require('https');
const http = require('http');

const httpsAgentTLS12 = new https.Agent({
	// Configuración principal para TLS 1.2+ (compatible con todas las versiones)
	secureProtocol: 'TLSv1_2_method',
	// Configuración de cifrados seguros
	ciphers: 'ECDHE+AESGCM:ECDHE+CHACHA20:DHE+AESGCM:DHE+CHACHA20:!aNULL:!MD5:!DSS:!RC4:!DES:!3DES',
	honorCipherOrder: true,
	// Configuraciones de seguridad - configurable para desarrollo/producción
	rejectUnauthorized: process.env.NODE_ENV === 'production' ? true : false,
	// Configuración de timeouts y conexiones
	timeout: 30000,
	keepAlive: true,
	keepAliveMsecs: 1000,
	// Configuraciones adicionales para forzar TLS 1.2+
	secureOptions: require('constants').SSL_OP_NO_SSLv2 | require('constants').SSL_OP_NO_SSLv3 | require('constants').SSL_OP_NO_TLSv1 | require('constants').SSL_OP_NO_TLSv1_1
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

/**
 * Genera un identificador único basado en la hora actual y un número aleatorio.
 * @param {string} [prefix=""] - Prefijo opcional para el identificador.
 * @param {boolean} [more_entropy=false] - Si es `true`, agrega más entropía.
 * @returns {string} El identificador único generado.
 */
const uniqid = (prefix, more_entropy) => {
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
};

module.exports = { getUrlAndModule, uniqid };
