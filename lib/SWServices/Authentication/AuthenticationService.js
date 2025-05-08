const Services = require('../Services.js');
const AuthRequest = require('./AuthRequest.js');

/**
 * Gestiona la obtención y renovación del token de autenticación.
  * @extends Services
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
}

module.exports = AuthenticationService;
