const AccountBalanceService = require('../SWServices/AccountBalance/AccountBalanceService');
const SDKTEST_TOKEN = process.env.SDKTEST_TOKEN;
var chai = require('chai');
var assert = chai.assert;
var expectedResult = 'success'

describe('AccountBalance.js', function () {

	describe('ConsultaDeSaldo_Sucess', function () {
		this.timeout(15000);
		var result = 'error';
		var msg = '';

		var params = {
			url: 'https://services.test.sw.com.mx',
			token: SDKTEST_TOKEN,
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

			var accountBalance = AccountBalanceService.Set(params);
			accountBalance.GetAccountBalance(callback);
		});

		it('Success si se ha realizado la consulta de saldos', function () {
			assert.equal(result, expectedResult, msg);
		});
	});

	describe('ConsultaDeSaldo_Error', function () {
		this.timeout(15000);
		var result = 'error';
		var msg = '';

		var params = {
			url: 'https://services.test.sw.com.mx',
			token: "T2lYQ0t4",
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

			var accountBalance = AccountBalanceService.Set(params);
			accountBalance.GetAccountBalance(callback);
		});

		it('Success si se ha realizado la consulta de saldos', function () {
			assert.equal(result, "error", msg);
		});
	});
});