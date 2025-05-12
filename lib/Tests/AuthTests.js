const { assert } = require('chai');
const AuthenticationService = require('../SWServices/Authentication/AuthenticationService');

const { SDKTEST_USER, SDKTEST_PASSWORD } = process.env;

const SERVICES_URL = 'https://services.test.sw.com.mx';

describe('AuthenticationService', function () {
	this.timeout(15000);

	describe('AuthenticationTest', function () {
		it('Sucess con credenciales válidas', function (done) {
			const params = {
				url: SERVICES_URL,
				user: SDKTEST_USER,
				password: SDKTEST_PASSWORD
			};

			const auth = AuthenticationService.auth(params);
			auth.Token((err, res) => {
				assert.isNull(err, 'No debe devolver error');
				assert.equal(res.status, 'success', 'El status debe ser "success"');
				assert.isString(res.data.token, 'Debe devolver un token');
				assert.isNotEmpty(res.data.token, 'El token no debe estar vacío');
				done();
			});
		});

		it('Error con credenciales inválidas', function (done) {
			const params = {
				url: SERVICES_URL,
				user: 'usuario_invalido',
				password: 'password_invalido'
			};

			const auth = AuthenticationService.auth(params);
			auth.Token((err, res) => {
				assert.isNotNull(err, 'Debe devolver un error');
				assert.equal(err.status, 'error', 'El status debe ser "error"');
				assert.isString(err.message, 'Debe haber un mensaje de error');
				done();
			});
		});
	});
});
