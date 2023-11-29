const AuthenticationService = require('../SWServices/Authentication/AuthenticationService');
const SDKTEST_USER = process.env.SDKTEST_USER;
const SDKTEST_PASSWORD = process.env.SDKTEST_PASSWORD;
var chai = require('chai');
var assert = chai.assert;

describe('Authentication.js', function () {

	describe('Authentication_Test_ValidateAuthentication', function () {
		this.timeout(15000);
		var result = 'success';
		var msg = '';

		var params = {
			user: SDKTEST_USER,
			password: SDKTEST_PASSWORD,
			url: 'http://services.test.sw.com.mx'
		};

		beforeEach(function (done) {
			var callback = (error, data) => {
				if (error) {
					result = error.status;
					msg = error.message;
				} else {
					result = data.status;
					msg = data.data.token
				}
				done();
			};

			var auth = AuthenticationService.auth(params);
			auth.Token(callback);
		});

		it('ValidateAuthentication', function () {
			assert.equal(result, 'success', msg);
			assert.isNotEmpty(msg);
		});
	});

	describe('Authentication_Test_ValidateAuthentication_Error', function () {
		this.timeout(15000);
		var result = 'error';
		var msg = '';

		var params = {
			user: SDKTEST_USER,
			password: "123456789a",
			url: 'http://services.test.sw.com.mx'
		};

		beforeEach(function (done) {
			var callback = (error, data) => {
				if (error) {
					result = error.status;
					msg = error.message;
				} else {
					result = data.status;
				}
				done();
			};

			var auth = AuthenticationService.auth(params);
			auth.Token(callback);
		});

		it('ValidateAuthentication', function () {
			assert.equal(result, 'error', msg);
			assert.isNotNull(msg);
		});
	});
});
