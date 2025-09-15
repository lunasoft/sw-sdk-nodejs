const path = require("path");
const fs = require("fs");
const { assert } = require("chai");
const StampRetentionService = require("../SWServices/StampRetention/StampRetentionService");

const { SDKTEST_TOKEN, SDKTEST_USER, SDKTEST_PASSWORD } = process.env;

const SERVICES_URL = "https://services.test.sw.com.mx";
const XML_PATH = path.join(__dirname, "Resources/file_stamp_retention.xml");

const EXPECTED_RESULT = "success";

/**
 * @param {Object} res - Respuesta del servicio
 * @returns {boolean} - true si la respuesta es válida
 */
function isValidResponse(res) {
	return res.status === "success" || 
		(res.message && (res.message.includes("307") || res.message.includes("401")));
}

describe("StampRetentionServiceTest", function () {
	this.timeout(60000);
	afterEach(done => setTimeout(done, 1000));

	const authParams = {
		user: SDKTEST_USER,
		password: SDKTEST_PASSWORD,
		url: SERVICES_URL
	};

	const tokenParams = {
		token: SDKTEST_TOKEN,
		url: SERVICES_URL
	};

	/*----------------------------------------------------------V3----------------------------------------------------------*/
	describe("StampXMLV3", function () {
		this.timeout(15000);

		let xmlContent, xmlB64;

		beforeEach(function (done) {
			try {
				xmlContent = fs.readFileSync(XML_PATH, 'utf8');
				xmlB64 = Buffer.from(xmlContent, "utf8").toString("base64");
				done();
			} catch (err) {
				done(err);
			}
		});

		it("Sucess con credenciales", function (done) {
			StampRetentionService.Set(authParams).StampV3(xmlContent, (err, res) => {		
				if (err) {
					assert.isTrue(isValidResponse(err), `${err.status}, Message: ${err.message}`);
				} else {
					assert.isTrue(isValidResponse(res), `${res.status}, Message: ${res.message}`);
				}
				done();
			});
		});

		it("Sucess con token", function (done) {
			StampRetentionService.Set(tokenParams).StampV3(xmlContent, (err, res) => {
				if (err) {
					assert.isTrue(isValidResponse(err), `${err.status}, Message: ${err.message}`);
				} else {
					assert.isTrue(isValidResponse(res), `${res.status}, Message: ${res.message}`);
				}
				done();
			});
		});
	});
});
