const path = require('path');
const { assert } = require('chai');
const IssueJsonService = require('../SWServices/IssueJson/IssueJsonService');
const DateService = require('../SWServices/Toolkit/DateService');

const { SDKTEST_TOKEN, SDKTEST_USER, SDKTEST_PASSWORD } = process.env;

const SERVICES_URL = 'https://services.test.sw.com.mx';
const JSON_FILE = path.join(__dirname, 'Resources/file_issueJson.json');
const EXPECTED_RESULT = 'success';
const EXPECTED_RESULT_ERROR = 'error';

describe('IssueJsonServiceTest', function () {
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
describe('IssueJSONLV1', function () {
    this.timeout(15000);

    let json;

    beforeEach(function (done) {
        DateService.updateDateFromJson(JSON_FILE, (err, updatedJson) => {
            if (err) return done(err);
            json = updatedJson;
            jsonB64 = Buffer.from(updatedJson, 'utf8').toString('base64');
            done();
        });
    });


    it('Success con credenciales', function (done) {
        IssueJsonService.Set(authParams).IssueJsonV1(json, (err, res) => {
            if (err) {
                console.log('Error received:', JSON.stringify(err, null, 2));
                console.log('Response received:', JSON.stringify(res, null, 2));
            }
            assert.isNull(err);
            assert.equal(res.status, EXPECTED_RESULT);
            assert.isNotEmpty(res.data);
            done();
        });
    });

    it('Success con token', function (done) {
        IssueJsonService.Set(tokenParams).IssueJsonV1(json, (err, res) => {
            if (err) {
                console.log('Error received:', JSON.stringify(err, null, 2));
                console.log('Response received:', JSON.stringify(res, null, 2));
            }
            assert.isNull(err);
            assert.equal(res.status, EXPECTED_RESULT);
            assert.isNotEmpty(res.data);
            done();
        });
    });

});
/*----------------------------------------------------------V2----------------------------------------------------------*/
describe('IssueJSONLV2', function () {
    this.timeout(15000);

    let json;

    beforeEach(function (done) {
        DateService.updateDateFromJson(JSON_FILE, (err, updatedJson) => {
            if (err) return done(err);
            json = updatedJson;
            jsonB64 = Buffer.from(updatedJson, 'utf8').toString('base64');
            done();
        });
    });


    it('Success con credenciales', function (done) {
        IssueJsonService.Set(authParams).IssueJsonV2(json, (err, res) => {
            assert.isNull(err);
            assert.equal(res.status, EXPECTED_RESULT);
            assert.isNotEmpty(res.data);
            done();
        });
    });

    it('Success con token', function (done) {
        IssueJsonService.Set(tokenParams).IssueJsonV2(json, (err, res) => {
            assert.isNull(err);
            assert.equal(res.status, EXPECTED_RESULT);
            assert.isNotEmpty(res.data);
            done();
        });
    });

});
/*----------------------------------------------------------V3----------------------------------------------------------*/
describe('IssueJSONLV3', function () {
    this.timeout(15000);

    let json;

    beforeEach(function (done) {
        DateService.updateDateFromJson(JSON_FILE, (err, updatedJson) => {
            if (err) return done(err);
            json = updatedJson;
            jsonB64 = Buffer.from(updatedJson, 'utf8').toString('base64');
            done();
        });
    });


    it('Success con credenciales', function (done) {
        IssueJsonService.Set(authParams).IssueJsonV3(json, (err, res) => {
            assert.isNull(err);
            assert.equal(res.status, EXPECTED_RESULT);
            assert.isNotEmpty(res.data);
            done();
        });
    });

    it('Success con token', function (done) {
        IssueJsonService.Set(tokenParams).IssueJsonV3(json, (err, res) => {
            assert.isNull(err);
            assert.equal(res.status, EXPECTED_RESULT);
            assert.isNotEmpty(res.data);
            done();
        });
    });

});
/*----------------------------------------------------------V4----------------------------------------------------------*/
describe('IssueJSONLV4', function () {
    this.timeout(15000);

    let json;

    beforeEach(function (done) {
        DateService.updateDateFromJson(JSON_FILE, (err, updatedJson) => {
            if (err) return done(err);
            json = updatedJson;
            jsonB64 = Buffer.from(updatedJson, 'utf8').toString('base64');
            done();
        });
    });


    it('Success con credenciales', function (done) {
        IssueJsonService.Set(authParams).IssueJsonV4(json, (err, res) => {
            assert.isNull(err);
            assert.equal(res.status, EXPECTED_RESULT);
            assert.isNotEmpty(res.data);
            done();
        });
    });

    it('Success con token', function (done) {
        IssueJsonService.Set(tokenParams).IssueJsonV4(json, (err, res) => {
            assert.isNull(err);
            assert.equal(res.status, EXPECTED_RESULT);
            assert.isNotEmpty(res.data);
            done();
        });
    });

});
});