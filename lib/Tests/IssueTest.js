const fs = require('fs');
const path = require('path');
const { assert } = require('chai');
const IssueService = require('../SWServices/Issue/IssueService');

const { SDKTEST_TOKEN, SDKTEST_USER, SDKTEST_PASSWORD } = process.env;

const SERVICES_URL = 'https://services.test.sw.com.mx';
const EXPECTED_MSG = '307. El comprobante contiene un timbre previo.';
const XML_FILE = path.join(__dirname, 'Resources', 'file.xml');
const B64_FILE = path.join(__dirname, 'Resources', 'b64.txt');

describe('IssueServiceTest', function () {
	this.timeout(60000);

	const authParams = {
		url: SERVICES_URL,
		user: SDKTEST_USER,
		password: SDKTEST_PASSWORD
	};

	const tokenParams = {
		url: SERVICES_URL,
		token: SDKTEST_TOKEN
	};

	/*----------------------------------------------------------V1----------------------------------------------------------*/
	describe('IssueXMLV1', function () {
		this.timeout(15000);

		it('Success con credenciales (V1)', function (done) {
			fs.readFile(XML_FILE, 'utf8', function (err, xml) {
				if (err) return done(err);
				IssueService.Set(authParams).IssueV1(xml, function (error, response) {
					const result = error ? error.status : response.status;
					const msg = error ? error.message : response.message;
					const data = error ? null : response.data;

					if (result === 'success') {
						assert.isNotNull(data, 'data no debe ser nulo');
						assert.isNotEmpty(data, 'data no debe estar vacío');
					} else {
						assert.equal(result, 'error');
						assert.equal(msg, EXPECTED_MSG);
						assert.isNull(data);
					}
					done();
				});
			});
		});

		it('Success con token (V1)', function (done) {
			fs.readFile(XML_FILE, 'utf8', function (err, xml) {
				if (err) return done(err);
				IssueService.Set(tokenParams).IssueV1(xml, function (error, response) {
					const result = error ? error.status : response.status;
					const msg = error ? error.message : response.message;
					const data = error ? null : response.data;

					if (result === 'success') {
						assert.isNotNull(data);
						assert.isNotEmpty(data);
					} else {
						assert.equal(result, 'error');
						assert.equal(msg, EXPECTED_MSG);
						assert.isNull(data);
					}
					done();
				});
			});
		});

		it('Success B64 con credenciales (V1)', function (done) {
			fs.readFile(B64_FILE, 'utf8', function (err, b64) {
				if (err) return done(err);
				IssueService.Set(authParams).IssueV1(b64, function (error, response) {
					const result = error ? error.status : response.status;
					const msg = error ? error.message : response.message;
					const data = error ? null : response.data;

					if (result === 'success') {
						assert.isNotNull(data);
						assert.isNotEmpty(data);
					} else {
						assert.equal(result, 'error');
						assert.equal(msg, EXPECTED_MSG);
						assert.isNull(data);
					}
					done();
				}, true);
			});
		});

		it('Success B64 con token (V1)', function (done) {
			fs.readFile(B64_FILE, 'utf8', function (err, b64) {
				if (err) return done(err);
				IssueService.Set(tokenParams).IssueV1(b64, function (error, response) {
					const result = error ? error.status : response.status;
					const msg = error ? error.message : response.message;
					const data = error ? null : response.data;

					if (result === 'success') {
						assert.isNotNull(data);
						assert.isNotEmpty(data);
					} else {
						assert.equal(result, 'error');
						assert.equal(msg, EXPECTED_MSG);
						assert.isNull(data);
					}
					done();
				}, true);
			});
		});
	});

	/*----------------------------------------------------------V2----------------------------------------------------------*/
	describe('IssueXMLV2', function () {
		this.timeout(15000);

		it('Success con credenciales (V2)', function (done) {
			fs.readFile(XML_FILE, 'utf8', function (err, xml) {
				if (err) return done(err);
				IssueService.Set(authParams).IssueV2(xml, function (error, response) {
					const result = error ? error.status : response.status;
					const msg = error ? error.message : response.message;
					const data = error ? null : response.data;

					if (result === 'success') {
						assert.isNotNull(data, 'data no debe ser nulo');
						assert.isNotEmpty(data, 'data no debe estar vacío');
					} else {
						assert.equal(result, 'error');
						assert.equal(msg, EXPECTED_MSG);
						assert.isNull(data);
					}
					done();
				});
			});
		});

		it('Success con token (V2)', function (done) {
			fs.readFile(XML_FILE, 'utf8', function (err, xml) {
				if (err) return done(err);
				IssueService.Set(tokenParams).IssueV2(xml, function (error, response) {
					const result = error ? error.status : response.status;
					const msg = error ? error.message : response.message;
					const data = error ? null : response.data;

					if (result === 'success') {
						assert.isNotNull(data);
						assert.isNotEmpty(data);
					} else {
						assert.equal(result, 'error');
						assert.equal(msg, EXPECTED_MSG);
						assert.isNull(data);
					}
					done();
				});
			});
		});

		it('Success B64 con credenciales (V2)', function (done) {
			fs.readFile(B64_FILE, 'utf8', function (err, b64) {
				if (err) return done(err);
				IssueService.Set(authParams).IssueV2(b64, function (error, response) {
					const result = error ? error.status : response.status;
					const msg = error ? error.message : response.message;
					const data = error ? null : response.data;

					if (result === 'success') {
						assert.isNotNull(data);
						assert.isNotEmpty(data);
					} else {
						assert.equal(result, 'error');
						assert.equal(msg, EXPECTED_MSG);
						assert.isNull(data);
					}
					done();
				}, true);
			});
		});

		it('Success B64 con token (V2)', function (done) {
			fs.readFile(B64_FILE, 'utf8', function (err, b64) {
				if (err) return done(err);
				IssueService.Set(tokenParams).IssueV2(b64, function (error, response) {
					const result = error ? error.status : response.status;
					const msg = error ? error.message : response.message;
					const data = error ? null : response.data;

					if (result === 'success') {
						assert.isNotNull(data);
						assert.isNotEmpty(data);
					} else {
						assert.equal(result, 'error');
						assert.equal(msg, EXPECTED_MSG);
						assert.isNull(data);
					}
					done();
				}, true);
			});
		});
	});

	/*----------------------------------------------------------V3----------------------------------------------------------*/
	describe('IssueXMLV3', function () {
		this.timeout(15000);

		it('Success con credenciales (V3)', function (done) {
			fs.readFile(XML_FILE, 'utf8', function (err, xml) {
				if (err) return done(err);
				IssueService.Set(authParams).IssueV3(xml, function (error, response) {
					const result = error ? error.status : response.status;
					const msg = error ? error.message : response.message;
					const data = error ? null : response.data;

					if (result === 'success') {
						assert.isNotNull(data, 'data no debe ser nulo');
						assert.isNotEmpty(data, 'data no debe estar vacío');
					} else {
						assert.equal(result, 'error');
						assert.equal(msg, EXPECTED_MSG);
						assert.isNull(data);
					}
					done();
				});
			});
		});

		it('Success con token (V3)', function (done) {
			fs.readFile(XML_FILE, 'utf8', function (err, xml) {
				if (err) return done(err);
				IssueService.Set(tokenParams).IssueV3(xml, function (error, response) {
					const result = error ? error.status : response.status;
					const msg = error ? error.message : response.message;
					const data = error ? null : response.data;

					if (result === 'success') {
						assert.isNotNull(data);
						assert.isNotEmpty(data);
					} else {
						assert.equal(result, 'error');
						assert.equal(msg, EXPECTED_MSG);
						assert.isNull(data);
					}
					done();
				});
			});
		});

		it('Success B64 con credenciales (V3)', function (done) {
			fs.readFile(B64_FILE, 'utf8', function (err, b64) {
				if (err) return done(err);
				IssueService.Set(authParams).IssueV3(b64, function (error, response) {
					const result = error ? error.status : response.status;
					const msg = error ? error.message : response.message;
					const data = error ? null : response.data;

					if (result === 'success') {
						assert.isNotNull(data);
						assert.isNotEmpty(data);
					} else {
						assert.equal(result, 'error');
						assert.equal(msg, EXPECTED_MSG);
						assert.isNull(data);
					}
					done();
				}, true);
			});
		});

		it('Success B64 con token (V3)', function (done) {
			fs.readFile(B64_FILE, 'utf8', function (err, b64) {
				if (err) return done(err);
				IssueService.Set(tokenParams).IssueV3(b64, function (error, response) {
					const result = error ? error.status : response.status;
					const msg = error ? error.message : response.message;
					const data = error ? null : response.data;

					if (result === 'success') {
						assert.isNotNull(data);
						assert.isNotEmpty(data);
					} else {
						assert.equal(result, 'error');
						assert.equal(msg, EXPECTED_MSG);
						assert.isNull(data);
					}
					done();
				}, true);
			});
		});
	});

	/*----------------------------------------------------------V4----------------------------------------------------------*/
	describe('IssueXMLV4', function () {
		this.timeout(15000);

		it('Success con credenciales (V4)', function (done) {
			fs.readFile(XML_FILE, 'utf8', function (err, xml) {
				if (err) return done(err);
				IssueService.Set(authParams).IssueV4(xml, function (error, response) {
					const result = error ? error.status : response.status;
					const msg = error ? error.message : response.message;
					const data = error ? null : response.data;

					if (result === 'success') {
						assert.isNotNull(data, 'data no debe ser nulo');
						assert.isNotEmpty(data, 'data no debe estar vacío');
					} else {
						assert.equal(result, 'error');
						assert.equal(msg, EXPECTED_MSG);
						assert.isNull(data);
					}
					done();
				});
			});
		});

		it('Success con token (V4)', function (done) {
			fs.readFile(XML_FILE, 'utf8', function (err, xml) {
				if (err) return done(err);
				IssueService.Set(tokenParams).IssueV4(xml, function (error, response) {
					const result = error ? error.status : response.status;
					const msg = error ? error.message : response.message;
					const data = error ? null : response.data;

					if (result === 'success') {
						assert.isNotNull(data);
						assert.isNotEmpty(data);
					} else {
						assert.equal(result, 'error');
						assert.equal(msg, EXPECTED_MSG);
						assert.isNull(data);
					}
					done();
				});
			});
		});

		it('Success B64 con credenciales (V4)', function (done) {
			fs.readFile(B64_FILE, 'utf8', function (err, b64) {
				if (err) return done(err);
				IssueService.Set(authParams).IssueV4(b64, function (error, response) {
					const result = error ? error.status : response.status;
					const msg = error ? error.message : response.message;
					const data = error ? null : response.data;

					if (result === 'success') {
						assert.isNotNull(data);
						assert.isNotEmpty(data);
					} else {
						assert.equal(result, 'error');
						assert.equal(msg, EXPECTED_MSG);
						assert.isNull(data);
					}
					done();
				}, true);
			});
		});

		it('Success B64 con token (V4)', function (done) {
			fs.readFile(B64_FILE, 'utf8', function (err, b64) {
				if (err) return done(err);
				IssueService.Set(tokenParams).IssueV4(b64, function (error, response) {
					const result = error ? error.status : response.status;
					const msg = error ? error.message : response.message;
					const data = error ? null : response.data;

					if (result === 'success') {
						assert.isNotNull(data);
						assert.isNotEmpty(data);
					} else {
						assert.equal(result, 'error');
						assert.equal(msg, EXPECTED_MSG);
						assert.isNull(data);
					}
					done();
				}, true);
			});
		});
	});
});
