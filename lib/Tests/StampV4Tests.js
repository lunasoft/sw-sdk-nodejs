const path = require("path");
const { assert } = require("chai");
const StampServiceV4 = require("../SWServices/Stamp/StampServiceV4");
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

	/*----------------------------------------------------------ServiceStampV4----------------------------------------------------------*/
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

        it("Sucess sin customServiceV4", function (done) {
			StampServiceV4.Set(authParams).ServiceV4StampV1(xmlSellado, (err, res) => {
				assert.isNull(err);
				assert.equal(res.status, EXPECTED_RESULT);
				assert.isNotEmpty(res.data);
				done();
			});
		});

		it("Success con customId válido", function (done) {
            const randomCustomId = `FACT-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
            const customServiceV4 = { customId: randomCustomId };
            StampServiceV4.Set(tokenParams).ServiceV4StampV2(xmlSellado, (err, res) => {
                assert.isNull(err);
                assert.equal(res.status, EXPECTED_RESULT);
                assert.isNotEmpty(res.data);
                done();
            }, false, customServiceV4);
        });

        it("Sucess con PDF en true", function (done) {
            const customServiceV4 = { pdf: true };
            StampServiceV4.Set(tokenParams).ServiceV4StampV3(xmlSellado, (err, res) => {
                assert.isNull(err);
                assert.equal(res.status, EXPECTED_RESULT);
                assert.isNotEmpty(res.data);
                done();
            }, false, customServiceV4);
        });

        it("Sucess con 10 correos", function (done) {
            const emails = Array(10).fill("test@example.com");
            const customServiceV4 = { email: emails };
            StampServiceV4.Set(tokenParams).ServiceV4StampV4(xmlSellado, (err, res) => {
                assert.isNull(err);
                assert.equal(res.status, EXPECTED_RESULT);
                assert.isNotEmpty(res.data);
                done();
            }, false, customServiceV4);
        });

        // --- Casos de error ---
        it("Error con más de 10 emails", function (done) {
            const customServiceV4 = { email: Array(11).fill("test@example.com") };
            StampServiceV4.Set(tokenParams).ServiceV4StampV1(xmlSellado, (err, res) => {
                assert.isNotNull(err);
                assert.include(err.message, "Solo se permiten hasta 10 correos");
                done();
            }, false, customServiceV4);
        });
    
        it("Error con customId > 100 caracteres", function (done) {
            const customServiceV4 = { customId: "A".repeat(101) };
            StampServiceV4.Set(tokenParams).ServiceV4StampV1(xmlSellado, (err, res) => {
                assert.isNotNull(err);
                assert.include(err.message, "customId viene vacío o es mayor a 100 caracteres.");
                done();
            }, false, customServiceV4);
        });
    
        it("Error con pdf no booleano", function (done) {
            const customServiceV4 = { pdf: "pdf" };
            StampServiceV4.Set(tokenParams).ServiceV4StampV1(xmlSellado, (err, res) => {
                assert.isNotNull(err);
                assert.include(err.message, "pdf debe ser booleano");
                done();
            }, false, customServiceV4);
        });
    
        it("Error con email inválido", function (done) {
            const invalidEmail = "cliente-email";
            const customServiceV4 = { email: ["cliente1@test.com", invalidEmail] };
            StampServiceV4.Set(tokenParams).ServiceV4StampV1(xmlSellado, (err, res) => {
                assert.isNotNull(err);
                assert.include(err.message, `El correo '${invalidEmail}' no es válido.`);
                done();
            }, false, customServiceV4);
        });
	});
});
