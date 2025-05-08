const path = require('path');
const { assert } = require('chai');
const IssueService = require('../SWServices/Issue/IssueService');
const DateService = require('../SWServices/Toolkit/DateService');

const { SDKTEST_TOKEN, SDKTEST_USER, SDKTEST_PASSWORD } = process.env;

const SERVICES_URL = 'https://services.test.sw.com.mx';
const XML_FILE = path.join(__dirname, 'Resources/file_issue.xml');
const EXPECTED_RESULT = 'success';

describe('IssueServiceTest', function () {
	this.timeout(60000);
	afterEach(done => setTimeout(done, 1000));

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

		let xml, xmlB64;

		beforeEach(function (done) {
			DateService.updateDate(XML_FILE, (err, updatedXml) => {
				if (err) return done(err);
				xml = updatedXml;
				xmlB64 = Buffer.from(updatedXml, 'utf8').toString('base64');
				done();
			});
		});


		it('Success con credenciales', function (done) {
			IssueService.Set(authParams).IssueV1(xml, (err, res) => {
				assert.isNull(err);
				assert.equal(res.status, EXPECTED_RESULT);
				assert.isNotEmpty(res.data);
				done();
			});
		});

		it('Success con token', function (done) {
			IssueService.Set(tokenParams).IssueV1(xml, (err, res) => {
				assert.isNull(err);
				assert.equal(res.status, EXPECTED_RESULT);
				assert.isNotEmpty(res.data);
				done();
			});
		});

		it('Success B64 con credenciales', function (done) {
			IssueService.Set(authParams).IssueV1(xmlB64, (err, res) => {
				assert.isNull(err);
				assert.equal(res.status, EXPECTED_RESULT);
				assert.isNotEmpty(res.data);
				done();
			}, true);
		});

		it('Success B64 con token', function (done) {
			IssueService.Set(tokenParams).IssueV1(xmlB64, (err, res) => {
				assert.isNull(err);
				assert.equal(res.status, EXPECTED_RESULT);
				assert.isNotEmpty(res.data);
				done();
			}, true);
		});
	});

	/*----------------------------------------------------------V2----------------------------------------------------------*/
	describe('IssueXMLV2', function () {
		this.timeout(15000);

		let xml, xmlB64;

		beforeEach(function (done) {
			DateService.updateDate(XML_FILE, (err, updatedXml) => {
				if (err) return done(err);
				xml = updatedXml;
				xmlB64 = Buffer.from(updatedXml, 'utf8').toString('base64');
				done();
			});
		});

		it('Success con credenciales', function (done) {
			IssueService.Set(authParams).IssueV2(xml, (err, res) => {
				assert.isNull(err);
				assert.equal(res.status, EXPECTED_RESULT);
				assert.isNotEmpty(res.data);
				done();
			});
		});

		it('Success con token', function (done) {
			IssueService.Set(tokenParams).IssueV2(xml, (err, res) => {
				assert.isNull(err);
				assert.equal(res.status, EXPECTED_RESULT);
				assert.isNotEmpty(res.data);
				done();
			});
		});

		it('Success B64 con credenciales', function (done) {
			IssueService.Set(authParams).IssueV2(xmlB64, (err, res) => {
				assert.isNull(err);
				assert.equal(res.status, EXPECTED_RESULT);
				assert.isNotEmpty(res.data);
				done();
			}, true);
		});

		it('Success B64 con token', function (done) {
			IssueService.Set(tokenParams).IssueV2(xmlB64, (err, res) => {
				assert.isNull(err);
				assert.equal(res.status, EXPECTED_RESULT);
				assert.isNotEmpty(res.data);
				done();
			}, true);
		});
	});

	/*----------------------------------------------------------V3----------------------------------------------------------*/
	describe('IssueXMLV3', function () {
		this.timeout(15000);

		let xml, xmlB64;

		beforeEach(function (done) {
			DateService.updateDate(XML_FILE, (err, updatedXml) => {
				if (err) return done(err);
				xml = updatedXml;
				xmlB64 = Buffer.from(updatedXml, 'utf8').toString('base64');
				done();
			});
		});

		it('Success con credenciales', function (done) {
			IssueService.Set(authParams).IssueV3(xml, (err, res) => {
				assert.isNull(err);
				assert.equal(res.status, EXPECTED_RESULT);
				assert.isNotEmpty(res.data);
				done();
			});
		});


		it('Success con token', function (done) {
			IssueService.Set(tokenParams).IssueV3(xml, (err, res) => {
				assert.isNull(err);
				assert.equal(res.status, EXPECTED_RESULT);
				assert.isNotEmpty(res.data);
				done();
			});
		});


		it('Success B64 con credenciales', function (done) {
			IssueService.Set(authParams).IssueV3(xmlB64, (err, res) => {
				assert.isNull(err);
				assert.equal(res.status, EXPECTED_RESULT);
				assert.isNotEmpty(res.data);
				done();
			}, true);
		});

		it('Success B64 con token', function (done) {
			IssueService.Set(tokenParams).IssueV3(xmlB64, (err, res) => {
				assert.isNull(err);
				assert.equal(res.status, EXPECTED_RESULT);
				assert.isNotEmpty(res.data);
				done();
			}, true);
		});
	});

	/*----------------------------------------------------------V4----------------------------------------------------------*/
	describe('IssueXMLV4', function () {
		this.timeout(15000);

		let xml, xmlB64;

		beforeEach(function (done) {
			DateService.updateDate(XML_FILE, (err, updatedXml) => {
				if (err) return done(err);
				xml = updatedXml;
				xmlB64 = Buffer.from(updatedXml, 'utf8').toString('base64');
				done();
			});
		});

		it('Success con credenciales', function (done) {
			IssueService.Set(authParams).IssueV4(xml, (err, res) => {
				assert.isNull(err);
				assert.equal(res.status, EXPECTED_RESULT);
				assert.isNotEmpty(res.data);
				done();
			});
		});

		it('Success con token', function (done) {
			IssueService.Set(tokenParams).IssueV4(xml, (err, res) => {
				assert.isNull(err);
				assert.equal(res.status, EXPECTED_RESULT);
				assert.isNotEmpty(res.data);
				done();
			});
		});

		it('Success B64 con credenciales', function (done) {
			IssueService.Set(authParams).IssueV4(xmlB64, (err, res) => {
				assert.isNull(err);
				assert.equal(res.status, EXPECTED_RESULT);
				assert.isNotEmpty(res.data);
				done();
			}, true);
		});

		it('Success B64 con token', function (done) {
			IssueService.Set(tokenParams).IssueV4(xmlB64, (err, res) => {
				assert.isNull(err);
				assert.equal(res.status, EXPECTED_RESULT);
				assert.isNotEmpty(res.data);
				done();
			}, true);
		});
	});
});
