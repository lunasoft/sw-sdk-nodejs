const helper = require('../Helper/Helper.js');

/**
 * @class AccountBalanceRequest
 * Clase para gestionar los movimientos de saldo y timbres en la cuenta.
 */
class AccountBalanceRequest {
	/**
	 * Envía una petición al servicio de balance.
	 *
	 * @param {string} url – URL base del servicio.
	 * @param {string} path – Path del servicio.
	 * @param {string} token   – Token de autenticación.
	 * @param {'GET'|'POST'|'DELETE'} method – Método HTTP.
	 * @param {Object|null} body – Data a enviar (de aplicar) o null.
	 * @param {Object} [headers={}] – Headers adicionales (de aplicar).
	 * @param {Function} callback  – (error, JSON response)
	 * @private
	 */
	static sendRequest(url, path, token, method, body, headers = {}, callback) {
		const { url: hostname, module: httpModule, agent } = helper.getUrlAndModule(url);
		const payload = body ? JSON.stringify(body) : null;

		const baseHeaders = {
			Authorization: `Bearer ${token}`,
			...(payload ? { 'Content-Length': Buffer.byteLength(payload) } : {})
		};
		const finalHeaders = { ...baseHeaders, ...headers };

		const options = {
			hostname,
			path,
			method,
			headers: finalHeaders,
			agent,
		};

		const req = httpModule.request(options, res => {
			let data = '';
			res.on('data', chunk => data += chunk);
			res.on('end', () => {
				if (res.statusCode !== 200) {
					let errorData = JSON.parse(data);
					return callback({
						status: errorData.status || 'error',
						message: errorData.message,
					}, null);
				}
				try {
					callback(null, JSON.parse(data));
				} catch (err) {
					callback({
						status: 'error',
						message: 'ParseError',
						messageDetail: err.message
					}, null);
				}
			});
		});

		req.on('error', err => {
			callback({
				status: 'error',
				message: err.message || err.code,
				messageDetail: err.stack
			}, null);
		});

		if (payload) req.write(payload);
		req.end();
	}

	/**
	 * Método para obtener el balance por token.
	 *
	 * @param {string} urlApi – URL base.
	 * @param {string} token      – Token.
	 * @param {Function} callback – (error, JSON response)
	 */
	static getBalanceRequest(urlApi, token, callback) {
		const path = "/management/v2/api/users/balance";
		this.sendRequest(urlApi, path, token, 'GET', null, {}, callback);
	}

	/**
	 * Método para añadir o eliminar timbres a una cuenta.
	 *
	 * @param {string} urlApi    – URL base.
	 * @param {string} token     – Token.
	 * @param {'POST'|'DELETE'} action – POST para añadir, DELETE para eliminar.
	 * @param {string} id        – ID del usuario.
	 * @param {number} stamps    – Cantidad de timbres a añadir o eliminar.
	 * @param {string|null} comment – Comentario (opcional).
	 * @param {Function} callback   – (error, JSON response))
	 */
	static distributionStampRequest(urlApi, token, action, id, stamps, comment, callback) {
		const path = `/management/v2/api/dealers/users/${id}/stamps`;
		const body = { stamps };
		if (comment != null) body.comment = comment;

		this.sendRequest(urlApi, path, token, action, body, { 'Content-Type': 'application/json' }, callback);
	}
}

module.exports = AccountBalanceRequest;
