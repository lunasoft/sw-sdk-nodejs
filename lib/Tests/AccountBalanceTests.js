var chai = require('chai');
var assert = chai.assert;
const AccountBalanceService = require('../SWServices/AccountBalance/AccountBalanceService');

var expectedResult = 'success'

describe('AccountBalance.js', function(){
	describe('Consulta de saldo', function() {
		this.timeout(15000);
		var result = 'error';
		var errorMsg = '';

		var params = {
			url: 'http://services.test.sw.com.mx',
			token: process.env.SDKTEST_TOKEN
		};

	  	beforeEach(function(done){ 
	  		var callback = (error, data) => {
	  			if(error) {
	  				result = error.status;
	  				errorMsg = error.message;
	  			} else {
	  				result = data.status;
	  			}
			 	done();
			};

			var accountBalance = AccountBalanceService.Set(params);
			accountBalance.GetAccountBalance(callback);
	  	});

		it('Success si se ha realizado la consulta de saldos', function() {
			assert.equal(result, expectedResult, errorMsg);
		});

	});
});