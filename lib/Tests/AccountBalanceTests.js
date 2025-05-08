const { assert } = require('chai');
const AccountBalanceService = require('../SWServices/AccountBalance/AccountBalanceService');

const { SDKTEST_TOKEN, SDKTEST_USER, SDKTEST_PASSWORD } = process.env;
const SERVICES_URL = 'https://services.test.sw.com.mx';
const API_URL = 'https://api.test.sw.com.mx';

const VALID_ID = 'fafb2ac2-62ca-49f8-91de-14cea73b01eb';
const INVALID_ID_ADD = 'fafb2ac2-62ca-49f8-91de-14cea73b01fb';
const INVALID_ID_REM = 'dec88317-e174-400a-9d23-9bb687444600';

describe('AccountBalanceServiceTest', function () {
	this.timeout(30000);

	describe('GetAccountBalance', function () {
		it('Success con credenciales', done => {
			const params = {
				url: SERVICES_URL,
				urlApi: API_URL,
				user: SDKTEST_USER,
				password: SDKTEST_PASSWORD
			};
			AccountBalanceService.Set(params).GetAccountBalance((err, res) => {
				assert.equal(res.status, 'success');
				assert.isNotEmpty(res.data);
				done();
			});
		});

		it('Success con token', done => {
			const params = {
				urlApi: API_URL,
				token: SDKTEST_TOKEN
			};
			AccountBalanceService.Set(params).GetAccountBalance((err, res) => {
				assert.equal(res.status, 'success');
				assert.isNotEmpty(res.data);
				done();
			});
		});

		it('Error con token inválido', done => {
			const params = {
				urlApi: API_URL,
				token: '1'
			};
			AccountBalanceService.Set(params).GetAccountBalance((err, res) => {
				assert.isNotNull(err);
				assert.equal(err.status, 'error');
				done();
			});
		});
	});

	describe('AddStamps', function () {
		it('Success con token', done => {
			const params = {
				urlApi: API_URL,
				token: SDKTEST_TOKEN
			};
			AccountBalanceService.Set(params).AddStamps(VALID_ID, 1, 'Prueba JS', (err, res) => {
				assert.isNull(err);
				assert.equal(res.status, 'success');
				assert.isNumber(res.data, 'Data debe ser un número');
				done();
			}
			);
		});

		it('Success con credenciales', done => {
			const params = {
				url: SERVICES_URL,
				urlApi: API_URL,
				user: SDKTEST_USER,
				password: SDKTEST_PASSWORD
			};
			AccountBalanceService.Set(params).AddStamps(VALID_ID, 1, 'Prueba JS', (err, res) => {
				assert.isNull(err);
				assert.equal(res.status, 'success');
				assert.isNumber(res.data, 'Data debe ser un número');
				done();
			}
			);
		});

		it('Error con usuario inválido', done => {
			const params = {
				urlApi: API_URL,
				token: SDKTEST_TOKEN
			};
			AccountBalanceService.Set(params).AddStamps(INVALID_ID_ADD, 1, 'Prueba JS', (err, res) => {
				assert.isNotNull(err);
				assert.equal(err.message, 'El usuario no fue encontrado.');
				done();
			}
			);
		});
	});

	describe('RemoveStamps', function () {
		it('Success con token', done => {
			const params = {
				urlApi: API_URL,
				token: SDKTEST_TOKEN
			};
			AccountBalanceService.Set(params).RemoveStamps(VALID_ID, 1, 'Prueba JS Remove', (err, res) => {
				assert.isNull(err);
				assert.equal(res.status, 'success');
				assert.isNumber(res.data, 'Data debe ser un número');
				done();
			}
			);
		});

		it('Success con credenciales', done => {
			const params = {
				url: SERVICES_URL,
				urlApi: API_URL,
				user: SDKTEST_USER,
				password: SDKTEST_PASSWORD
			};
			AccountBalanceService.Set(params).RemoveStamps(
				VALID_ID, 1, 'Prueba JS Remove', (err, res) => {
					assert.isNull(err);
					assert.equal(res.status, 'success');
					assert.isNumber(res.data, 'Data debe ser un número');
					done();
				}
			);
		});

		it('Error con usuario inválido', done => {
			const params = {
				urlApi: API_URL,
				token: SDKTEST_TOKEN
			};
			AccountBalanceService.Set(params).RemoveStamps(INVALID_ID_REM, 1, 'Prueba JS Remove', (err, res) => {
				assert.isNotNull(err);
				assert.equal(err.status, 'error');
				done();
			}
			);
		});
	});
});
