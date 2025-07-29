const path = require('path');
const { assert } = require('chai');
const IssueServiceV4 = require('../SWServices/Issue/IssueServiceV4');
const DateService = require('../SWServices/Toolkit/DateService');

const { SDKTEST_TOKEN, SDKTEST_USER, SDKTEST_PASSWORD } = process.env;

const SERVICES_URL = 'https://services.test.sw.com.mx';
const XML_FILE = path.join(__dirname, 'Resources/file_issue.xml');
const EXPECTED_RESULT = 'success';

describe('IssueServiceV4Test', function () {
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

	/*----------------------------------------------------------ServiceV4Issue----------------------------------------------------------*/
	describe('ServiceV4IssueV1', function () {
		this.timeout(15000);

		let xml, xmlB64, isBase64 = true;

		beforeEach(function (done) {
			DateService.updateDate(XML_FILE, (err, updatedXml) => {
				if (err) { return done(err); }
				xml = updatedXml;
				xmlB64 = Buffer.from(updatedXml, "utf8").toString("base64");
				done();
			});
		});

        it("Sucess sin customServiceV4", function (done) {
			IssueServiceV4.Set(authParams).ServiceV4IssueV1(xml, (err, res) => {
				assert.isNull(err);
				assert.equal(res.status, EXPECTED_RESULT);
				assert.isNotEmpty(res.data);
				done();
			});
		});

		it("Success con customId válido", function (done) {
            const randomCustomId = `FACT-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
            const customServiceV4 = { customId: randomCustomId };
            IssueServiceV4.Set(tokenParams).ServiceV4IssueV2(xml, (err, res) => {
                assert.isNull(err);
                assert.equal(res.status, EXPECTED_RESULT);
                assert.isNotEmpty(res.data);
                done();
            }, false, customServiceV4);
        });

        it("Sucess con PDF en true", function (done) {
            const customServiceV4 = { pdf: true };
            IssueServiceV4.Set(tokenParams).ServiceV4IssueV3(xml, (err, res) => {
                assert.isNull(err);
                assert.equal(res.status, EXPECTED_RESULT);
                assert.isNotEmpty(res.data);
                done();
            }, false, customServiceV4);
        });

        it("Sucess con 10 correos", function (done) {
            const emails = Array(10).fill("test@example.com");
            const customServiceV4 = { email: emails };
            IssueServiceV4.Set(tokenParams).ServiceV4IssueV4(xml, (err, res) => {
                assert.isNull(err);
                assert.equal(res.status, EXPECTED_RESULT);
                assert.isNotEmpty(res.data);
                done();
            }, false, customServiceV4);
        });

        // --- Casos de error ---
        it("Error con más de 10 emails", function (done) {
            const customServiceV4 = { email: Array(11).fill("test@example.com") };
            IssueServiceV4.Set(tokenParams).ServiceV4IssueV1(xml, (err, res) => {
                assert.isNotNull(err);
                assert.include(err.message, "Solo se permiten hasta 10 correos");
                done();
            }, false, customServiceV4);
        });
    
        it("Error con customId > 100 caracteres", function (done) {
            const customServiceV4 = { customId: "A".repeat(101) };
            IssueServiceV4.Set(tokenParams).ServiceV4IssueV1(xml, (err, res) => {
                assert.isNotNull(err);
                assert.include(err.message, "customId viene vacío o es mayor a 100 caracteres.");
                done();
            }, false, customServiceV4);
        });
    
        it("Error con pdf no booleano", function (done) {
            const customServiceV4 = { pdf: "pdf" };
            IssueServiceV4.Set(tokenParams).ServiceV4IssueV1(xml, (err, res) => {
                assert.isNotNull(err);
                assert.include(err.message, "pdf debe ser booleano");
                done();
            }, false, customServiceV4);
        });
    
        it("Error con email inválido", function (done) {
            const invalidEmail = "cliente-email";
            const customServiceV4 = { email: ["cliente1@test.com", invalidEmail] };
            IssueServiceV4.Set(tokenParams).ServiceV4IssueV1(xml, (err, res) => {
                assert.isNotNull(err);
                assert.include(err.message, `El correo '${invalidEmail}' no es válido.`);
                done();
            }, false, customServiceV4);
        });
	});
}); 