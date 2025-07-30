const path = require('path');
const { assert } = require('chai');
const IssueJsonServiceV4 = require('../SWServices/IssueJson/IssueJsonServiceV4');
const DateService = require('../SWServices/Toolkit/DateService');

const { SDKTEST_TOKEN, SDKTEST_USER, SDKTEST_PASSWORD } = process.env;

const SERVICES_URL = 'https://services.test.sw.com.mx';
const JSON_FILE = path.join(__dirname, 'Resources/file_issueJson.json');
const EXPECTED_RESULT = 'success';

describe('IssueJsonServiceTest', function () {
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

	/*----------------------------------------------------------ServiceV4IssueJson----------------------------------------------------------*/
	describe('ServiceV4IssueJsonV1', function () {
		this.timeout(15000);

		let json;

		beforeEach(function (done) {
			DateService.updateDateFromJson(JSON_FILE, (err, updatedJson) => {
				if (err) { return done(err); }
				json = updatedJson;
				done();
			});
		});

        it("Sucess sin customServiceV4", function (done) {
			IssueJsonServiceV4.Set(authParams).ServiceV4IssueJsonV1(json, (err, res) => {
				assert.isNull(err);
				assert.equal(res.status, EXPECTED_RESULT);
				assert.isNotEmpty(res.data);
				done();
			});
		});

		it("Success con customId válido", function (done) {
            const randomCustomId = `FACT-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
            const customServiceV4 = { customId: randomCustomId };
            IssueJsonServiceV4.Set(tokenParams).ServiceV4IssueJsonV2(json, (err, res) => {
                assert.isNull(err);
                assert.equal(res.status, EXPECTED_RESULT);
                assert.isNotEmpty(res.data);
                done();
            }, customServiceV4);
        });

        it("Sucess con PDF en true", function (done) {
            const customServiceV4 = { pdf: true };
            IssueJsonServiceV4.Set(tokenParams).ServiceV4IssueJsonV3(json, (err, res) => {
                assert.isNull(err);
                assert.equal(res.status, EXPECTED_RESULT);
                assert.isNotEmpty(res.data);
                done();
            }, customServiceV4);
        });

        it("Sucess con 10 correos", function (done) {
            const emails = Array(10).fill("test@example.com");
            const customServiceV4 = { email: emails };
            IssueJsonServiceV4.Set(tokenParams).ServiceV4IssueJsonV4(json, (err, res) => {
                assert.isNull(err);
                assert.equal(res.status, EXPECTED_RESULT);
                assert.isNotEmpty(res.data);
                done();
            }, customServiceV4);
        });

        // --- Casos de error ---
        it("Error con más de 10 emails", function (done) {
            const customServiceV4 = { email: Array(11).fill("test@example.com") };
            IssueJsonServiceV4.Set(tokenParams).ServiceV4IssueJsonV1(json, (err, res) => {
                assert.isNotNull(err);
                assert.include(err.message, "Solo se permiten hasta 10 correos");
                done();
            }, customServiceV4);
        });
    
        it("Error con customId > 100 caracteres", function (done) {
            const customServiceV4 = { customId: "A".repeat(101) };
            IssueJsonServiceV4.Set(tokenParams).ServiceV4IssueJsonV1(json, (err, res) => {
                assert.isNotNull(err);
                assert.include(err.message, "customId viene vacío o es mayor a 100 caracteres.");
                done();
            }, customServiceV4);
        });
    
        it("Error con pdf no booleano", function (done) {
            const customServiceV4 = { pdf: "pdf" };
            IssueJsonServiceV4.Set(tokenParams).ServiceV4IssueJsonV1(json, (err, res) => {
                assert.isNotNull(err);
                assert.include(err.message, "pdf debe ser booleano");
                done();
            }, customServiceV4);
        });
    
        it("Error con email inválido", function (done) {
            const invalidEmail = "cliente-email";
            const customServiceV4 = { email: ["cliente1@test.com", invalidEmail] };
            IssueJsonServiceV4.Set(tokenParams).ServiceV4IssueJsonV1(json, (err, res) => {
                assert.isNotNull(err);
                assert.include(err.message, `El correo '${invalidEmail}' no es válido.`);
                done();
            }, customServiceV4);
        });
	});
}); 