var chai = require('chai');
var assert = chai.assert;
var IssueService = require('../SWServices/Issue/IssueService');
var fs = require('fs');
var expectedResult = '307. El comprobante contiene un timbre previo.';

const SDKTEST_TOKEN = process.env.SDKTEST_TOKEN;
const SDKTEST_USER = process.env.SDKTEST_USER;
const SDKTEST_PASSWORD = process.env.SDKTEST_PASSWORD;

describe('IssueService.js', function () {

	/*----------------------------------------------------------V1----------------------------------------------------------*/
	describe('IssueXMLV1', function () {
		this.timeout(15000);
		var result = 'error';
		var msg = '';

		var params = {
			user: SDKTEST_USER,
			password: SDKTEST_PASSWORD,
			url: 'http://services.test.sw.com.mx',
		};

		beforeEach(function (done) {
			fs.readFile('./lib/Tests/Resources/file.xml', 'utf8', function (err, contents) {
				if (err) {
					result = 'error';
					msg = 'Error al abrir el archivo';
					done();
				} else {
					var callback = (error, data) => {
						result = error ? error.status : data.status;
						msg = error.message;
						done();
					};

					let xml = contents;
					let issue = IssueService.Set(params);
					issue.IssueV1(xml, callback);
				}
			});
		});

		it('Success si las credenciales y el xml son correctos (V1)', function () {
			assert.equal(msg, expectedResult, result);
		});
	});

	describe('IssueXMLV1ByToken', function () {
		this.timeout(15000);
		var result = 'error';
		var msg = '';

		var params = {
			url: 'http://services.test.sw.com.mx',
			token: SDKTEST_TOKEN
		};

		beforeEach(function (done) {
			fs.readFile('./lib/Tests/Resources/file.xml', 'utf8', function (err, contents) {
				if (err) {
					result = 'error';
					msg = 'Error al abrir el archivo';
					done();
				} else {
					var callback = (error, data) => {
						result = error ? error.status : data.status;
						msg = error.message;
						done();
					};

					let xml = contents;
					let issue = IssueService.Set(params);
					issue.IssueV1(xml, callback);
				}
			});
		});

		it('Success si las credenciales y el xml son correctos (V1 By Token)', function () {
			assert.equal(msg, expectedResult, result);
		});
	});

	describe("IssueXMLV1_B64", function () {
		this.timeout(15000);
		var result = 'error';
		var msg = '';

		var params = {
			user: SDKTEST_USER,
			password: SDKTEST_PASSWORD,
			url: 'http://services.test.sw.com.mx',
		};

		beforeEach(function (done) {
			fs.readFile('./lib/Tests/Resources/b64.txt', 'utf8', function (err, contents) {
				if (err) {
					result = 'error';
					msg = 'Error al abrir el archivo';
					done();
				} else {
					var callback = (error, data) => {
						result = error ? error.status : data.status;
						msg = error.message;
						done();
					};

					let xml = contents;
					let issue = IssueService.Set(params);
					issue.IssueV1(xml, callback, true);
				}
			});
		});

		it('Success si las credenciales y el archivo b64 son correctos (V1 B64)', function () {
			assert.equal(msg, expectedResult, result);
		});
	});

	describe("IssueXMLV1ByToken_B64", function () {
		this.timeout(15000);
		var result = 'error';
		var msg = '';

		var params = {
			url: 'http://services.test.sw.com.mx',
			token: SDKTEST_TOKEN
		};

		beforeEach(function (done) {
			fs.readFile('./lib/Tests/Resources/b64.txt', 'utf8', function (err, contents) {
				if (err) {
					result = 'error';
					msg = 'Error al abrir el archivo';
					done();
				} else {
					var callback = (error, data) => {
						result = error ? error.status : data.status;
						msg = error.message;
						done();
					};

					let xml = contents;
					let issue = IssueService.Set(params);
					issue.IssueV1(xml, callback, true);
				}
			});
		});

		it('Success si las credenciales y el archivo b64 son correctos (V1 By Token B64)', function () {
			assert.equal(msg, expectedResult, result);
		});
	});

	/*----------------------------------------------------------V2----------------------------------------------------------*/
	describe('IssueXMLV2', function () {
		this.timeout(15000);
		var result = 'error';
		var msg = '';

		var params = {
			user: SDKTEST_USER,
			password: SDKTEST_PASSWORD,
			url: 'http://services.test.sw.com.mx',
		};

		beforeEach(function (done) {
			fs.readFile('./lib/Tests/Resources/file.xml', 'utf8', function (err, contents) {
				if (err) {
					result = 'error';
					msg = 'Error al abrir el archivo';
					done();
				} else {
					var callback = (error, data) => {
						result = error ? error.status : data.status;
						msg = error.message;
						done();
					};

					let xml = contents;
					let issue = IssueService.Set(params);
					issue.IssueV2(xml, callback);
				}
			});
		});

		it('Success si las credenciales y el xml v2 son correctos (V2)', function () {
			assert.equal(msg, expectedResult, result);
		});
	});

	describe("IssueXMLV2ByToken", function () {
		this.timeout(15000);
		var result = 'error';
		var msg = '';

		var params = {
			url: 'http://services.test.sw.com.mx',
			token: SDKTEST_TOKEN
		};

		beforeEach(function (done) {
			fs.readFile('./lib/Tests/Resources/file.xml', 'utf8', function (err, contents) {
				if (err) {
					result = 'error';
					msg = 'Error al abrir el archivo';
					done();
				} else {
					var callback = (error, data) => {
						result = error ? error.status : data.status;
						msg = error.message;
						done();
					};

					let xml = contents;

					let issue = IssueService.Set(params);
					issue.IssueV2(xml, callback);
				}
			});
		});

		it('Success si las credenciales y el xml son correctos (V2 By Token)', function () {
			assert.equal(msg, expectedResult, result);
		});
	});


	describe("IssueXMLV2_B64", function () {
		this.timeout(15000);
		var result = 'error';
		var msg = '';

		var params = {
			user: SDKTEST_USER,
			password: SDKTEST_PASSWORD,
			url: 'http://services.test.sw.com.mx',
		};

		beforeEach(function (done) {
			fs.readFile('./lib/Tests/Resources/b64.txt', 'utf8', function (err, contents) {
				if (err) {
					result = 'error';
					msg = 'Error al abrir el archivo';
					done();
				} else {
					var callback = (error, data) => {
						result = error ? error.status : data.status;
						msg = error.message;
						done();
					};

					let xml = contents;
					let issue = IssueService.Set(params);
					issue.IssueV2(xml, callback, true);
				}
			});
		});

		it('Success si las credenciales y el archivo b64 son correctos (V2 B64)', function () {
			assert.equal(msg, expectedResult, result);
		});
	});

	describe("IssueXMLV2ByToken_B64", function () {
		this.timeout(15000);
		var result = 'error';
		var msg = '';

		var params = {
			url: 'http://services.test.sw.com.mx',
			token: SDKTEST_TOKEN
		};

		beforeEach(function (done) {
			fs.readFile('./lib/Tests/Resources/b64.txt', 'utf8', function (err, contents) {
				if (err) {
					result = 'error';
					msg = 'Error al abrir el archivo';
					done();
				} else {
					var callback = (error, data) => {
						result = error ? error.status : data.status;
						msg = error.message;
						done();
					};

					let xml = contents;
					let issue = IssueService.Set(params);
					issue.IssueV2(xml, callback, true);
				}
			});
		});

		it('Success si las credenciales y el archivo b64 son correctos (V2 By Token B64)', function () {
			assert.equal(msg, expectedResult, result);
		});
	});

	/*----------------------------------------------------------V3----------------------------------------------------------*/
	describe('IssueXMLV3', function () {
		this.timeout(15000);
		var result = 'error';
		var msg = '';

		var params = {
			user: SDKTEST_USER,
			password: SDKTEST_PASSWORD,
			url: 'http://services.test.sw.com.mx',
		};

		beforeEach(function (done) {
			fs.readFile('./lib/Tests/Resources/file.xml', 'utf8', function (err, contents) {
				if (err) {
					result = 'error';
					msg = 'Error al abrir el archivo';
					done();
				} else {
					var callback = (error, data) => {
						result = error ? error.status : data.status;
						msg = error.message;
						done();
					};

					let xml = contents;
					let issue = IssueService.Set(params);
					issue.IssueV3(xml, callback);
				}
			});
		});

		it('Success si las credenciales y el xml v3 son correctos (V3)', function () {
			assert.equal(msg, expectedResult, result);
		});
	});

	describe("IssueXMLV3ByToken", function () {
		this.timeout(15000);
		var result = 'error';
		var msg = '';

		var params = {
			url: 'http://services.test.sw.com.mx',
			token: SDKTEST_TOKEN
		};

		beforeEach(function (done) {
			fs.readFile('./lib/Tests/Resources/file.xml', 'utf8', function (err, contents) {
				if (err) {
					result = 'error';
					msg = 'Error al abrir el archivo';
					done();
				} else {
					var callback = (error, data) => {
						result = error ? error.status : data.status;
						msg = error.message;
						done();
					};

					let xml = contents;
					let issue = IssueService.Set(params);
					issue.IssueV3(xml, callback);
				}
			});
		});

		it('Success si las credenciales y el xml son correctos (V3 By Token)', function () {
			assert.equal(msg, expectedResult, result);
		});
	});


	describe("IssueXMLV3_B64", function () {
		this.timeout(15000);
		var result = 'error';
		var msg = '';

		var params = {
			url: 'http://services.test.sw.com.mx',
			token: SDKTEST_TOKEN
		};

		beforeEach(function (done) {
			fs.readFile('./lib/Tests/Resources/b64.txt', 'utf8', function (err, contents) {
				if (err) {
					result = 'error';
					msg = 'Error al abrir el archivo';
					done();
				} else {
					var callback = (error, data) => {
						result = error ? error.status : data.status;
						msg = error.message;
						done();
					};

					let xml = contents;
					let issue = IssueService.Set(params);
					issue.IssueV3(xml, callback, true);
				}
			});

		});

		it('Success si las credenciales y el xml son correctos (V3 B64)', function () {
			assert.equal(msg, expectedResult, result);
		});
	});

	describe("IssueXMLV3ByToken_B64", function () {
		this.timeout(15000);
		var result = 'error';
		var msg = '';

		var params = {
			url: 'http://services.test.sw.com.mx',
			token: SDKTEST_TOKEN
		};

		beforeEach(function (done) {
			fs.readFile('./lib/Tests/Resources/b64.txt', 'utf8', function (err, contents) {
				if (err) {
					result = 'error';
					msg = 'Error al abrir el archivo';
					done();
				} else {
					var callback = (error, data) => {
						result = error ? error.status : data.status;
						msg = error.message;
						done();
					};

					let xml = contents;
					let issue = IssueService.Set(params);
					issue.IssueV3(xml, callback, true);
				}
			});
		});

		it('Success si las credenciales y el archivo b64 son correctos (V3 By Token B64)', function () {
			assert.equal(msg, expectedResult, result);
		});
	});

	/*----------------------------------------------------------V4----------------------------------------------------------*/
	describe('IssueXMLV4', function () {
		this.timeout(15000);
		var result = 'error';
		var msg = '';

		var params = {
			user: SDKTEST_USER,
			password: SDKTEST_PASSWORD,
			url: 'http://services.test.sw.com.mx',
		};

		beforeEach(function (done) {
			fs.readFile('./lib/Tests/Resources/file.xml', 'utf8', function (err, contents) {
				if (err) {
					result = 'error';
					msg = 'Error al abrir el archivo';
					done();
				} else {
					var callback = (error, data) => {
						result = error ? error.status : data.status;
						msg = error.message;
						done();
					};

					let xml = contents;
					let issue = IssueService.Set(params);
					issue.IssueV4(xml, callback);
				}
			});
		});

		it('Success si las credenciales y el xml v4 son correctos (V4)', function () {
			assert.equal(msg, expectedResult, result);
		});
	});

	describe("IssueXMLV4ByToken", function () {
		this.timeout(15000);
		var result = 'error';
		var msg = '';

		var params = {
			url: 'http://services.test.sw.com.mx',
			token: SDKTEST_TOKEN
		};

		beforeEach(function (done) {
			fs.readFile('./lib/Tests/Resources/file.xml', 'utf8', function (err, contents) {
				if (err) {
					result = 'error';
					msg = 'Error al abrir el archivo';
					done();
				} else {
					var callback = (error, data) => {
						result = error ? error.status : data.status;
						msg = error.message;
						done();
					};

					let xml = contents;
					let issue = IssueService.Set(params);
					issue.IssueV4(xml, callback);
				}
			});
		});

		it('Success si las credenciales y el xml son correctos (V4 By token)', function () {
			assert.equal(msg, expectedResult, result);
		});
	});

	describe("IssueXMLV4_B64", function () {
		this.timeout(15000);
		var result = 'error';
		var msg = '';

		var params = {
			url: 'http://services.test.sw.com.mx',
			token: SDKTEST_TOKEN
		};

		beforeEach(function (done) {
			fs.readFile('./lib/Tests/Resources/b64.txt', 'utf8', function (err, contents) {
				if (err) {
					result = 'error';
					msg = 'Error al abrir el archivo';
					done();
				} else {
					var callback = (error, data) => {
						result = error ? error.status : data.status;
						msg = error.message;
						done();
					};

					let xml = contents;
					let issue = IssueService.Set(params);
					issue.IssueV4(xml, callback, true);
				}
			});
		});

		it('Success si las credenciales y el xml son correctos (V4 B64)', function () {
			assert.equal(msg, expectedResult, result);
		});
	});

	describe("IssueXMLV4ByToken_B64", function () {
		this.timeout(15000);
		var result = 'error';
		var msg = '';

		var params = {
			url: 'http://services.test.sw.com.mx',
			token: SDKTEST_TOKEN
		};

		beforeEach(function (done) {
			fs.readFile('./lib/Tests/Resources/b64.txt', 'utf8', function (err, contents) {
				if (err) {
					result = 'error';
					msg = 'Error al abrir el archivo';
					done();
				} else {
					var callback = (error, data) => {
						result = error ? error.status : data.status;
						msg = error.message;
						done();
					};

					let xml = contents;
					let issue = IssueService.Set(params);
					issue.IssueV4(xml, callback, true);
				}
			});
		});

		it('Success si las credenciales y el archivo b64 son correctos (V4 By Token B64)', function () {
			assert.equal(msg, expectedResult, result);
		});
	});
});
