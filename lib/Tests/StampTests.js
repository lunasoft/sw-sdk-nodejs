const path = require("path");
const { assert } = require("chai");
const StampService = require("../SWServices/Stamp/StampService");
const SignService = require("../SWServices/Toolkit/SignService");

const { SDKTEST_TOKEN, SDKTEST_USER, SDKTEST_PASSWORD } = process.env;

const SERVICES_URL = "https://services.test.sw.com.mx";
const PFX_PASSWORD = "12345678a";
const PFX_PATH = path.join(__dirname, "Resources/pfx.pfx");
const XML_PATH = path.join(__dirname, "Resources/file_stamp.xml");
const CADENA_PATH = path.join(__dirname, "Resources/cadenaOriginal.txt");

const EXPECTED_RESULT = "success";

describe("StampServiceTest", function () {
	this.timeout(60000);
	afterEach(done => setTimeout(done, 1000));

	const signParams = {
		pfxPassword: PFX_PASSWORD,
		pfxPath: PFX_PATH,
		xmlPath: XML_PATH,
		originalChain: CADENA_PATH
	};

	const authParams = {
		user: SDKTEST_USER,
		password: SDKTEST_PASSWORD,
		url: SERVICES_URL
	};

	const tokenParams = {
		token: SDKTEST_TOKEN,
		url: SERVICES_URL
	};

	/*----------------------------------------------------------V1----------------------------------------------------------*/
	describe("StampXMLV1", function () {
		this.timeout(15000);

		let xmlSellado, xmlB64, isBase64 = true;

		beforeEach(function (done) {
			SignService.obtenerSello(signParams, (err, res) => {
				if (err) { return done(err); }
				xmlSellado = res.xmlSellado;
				xmlB64 = Buffer.from(xmlSellado, "utf8").toString("base64");
				done();
			});
		});

		it("Sucess con credenciales", function (done) {
			StampService.Set(authParams).StampV1(xmlSellado, (err, res) => {
				assert.isNull(err);
				assert.equal(res.status, EXPECTED_RESULT);
				assert.isNotEmpty(res.data);
				done();
			});
		});

		it("Sucess con token", function (done) {
			StampService.Set(tokenParams).StampV1(xmlSellado, (err, res) => {
				assert.isNull(err);
				assert.equal(res.status, EXPECTED_RESULT);
				assert.isNotEmpty(res.data);
				done();
			});
		});

		it("Sucess B64 con credenciales", function (done) {
			StampService.Set(authParams).StampV1(xmlB64, (err, res) => {
				assert.isNull(err);
				assert.equal(res.status, EXPECTED_RESULT);
				assert.isNotEmpty(res.data);
				done();
			}, isBase64);
		});

		it("Sucess B64 con token", function (done) {
			StampService.Set(tokenParams).StampV1(xmlB64, (err, res) => {
				assert.isNull(err);
				assert.equal(res.status, EXPECTED_RESULT);
				assert.isNotEmpty(res.data);
				done();
			}, isBase64);
		});
	});

	/*----------------------------------------------------------V2----------------------------------------------------------*/
	describe("StampXMLV2", function () {
		this.timeout(15000);

		let xmlSellado, xmlB64, isBase64 = true;

		beforeEach(function (done) {
			SignService.obtenerSello(signParams, (err, res) => {
				if (err) { return done(err); }
				xmlSellado = res.xmlSellado;
				xmlB64 = Buffer.from(xmlSellado, "utf8").toString("base64");
				done();
			});
		});

		it("Sucess con credenciales", function (done) {
			StampService.Set(authParams).StampV2(xmlSellado, (err, res) => {
				assert.isNull(err);
				assert.equal(res.status, EXPECTED_RESULT);
				assert.isNotEmpty(res.data);
				done();
			});
		});

		it("Sucess con token", function (done) {
			StampService.Set(tokenParams).StampV2(xmlSellado, (err, res) => {
				assert.isNull(err);
				assert.equal(res.status, EXPECTED_RESULT);
				assert.isNotEmpty(res.data);
				done();
			});
		});

		it("Sucess B64 con credenciales", function (done) {
			StampService.Set(authParams).StampV2(xmlB64, (err, res) => {
				assert.isNull(err);
				assert.equal(res.status, EXPECTED_RESULT);
				assert.isNotEmpty(res.data);
				done();
			}, isBase64);
		});

		it("Sucess B64 con token", function (done) {
			StampService.Set(tokenParams).StampV2(xmlB64, (err, res) => {
				assert.isNull(err);
				assert.equal(res.status, EXPECTED_RESULT);
				assert.isNotEmpty(res.data);
				done();
			}, isBase64);
		});
	});

	/*----------------------------------------------------------V3----------------------------------------------------------*/
	describe("StampXMLV3", function () {
		this.timeout(15000);

		let xmlSellado, xmlB64, isBase64 = true;

		beforeEach(function (done) {
			SignService.obtenerSello(signParams, (err, res) => {
				if (err) { return done(err); }
				xmlSellado = res.xmlSellado;
				xmlB64 = Buffer.from(xmlSellado, "utf8").toString("base64");
				done();
			});
		});

		it("Sucess con credenciales", function (done) {
			StampService.Set(authParams).StampV3(xmlSellado, (err, res) => {
				assert.isNull(err);
				assert.equal(res.status, EXPECTED_RESULT);
				assert.isNotEmpty(res.data);
				done();
			});
		});

		it("Sucess con token", function (done) {
			StampService.Set(tokenParams).StampV3(xmlSellado, (err, res) => {
				assert.isNull(err);
				assert.equal(res.status, EXPECTED_RESULT);
				assert.isNotEmpty(res.data);
				done();
			});
		});

		it("Sucess B64 con credenciales", function (done) {
			StampService.Set(authParams).StampV3(xmlB64, (err, res) => {
				assert.isNull(err);
				assert.equal(res.status, EXPECTED_RESULT);
				assert.isNotEmpty(res.data);
				done();
			}, isBase64);
		});

		it("Sucess B64 con token", function (done) {
			StampService.Set(tokenParams).StampV3(xmlB64, (err, res) => {
				assert.isNull(err);
				assert.equal(res.status, EXPECTED_RESULT);
				assert.isNotEmpty(res.data);
				done();
			}, isBase64);
		});
	});

	/*----------------------------------------------------------V4----------------------------------------------------------*/
	describe("StampXMLV4", function () {
		this.timeout(15000);

		let xmlSellado, xmlB64, isBase64 = true;

		beforeEach(function (done) {
			SignService.obtenerSello(signParams, (err, res) => {
				if (err) { return done(err); }
				xmlSellado = res.xmlSellado;
				xmlB64 = Buffer.from(xmlSellado, "utf8").toString("base64");
				done();
			});
		});

		it("Sucess con credenciales", function (done) {
			StampService.Set(authParams).StampV4(xmlSellado, (err, res) => {
				assert.isNull(err);
				assert.equal(res.status, EXPECTED_RESULT);
				assert.isNotEmpty(res.data);
				done();
			});
		});

		it("Sucess con token", function (done) {
			StampService.Set(tokenParams).StampV4(xmlSellado, (err, res) => {
				assert.isNull(err);
				assert.equal(res.status, EXPECTED_RESULT);
				assert.isNotEmpty(res.data);
				done();
			});
		});

		it("Sucess B64 con credenciales", function (done) {
			StampService.Set(authParams).StampV4(xmlB64, (err, res) => {
				assert.isNull(err);
				assert.equal(res.status, EXPECTED_RESULT);
				assert.isNotEmpty(res.data);
				done();
			}, isBase64);
		});

		it("Sucess B64 con token", function (done) {
			StampService.Set(tokenParams).StampV4(xmlB64, (err, res) => {
				assert.isNull(err);
				assert.equal(res.status, EXPECTED_RESULT);
				assert.isNotEmpty(res.data);
				done();
			}, isBase64);
		});
	});
});
