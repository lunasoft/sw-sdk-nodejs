const Services    = require('../Services.js');
const AuthRequest = require('./AuthRequest.js');

/**
 * Gestiona la obtención y renovación del token de autenticación.
 * Extiende Services.
 */
class AuthenticationService extends Services {
  /**
   * @param {Object} params
   * @param {string} params.url
   * @param {string} params.user
   * @param {string} params.password
   */
  constructor(params) {
    super(params);
  }

  /**
   * Genera una instancia válida.
   * @param {Object} params – { url, user, password }
   * @returns {AuthenticationService}
   */
  static auth(params) {
    if (!params || Object.keys(params).length === 0) {
      throw new Error('No hay valores');
    }
    return new AuthenticationService(params);
  }

  /**
   * Obtiene token de autenticación.
   * Almacena el token en this._token y setea expiración.
   * @param {Function} callback – (error, response)
   */
  Token(callback) {
    AuthRequest.sendReq(
      this.get_url(),
      this.get_password(),
      this.get_user(),
      (err, res) => {
        if (err) {
          return callback(err, null);
        }
        this.set_token(res.data.token);
        this._setExpirationDate();
        callback(null, res);
      }
    );
  }

  /**
   * Obteiene token de autenticación de forma asíncrona.
   * Almacena el token en this._token y setea expiración.
   * @returns {Promise<Object>}
   */
  async TokenAsync() {
    const res = await new Promise((resolve, reject) => {
      AuthRequest.sendReq(
        this.get_url(),
        this.get_password(),
        this.get_user(),
        (err, r) => (err ? reject(err) : resolve(r))
      );
    });
    this.set_token(res.data.token);
    this._setExpirationDate();
    return res;
  }
}

module.exports = AuthenticationService;
