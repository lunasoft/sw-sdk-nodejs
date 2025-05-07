var chai = require("chai");
var assert = chai.assert;
var StampService = require("../SWServices/Stamp/StampService");
var SignService = require("../SWServices/Toolkit/SignService");
var fs = require("fs");
var path = require("path");

var expectedResult = "success";

const SDKTEST_TOKEN = process.env.SDKTEST_TOKEN;
const SDKTEST_USER = process.env.SDKTEST_USER;
const SDKTEST_PASSWORD = process.env.SDKTEST_PASSWORD;

const signParams = {
	pfxPassword: "12345678a",
	pfxPath: path.join(__dirname, "Resources/SignResources/certificado.pfx"),
	xmlPath: path.join(__dirname, "Resources/SignResources/file.xml"),
	originalChain: path.join(__dirname, "Resources/SignResources/cadenaOriginal.txt"),
};

describe("StampService.js", function () {
	// Se coloca un timeout para evitar enviar el mismo documento
	this.timeout(60000);
	afterEach(function (done) {
		this.timeout(1050);
		setTimeout(done, 1000);
	});

	/*----------------------------------------------------------V1----------------------------------------------------------*/

	describe("StampXMLV1", function () {
		this.timeout(15000);
		var result = "error";
		var msg = "";
		var data = null;

		var params = {
			user: SDKTEST_USER,
			password: SDKTEST_PASSWORD,
			url: "https://services.test.sw.com.mx",
		};

		beforeEach(async function () {
			try {
				const { xmlSellado } = await SignService.obtenerSello(signParams);
				await new Promise((resolve) => {
					const callback = (error, response) => {
						result = error ? error.status : response.status;
						msg = error ? error.message : null;
						data = response ? response.data : null;
						resolve();
					};
					StampService.Set(params).StampV1(xmlSellado, callback);
				});
			} catch (e) {
				result = "error";
				msg = `Error: ${e.message}`;
			}
		});

		it("Success si las credenciales y el xml son correctos (V1)", function () {
			assert.equal(result, expectedResult);
			assert.isNotNull(data, "El nodo data no debe ser nulo");
			assert.notDeepEqual(data, {}, "El nodo data no debe estar vacío");
		});
	});

	describe("StampXMLV1ByToken", function () {
		this.timeout(15000);
		var result = "error";
		var msg = "";
		var data = null;

		var params = {
			token: SDKTEST_TOKEN,
			url: "https://services.test.sw.com.mx",
		};

		beforeEach(async function () {
			try {
				const { xmlSellado } = await SignService.obtenerSello(signParams);
				await new Promise((resolve) => {
					const callback = (error, response) => {
						result = error ? error.status : response.status;
						msg = error ? error.message : null;
						data = response ? response.data : null;
						resolve();
					};
					StampService.Set(params).StampV1(xmlSellado, callback);
				});
			} catch (e) {
				result = "error";
				msg = `Error: ${e.message}`;
			}
		});

		it("Success si las credenciales y el xml son correctos (V1 By Token)", function () {
			assert.equal(result, expectedResult);
			assert.isNotNull(data, "El nodo data no debe ser nulo");
			assert.notDeepEqual(data, {}, "El nodo data no debe estar vacío");
		});
	});

	describe("StampXMLV1_B64", function () {
		this.timeout(15000);
		var result = "error";
		var msg = "";
		var data = null;

		const params = {
			user: SDKTEST_USER,
			password: SDKTEST_PASSWORD,
			url: "https://services.test.sw.com.mx",
		};

		beforeEach(async function () {
			try {
				const { xmlSellado } = await SignService.obtenerSello(signParams);
				const xmlB64 = Buffer.from(xmlSellado, "utf8").toString("base64");
				await new Promise((resolve) => {
					const callback = (error, response) => {
						result = error ? error.status : response.status;
						msg = error ? error.message : null;
						data = response ? response.data : null;
						resolve();
					};
					StampService.Set(params).StampV1(xmlB64, callback, true);
				});
			} catch (e) {
				result = "error";
				msg = `Error: ${e.message}`;
			}
		});

		it("Success si las credenciales y el archivo b64 son correctos (V1 B64)", function () {
			assert.equal(result, expectedResult);
			assert.isNotNull(data, "El nodo data no debe ser nulo");
			assert.notDeepEqual(data, {}, "El nodo data no debe estar vacío");
		});
	});

	describe("StampXMLV1ByToken_B64", function () {
		this.timeout(15000);
		var result = "error";
		var msg = "";
		var data = null;

		const params = {
			token: SDKTEST_TOKEN,
			url: "https://services.test.sw.com.mx",
		};

		beforeEach(async function () {
			try {
				const { xmlSellado } = await SignService.obtenerSello(signParams);
				const xmlB64 = Buffer.from(xmlSellado, "utf8").toString("base64");
				await new Promise((resolve) => {
					const callback = (error, response) => {
						result = error ? error.status : response.status;
						msg = error ? error.message : null;
						data = response ? response.data : null;
						resolve();
					};
					StampService.Set(params).StampV1(xmlB64, callback, true);
				});
			} catch (e) {
				result = "error";
				msg = `Error: ${e.message}`;
			}
		});

		it("Success si el token y el archivo b64 son correctos (V1 By Token B64)", function () {
			assert.equal(result, expectedResult);
			assert.isNotNull(data, "El nodo data no debe ser nulo");
			assert.notDeepEqual(data, {}, "El nodo data no debe estar vacío");
		});
	});

	/*----------------------------------------------------------V2----------------------------------------------------------*/
	describe("StampXMLV2", function () {
		this.timeout(15000);
		var result = "error";
		var msg = "";
		var data = null;

		var params = {
			user: SDKTEST_USER,
			password: SDKTEST_PASSWORD,
			url: "https://services.test.sw.com.mx",
		};

		beforeEach(async function () {
			try {
				const { xmlSellado } = await SignService.obtenerSello(signParams);
				await new Promise((resolve) => {
					const callback = (error, response) => {
						result = error ? error.status : response.status;
						msg = error ? error.message : null;
						data = response ? response.data : null;
						resolve();
					};
					StampService.Set(params).StampV2(xmlSellado, callback);
				});
			} catch (e) {
				result = "error";
				msg = `Error: ${e.message}`;
			}
		});

		it("Success si las credenciales y el xml son correctos (V2)", function () {
			assert.equal(result, expectedResult);
			assert.isNotNull(data, "El nodo data no debe ser nulo");
			assert.notDeepEqual(data, {}, "El nodo data no debe estar vacío");
		});
	});

	describe("StampXMLV2ByToken", function () {
		this.timeout(15000);
		var result = "error";
		var msg = "";
		var data = null;

		var params = {
			token: SDKTEST_TOKEN,
			url: "https://services.test.sw.com.mx",
		};

		beforeEach(async function () {
			try {
				const { xmlSellado } = await SignService.obtenerSello(signParams);
				await new Promise((resolve) => {
					const callback = (error, response) => {
						result = error ? error.status : response.status;
						msg = error ? error.message : null;
						data = response ? response.data : null;
						resolve();
					};
					StampService.Set(params).StampV2(xmlSellado, callback);
				});
			} catch (e) {
				result = "error";
				msg = `Error: ${e.message}`;
			}
		});

		it("Success si las credenciales y el xml son correctos (V2 By Token)", function () {
			assert.equal(result, expectedResult);
			assert.isNotNull(data, "El nodo data no debe ser nulo");
			assert.notDeepEqual(data, {}, "El nodo data no debe estar vacío");
		});
	});

	describe("StampXMLV2_B64", function () {
		this.timeout(15000);
		var result = "error";
		var msg = "";
		var data = null;

		const params = {
			user: SDKTEST_USER,
			password: SDKTEST_PASSWORD,
			url: "https://services.test.sw.com.mx",
		};

		beforeEach(async function () {
			try {
				const { xmlSellado } = await SignService.obtenerSello(signParams);
				const xmlB64 = Buffer.from(xmlSellado, "utf8").toString("base64");
				await new Promise((resolve) => {
					const callback = (error, response) => {
						result = error ? error.status : response.status;
						msg = error ? error.message : null;
						data = response ? response.data : null;
						resolve();
					};
					StampService.Set(params).StampV2(xmlB64, callback, true);
				});
			} catch (e) {
				result = "error";
				msg = `Error: ${e.message}`;
			}
		});

		it("Success si las credenciales y el archivo b64 son correctos (V2 B64)", function () {
			assert.equal(result, expectedResult);
			assert.isNotNull(data, "El nodo data no debe ser nulo");
			assert.notDeepEqual(data, {}, "El nodo data no debe estar vacío");
		});
	});

	describe("StampXMLV2ByToken_B64", function () {
		this.timeout(15000);
		var result = "error";
		var msg = "";
		var data = null;

		const params = {
			token: SDKTEST_TOKEN,
			url: "https://services.test.sw.com.mx",
		};

		beforeEach(async function () {
			try {
				const { xmlSellado } = await SignService.obtenerSello(signParams);
				const xmlB64 = Buffer.from(xmlSellado, "utf8").toString("base64");
				await new Promise((resolve) => {
					const callback = (error, response) => {
						result = error ? error.status : response.status;
						msg = error ? error.message : null;
						data = response ? response.data : null;
						resolve();
					};
					StampService.Set(params).StampV2(xmlB64, callback, true);
				});
			} catch (e) {
				result = "error";
				msg = `Error: ${e.message}`;
			}
		});

		it("Success si el token y el archivo b64 son correctos (V2 By Token B64)", function () {
			assert.equal(result, expectedResult);
			assert.isNotNull(data, "El nodo data no debe ser nulo");
			assert.notDeepEqual(data, {}, "El nodo data no debe estar vacío");
		});
	});

	/*----------------------------------------------------------V3----------------------------------------------------------*/
	describe("StampXMLV3", function () {
		this.timeout(15000);
		var result = "error";
		var msg = "";
		var data = null;

		var params = {
			user: SDKTEST_USER,
			password: SDKTEST_PASSWORD,
			url: "https://services.test.sw.com.mx",
		};

		beforeEach(async function () {
			try {
				const { xmlSellado } = await SignService.obtenerSello(signParams);
				await new Promise((resolve) => {
					const callback = (error, response) => {
						result = error ? error.status : response.status;
						msg = error ? error.message : null;
						data = response ? response.data : null;
						resolve();
					};
					StampService.Set(params).StampV3(xmlSellado, callback);
				});
			} catch (e) {
				result = "error";
				msg = `Error: ${e.message}`;
			}
		});

		it("Success si las credenciales y el xml son correctos (V3)", function () {
			assert.equal(result, expectedResult);
			assert.isNotNull(data, "El nodo data no debe ser nulo");
			assert.notDeepEqual(data, {}, "El nodo data no debe estar vacío");
		});
	});

	describe("StampXMLV3ByToken", function () {
		this.timeout(15000);
		var result = "error";
		var msg = "";
		var data = null;

		var params = {
			token: SDKTEST_TOKEN,
			url: "https://services.test.sw.com.mx",
		};

		beforeEach(async function () {
			try {
				const { xmlSellado } = await SignService.obtenerSello(signParams);
				await new Promise((resolve) => {
					const callback = (error, response) => {
						result = error ? error.status : response.status;
						msg = error ? error.message : null;
						data = response ? response.data : null;
						resolve();
					};
					StampService.Set(params).StampV3(xmlSellado, callback);
				});
			} catch (e) {
				result = "error";
				msg = `Error: ${e.message}`;
			}
		});

		it("Success si las credenciales y el xml son correctos (V3 By Token)", function () {
			assert.equal(result, expectedResult);
			assert.isNotNull(data, "El nodo data no debe ser nulo");
			assert.notDeepEqual(data, {}, "El nodo data no debe estar vacío");
		});
	});

	describe("StampXMLV3_B64", function () {
		this.timeout(15000);
		var result = "error";
		var msg = "";
		var data = null;

		const params = {
			user: SDKTEST_USER,
			password: SDKTEST_PASSWORD,
			url: "https://services.test.sw.com.mx",
		};

		beforeEach(async function () {
			try {
				const { xmlSellado } = await SignService.obtenerSello(signParams);
				const xmlB64 = Buffer.from(xmlSellado, "utf8").toString("base64");
				await new Promise((resolve) => {
					const callback = (error, response) => {
						result = error ? error.status : response.status;
						msg = error ? error.message : null;
						data = response ? response.data : null;
						resolve();
					};
					StampService.Set(params).StampV3(xmlB64, callback, true);
				});
			} catch (e) {
				result = "error";
				msg = `Error: ${e.message}`;
			}
		});

		it("Success si las credenciales y el archivo b64 son correctos (V3 B64)", function () {
			assert.equal(result, expectedResult);
			assert.isNotNull(data, "El nodo data no debe ser nulo");
			assert.notDeepEqual(data, {}, "El nodo data no debe estar vacío");
		});
	});

	describe("StampXMLV3ByToken_B64", function () {
		this.timeout(15000);
		var result = "error";
		var msg = "";
		var data = null;

		const params = {
			token: SDKTEST_TOKEN,
			url: "https://services.test.sw.com.mx",
		};

		beforeEach(async function () {
			try {
				const { xmlSellado } = await SignService.obtenerSello(signParams);
				const xmlB64 = Buffer.from(xmlSellado, "utf8").toString("base64");
				await new Promise((resolve) => {
					const callback = (error, response) => {
						result = error ? error.status : response.status;
						msg = error ? error.message : null;
						data = response ? response.data : null;
						resolve();
					};
					StampService.Set(params).StampV3(xmlB64, callback, true);
				});
			} catch (e) {
				result = "error";
				msg = `Error: ${e.message}`;
			}
		});

		it("Success si el token y el archivo b64 son correctos (V3 By Token B64)", function () {
			assert.equal(result, expectedResult);
			assert.isNotNull(data, "El nodo data no debe ser nulo");
			assert.notDeepEqual(data, {}, "El nodo data no debe estar vacío");
		});
	});

	/*----------------------------------------------------------V4----------------------------------------------------------*/
	describe("StampXMLV4", function () {
		this.timeout(15000);
		var result = "error";
		var msg = "";
		var data = null;

		var params = {
			user: SDKTEST_USER,
			password: SDKTEST_PASSWORD,
			url: "https://services.test.sw.com.mx",
		};

		beforeEach(async function () {
			try {
				const { xmlSellado } = await SignService.obtenerSello(signParams);
				await new Promise((resolve) => {
					const callback = (error, response) => {
						result = error ? error.status : response.status;
						msg = error ? error.message : null;
						data = response ? response.data : null;
						resolve();
					};
					StampService.Set(params).StampV4(xmlSellado, callback);
				});
			} catch (e) {
				result = "error";
				msg = `Error: ${e.message}`;
			}
		});

		it("Success si las credenciales y el xml son correctos (V4)", function () {
			assert.equal(result, expectedResult);
			assert.isNotNull(data, "El nodo data no debe ser nulo");
			assert.notDeepEqual(data, {}, "El nodo data no debe estar vacío");
		});
	});

	describe("StampXMLV4ByToken", function () {
		this.timeout(15000);
		var result = "error";
		var msg = "";
		var data = null;

		var params = {
			token: SDKTEST_TOKEN,
			url: "https://services.test.sw.com.mx",
		};

		beforeEach(async function () {
			try {
				const { xmlSellado } = await SignService.obtenerSello(signParams);
				await new Promise((resolve) => {
					const callback = (error, response) => {
						result = error ? error.status : response.status;
						msg = error ? error.message : null;
						data = response ? response.data : null;
						resolve();
					};
					StampService.Set(params).StampV4(xmlSellado, callback);
				});
			} catch (e) {
				result = "error";
				msg = `Error: ${e.message}`;
			}
		});

		it("Success si las credenciales y el xml son correctos (V4 By Token)", function () {
			assert.equal(result, expectedResult);
			assert.isNotNull(data, "El nodo data no debe ser nulo");
			assert.notDeepEqual(data, {}, "El nodo data no debe estar vacío");
		});
	});

	describe("StampXMLV4_B64", function () {
		this.timeout(15000);
		var result = "error";
		var msg = "";
		var data = null;

		const params = {
			user: SDKTEST_USER,
			password: SDKTEST_PASSWORD,
			url: "https://services.test.sw.com.mx",
		};

		beforeEach(async function () {
			try {
				const { xmlSellado } = await SignService.obtenerSello(signParams);
				const xmlB64 = Buffer.from(xmlSellado, "utf8").toString("base64");
				await new Promise((resolve) => {
					const callback = (error, response) => {
						result = error ? error.status : response.status;
						msg = error ? error.message : null;
						data = response ? response.data : null;
						resolve();
					};
					StampService.Set(params).StampV4(xmlB64, callback, true);
				});
			} catch (e) {
				result = "error";
				msg = `Error: ${e.message}`;
			}
		});

		it("Success si las credenciales y el archivo b64 son correctos (V4 B64)", function () {
			assert.equal(result, expectedResult);
			assert.isNotNull(data, "El nodo data no debe ser nulo");
			assert.notDeepEqual(data, {}, "El nodo data no debe estar vacío");
		});
	});

	describe("StampXMLV4ByToken_B64", function () {
		this.timeout(15000);
		var result = "error";
		var msg = "";
		var data = null;

		const params = {
			token: SDKTEST_TOKEN,
			url: "https://services.test.sw.com.mx",
		};

		beforeEach(async function () {
			try {
				const { xmlSellado } = await SignService.obtenerSello(signParams);
				const xmlB64 = Buffer.from(xmlSellado, "utf8").toString("base64");
				await new Promise((resolve) => {
					const callback = (error, response) => {
						result = error ? error.status : response.status;
						msg = error ? error.message : null;
						data = response ? response.data : null;
						resolve();
					};
					StampService.Set(params).StampV4(xmlB64, callback, true);
				});
			} catch (e) {
				result = "error";
				msg = `Error: ${e.message}`;
			}
		});

		it("Success si el token y el archivo b64 son correctos (V4 By Token B64)", function () {
			assert.equal(result, expectedResult);
			assert.isNotNull(data, "El nodo data no debe ser nulo");
			assert.notDeepEqual(data, {}, "El nodo data no debe estar vacío");
		});
	});
});
