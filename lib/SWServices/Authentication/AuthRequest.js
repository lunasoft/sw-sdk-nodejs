const helper = require('../Helper/Helper.js');

/**
 * Clase para gestionar la autenticación en los servicios.
 */
class AuthRequest {
  /**
   * Envía una petición para autenticar al usuario.
   * @param {string} url – URL base services.
   * @param {string} pass – Contraseña.
   * @param {string} user – Usuario.
   * @param {Function} callback – (error, response)
   */
  static sendReq(url, pass, user, callback) {
    const { url: hostname, module: httpModule, agent } = helper.getUrlAndModule(url);
    const payload = JSON.stringify({ user, password: pass });
	
    const options = {
      hostname,
      path: '/v2/security/authenticate',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      },
      agent
    };

    const req = httpModule.request(options, res => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        if (res.statusCode !== 200) {
          return callback(
            { status: 'error', message: res.statusCode, messageDetail: res.statusMessage },
            null
          );
        }
        try {
          callback(null, JSON.parse(body));
        } catch (err) {
          callback(
            { status: 'error', message: err.message, messageDetail: err.stack },
            null
          );
        }
      });
    });

    req.on('error', e => {
      callback(
        { status: 'error', message: e.code, messageDetail: e.message },
        null
      );
    });

    req.write(payload);
    req.end();
  }
}

module.exports = AuthRequest;
