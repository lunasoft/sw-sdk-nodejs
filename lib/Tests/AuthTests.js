var chai = require('chai');
var assert = chai.assert;
var AuthenticationService = require('../SWServices/Authentication/AuthenticationService');

let obj = {
	url : "http://services.test.sw.com.mx",
	user: process.env.SDKTEST_USER,
	password: process.env.SDKTEST_PASSWORD,
}

describe('Authentication.js', function(){
	describe('AuthenticationService', function() {
	  it('Auth debe ser una instancia de AuthenticationService', function() {
		var auth = AuthenticationService.auth(obj);
		assert.instanceOf(auth, AuthenticationService, 'No una instancia de AuthenticationService');
	  });
	});


	describe('AuthenticationServiceError', function() {
	  it('Debe lanzar una excepción si no le pasas parametros a Authentication', function() {
	    assert.throws(()=>AuthenticationService.auth(''), Error, "No tiene datos");
	  });
	});
});
