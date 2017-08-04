var chai = require('chai');
var assert = chai.assert;
var StampService = require('../SWServices/Stamp/StampService');
var fs = require('fs');
var expectedResult = 'success';

describe('StampService.js', function(){

	describe('StampXMLV1', function() {
		
		var result = 'error';
		var msg = '';

		var params = {
			user: "demo",
			password: "123456789",
			url: 'http://services.test.sw.com.mx',
			token: 'T2lYQ0t4L0RHVkR4dHZ5Nkk1VHNEakZ3Y0J4Nk9GODZuRyt4cE1wVm5tbXB3YVZxTHdOdHAwVXY2NTdJb1hkREtXTzE3dk9pMmdMdkFDR2xFWFVPUXpTUm9mTG1ySXdZbFNja3FRa0RlYURqbzdzdlI2UUx1WGJiKzViUWY2dnZGbFloUDJ6RjhFTGF4M1BySnJ4cHF0YjUvbmRyWWpjTkVLN3ppd3RxL0dJPQ.T2lYQ0t4L0RHVkR4dHZ5Nkk1VHNEakZ3Y0J4Nk9GODZuRyt4cE1wVm5tbFlVcU92YUJTZWlHU3pER1kySnlXRTF4alNUS0ZWcUlVS0NhelhqaXdnWTRncklVSWVvZlFZMWNyUjVxYUFxMWFxcStUL1IzdGpHRTJqdS9Zakw2UGRiMTFPRlV3a2kyOWI5WUZHWk85ODJtU0M2UlJEUkFTVXhYTDNKZVdhOXIySE1tUVlFdm1jN3kvRStBQlpLRi9NeWJrd0R3clhpYWJrVUMwV0Mwd3FhUXdpUFF5NW5PN3J5cklMb0FETHlxVFRtRW16UW5ZVjAwUjdCa2g0Yk1iTExCeXJkVDRhMGMxOUZ1YWlIUWRRVC8yalFTNUczZXdvWlF0cSt2UW0waFZKY2gyaW5jeElydXN3clNPUDNvU1J2dm9weHBTSlZYNU9aaGsvalpQMUxrUndzK0dHS2dpTittY1JmR3o2M3NqNkh4MW9KVXMvUHhZYzVLQS9UK2E1SVhEZFJKYWx4ZmlEWDFuSXlqc2ZRYXlUQk1ldlZkU2tEdU10NFVMdHZKUURLblBxakw0SDl5bUxabDFLNmNPbEp6b3Jtd2Q1V2htRHlTdDZ6eTFRdUNnYnVvK2tuVUdhMmwrVWRCZi9rQkU9.7k2gVCGSZKLzJK5Ky3Nr5tKxvGSJhL13Q8W-YhT0uIo'
		};

	  	beforeEach(function(done){
		  	fs.readFile('./lib/Tests/Resources/file.xml', 'utf8', function(err, contents) {
		  		if(err) {
		  			result = 'error';
		  			msg = 'error al abrir el archivo';
		  			done();
		  		} else {
		  			var callback = (error, data) => {
		  				result = error ? error.status : data.status;
		  				msg = error.message;
		  			 	done();
		  			};

		  	    	let xml = contents;
		  	    	let stamp = StampService.Set(params);
		  	    	stamp.StampV1(xml, callback);
		  		}
		  	});

	  	});

		it('Success si las credenciales y el xml son correctos (V1)', function() {
			assert.equal(result, expectedResult, msg);
		});

	});

	describe('StampXMLV1byToken', function() {
		var params = {
			url: 'http://services.test.sw.com.mx',
			token: 'T2lYQ0t4L0RHVkR4dHZ5Nkk1VHNEakZ3Y0J4Nk9GODZuRyt4cE1wVm5tbXB3YVZxTHdOdHAwVXY2NTdJb1hkREtXTzE3dk9pMmdMdkFDR2xFWFVPUXpTUm9mTG1ySXdZbFNja3FRa0RlYURqbzdzdlI2UUx1WGJiKzViUWY2dnZGbFloUDJ6RjhFTGF4M1BySnJ4cHF0YjUvbmRyWWpjTkVLN3ppd3RxL0dJPQ.T2lYQ0t4L0RHVkR4dHZ5Nkk1VHNEakZ3Y0J4Nk9GODZuRyt4cE1wVm5tbFlVcU92YUJTZWlHU3pER1kySnlXRTF4alNUS0ZWcUlVS0NhelhqaXdnWTRncklVSWVvZlFZMWNyUjVxYUFxMWFxcStUL1IzdGpHRTJqdS9Zakw2UGRiMTFPRlV3a2kyOWI5WUZHWk85ODJtU0M2UlJEUkFTVXhYTDNKZVdhOXIySE1tUVlFdm1jN3kvRStBQlpLRi9NeWJrd0R3clhpYWJrVUMwV0Mwd3FhUXdpUFF5NW5PN3J5cklMb0FETHlxVFRtRW16UW5ZVjAwUjdCa2g0Yk1iTExCeXJkVDRhMGMxOUZ1YWlIUWRRVC8yalFTNUczZXdvWlF0cSt2UW0waFZKY2gyaW5jeElydXN3clNPUDNvU1J2dm9weHBTSlZYNU9aaGsvalpQMUxrUndzK0dHS2dpTittY1JmR3o2M3NqNkh4MW9KVXMvUHhZYzVLQS9UK2E1SVhEZFJKYWx4ZmlEWDFuSXlqc2ZRYXlUQk1ldlZkU2tEdU10NFVMdHZKUURLblBxakw0SDl5bUxabDFLNmNPbEp6b3Jtd2Q1V2htRHlTdDZ6eTFRdUNnYnVvK2tuVUdhMmwrVWRCZi9rQkU9.7k2gVCGSZKLzJK5Ky3Nr5tKxvGSJhL13Q8W-YhT0uIo'
		};

		beforeEach(function(done) {
		  	fs.readFile('./lib/Tests/Resources/file.xml', 'utf8', function(err, contents) {
		  		if(err) {
		  			result = 'error';
		  			msg = 'error al abrir el archivo';
		  			done();
		  		} else {
		  			var callback = (error, data) => {
		  				result = error ? error.status : data.status;
		  				msg = error.message;
		  			 	done();
		  			};

		  	    	let xml = contents;

		  	    	let stamp = StampService.Set(params);
		  	    	stamp.StampV1(xml, callback);
		  		}
		  	});

	  	});

	  	it('Success si las credenciales y el xml son correctos (V1 by token)', function() {
			assert.equal(result, expectedResult, msg);
		});
	});

/*----------------------------------------------------------V2----------------------------------------------------------*/
	describe('StampXMLV2', function() {
		var result = 'error';
		var msg = '';
		
		var params = {
			user: "demo",
			password: "123456789",
			url: 'http://services.test.sw.com.mx',
		};

	  	beforeEach(function(done){
		  	fs.readFile('./lib/Tests/Resources/file.xml', 'utf8', function(err, contents) {
		  		if(err) {
		  			result = 'error';
		  			msg = 'error al abrir el archivo';
		  			done();
		  		} else {
		  			var callback = (error, data) => {
		  				result = error ? error.status : data.status;
		  				msg = error.message;
		  			 	done();
		  			};

		  	    	let xml = contents;
		  	    	let stamp = StampService.Set(params);
		  	    	stamp.StampV2(xml, callback);
		  		}
		  	});

	  	});

		it('Success si las credenciales y el xml v2 son correctos (V2)', function() {
			assert.equal(result, expectedResult, msg);
		});
	});

	describe('StampB64V2', function() {
		
		var result = 'error';
		var msg = '';

		var params = {
			user: "demo",
			password: "123456789",
			url: 'http://services.test.sw.com.mx',
		};

	  	beforeEach(function(done){
		  	fs.readFile('./lib/Tests/Resources/b64.txt', 'utf8', function(err, contents) {
		  		if(err) {
		  			result = 'error';
		  			msg = 'error al abrir el archivo';
		  			done();
		  		} else {
		  			var callback = (error, data) => {
		  				result = error ? error.status : data.status;
		  				msg = error.message;
		  			 	done();
		  			};

		  	    	let xml = contents;
		  	    	let stamp = StampService.Set(params);
		  	    	stamp.StampV2(xml, callback, true);
		  		}
		  	});

	  	});

		it('Success si las credenciales y el b64 son correctos (V2)', function() {
			assert.equal(result, expectedResult, msg);
		});

	});

	describe("StampXMLV2byToken", function() {
		var params = {
			url: 'http://services.test.sw.com.mx',
			token: 'T2lYQ0t4L0RHVkR4dHZ5Nkk1VHNEakZ3Y0J4Nk9GODZuRyt4cE1wVm5tbXB3YVZxTHdOdHAwVXY2NTdJb1hkREtXTzE3dk9pMmdMdkFDR2xFWFVPUXpTUm9mTG1ySXdZbFNja3FRa0RlYURqbzdzdlI2UUx1WGJiKzViUWY2dnZGbFloUDJ6RjhFTGF4M1BySnJ4cHF0YjUvbmRyWWpjTkVLN3ppd3RxL0dJPQ.T2lYQ0t4L0RHVkR4dHZ5Nkk1VHNEakZ3Y0J4Nk9GODZuRyt4cE1wVm5tbFlVcU92YUJTZWlHU3pER1kySnlXRTF4alNUS0ZWcUlVS0NhelhqaXdnWTRncklVSWVvZlFZMWNyUjVxYUFxMWFxcStUL1IzdGpHRTJqdS9Zakw2UGRiMTFPRlV3a2kyOWI5WUZHWk85ODJtU0M2UlJEUkFTVXhYTDNKZVdhOXIySE1tUVlFdm1jN3kvRStBQlpLRi9NeWJrd0R3clhpYWJrVUMwV0Mwd3FhUXdpUFF5NW5PN3J5cklMb0FETHlxVFRtRW16UW5ZVjAwUjdCa2g0Yk1iTExCeXJkVDRhMGMxOUZ1YWlIUWRRVC8yalFTNUczZXdvWlF0cSt2UW0waFZKY2gyaW5jeElydXN3clNPUDNvU1J2dm9weHBTSlZYNU9aaGsvalpQMUxrUndzK0dHS2dpTittY1JmR3o2M3NqNkh4MW9KVXMvUHhZYzVLQS9UK2E1SVhEZFJKYWx4ZmlEWDFuSXlqc2ZRYXlUQk1ldlZkU2tEdU10NFVMdHZKUURLblBxakw0SDl5bUxabDFLNmNPbEp6b3Jtd2Q1V2htRHlTdDZ6eTFRdUNnYnVvK2tuVUdhMmwrVWRCZi9rQkU9.7k2gVCGSZKLzJK5Ky3Nr5tKxvGSJhL13Q8W-YhT0uIo'
		};

		beforeEach(function(done){
		  	fs.readFile('./lib/Tests/Resources/file.xml', 'utf8', function(err, contents) {
		  		if(err) {
		  			result = 'error';
		  			msg = 'error al abrir el archivo';
		  			done();
		  		} else {
		  			var callback = (error, data) => {
		  				result = error ? error.status : data.status;
		  				msg = error.message;
		  			 	done();
		  			};

		  	    	let xml = contents;

		  	    	let stamp = StampService.Set(params);
		  	    	stamp.StampV2(xml, callback);
		  		}
		  	});

	  	});

	  	it('Success si las credenciales y el xml son correctos (V2 by token)', function() {
			assert.equal(result, expectedResult, msg);
		});
	});


	describe("StampXMLV2_B64", function() {
		var result = 'error';
		var msg = '';
		
		var params = {
			user: "demo",
			password: "123456789",
			url: 'http://services.test.sw.com.mx',
		};

	  	beforeEach(function(done) {
		  	fs.readFile('./lib/Tests/Resources/b64.txt', 'utf8', function(err, contents) {
		  		if(err) {
		  			result = 'error';
		  			msg = 'error al abrir el archivo';
		  			done();
		  		} else {
		  			var callback = (error, data) => {
		  				result = error ? error.status : data.status;
		  				msg = error.message;
		  			 	done();
		  			};

		  	    	let xml = contents;
		  	    	let stamp = StampService.Set(params);
		  	    	stamp.StampV2(xml, callback, true);
		  		}
		  	});

	  	});

		it('Success si las credenciales y el archivo b64 son correctos (V2_B64)', function() {
			assert.equal(result, expectedResult, msg);
		});

	});

/*----------------------------------------------------------V3----------------------------------------------------------*/
	describe('StampXMLV3', function() {
		var result = 'error';
		var msg = '';
		
		var params = {
			user: "demo",
			password: "123456789",
			url: 'http://services.test.sw.com.mx',
		};

	  	beforeEach(function(done) {
		  	fs.readFile('./lib/Tests/Resources/file.xml', 'utf8', function(err, contents) {
		  		if(err) {
		  			result = 'error';
		  			msg = 'error al abrir el archivo';
		  			done();
		  		} else {
		  			var callback = (error, data) => {
		  				result = error ? error.status : data.status;
		  				msg = error.message;
		  			 	done();
		  			};

		  	    	let xml = contents;
		  	    	let stamp = StampService.Set(params);
		  	    	stamp.StampV3(xml, callback);
		  		}
		  	});
	  	});

		it('Success si las credenciales y el xml v3 son correctos (V3)', function() {
			assert.equal(result, expectedResult, msg);
		});
	});

	describe('StampB64V3', function() {
		
		var result = 'error';
		var msg = '';

		var params = {
			user: "demo",
			password: "123456789",
			url: 'http://services.test.sw.com.mx',
		};

	  	beforeEach(function(done){
		  	fs.readFile('./lib/Tests/Resources/b64.txt', 'utf8', function(err, contents) {
		  		if(err) {
		  			result = 'error';
		  			msg = 'error al abrir el archivo';
		  			done();
		  		} else {
		  			var callback = (error, data) => {
		  				result = error ? error.status : data.status;
		  				msg = error.message;
		  			 	done();
		  			};

		  	    	let xml = contents;
		  	    	let stamp = StampService.Set(params);
		  	    	stamp.StampV3(xml, callback, true);
		  		}
		  	});

	  	});

		it('Success si las credenciales y el b64 son correctos (V3)', function() {
			assert.equal(result, expectedResult, msg);
		});

	});

	describe("StampXMLV3byToken", function(){
		var params = {
			url: 'http://services.test.sw.com.mx',
			token: 'T2lYQ0t4L0RHVkR4dHZ5Nkk1VHNEakZ3Y0J4Nk9GODZuRyt4cE1wVm5tbXB3YVZxTHdOdHAwVXY2NTdJb1hkREtXTzE3dk9pMmdMdkFDR2xFWFVPUXpTUm9mTG1ySXdZbFNja3FRa0RlYURqbzdzdlI2UUx1WGJiKzViUWY2dnZGbFloUDJ6RjhFTGF4M1BySnJ4cHF0YjUvbmRyWWpjTkVLN3ppd3RxL0dJPQ.T2lYQ0t4L0RHVkR4dHZ5Nkk1VHNEakZ3Y0J4Nk9GODZuRyt4cE1wVm5tbFlVcU92YUJTZWlHU3pER1kySnlXRTF4alNUS0ZWcUlVS0NhelhqaXdnWTRncklVSWVvZlFZMWNyUjVxYUFxMWFxcStUL1IzdGpHRTJqdS9Zakw2UGRiMTFPRlV3a2kyOWI5WUZHWk85ODJtU0M2UlJEUkFTVXhYTDNKZVdhOXIySE1tUVlFdm1jN3kvRStBQlpLRi9NeWJrd0R3clhpYWJrVUMwV0Mwd3FhUXdpUFF5NW5PN3J5cklMb0FETHlxVFRtRW16UW5ZVjAwUjdCa2g0Yk1iTExCeXJkVDRhMGMxOUZ1YWlIUWRRVC8yalFTNUczZXdvWlF0cSt2UW0waFZKY2gyaW5jeElydXN3clNPUDNvU1J2dm9weHBTSlZYNU9aaGsvalpQMUxrUndzK0dHS2dpTittY1JmR3o2M3NqNkh4MW9KVXMvUHhZYzVLQS9UK2E1SVhEZFJKYWx4ZmlEWDFuSXlqc2ZRYXlUQk1ldlZkU2tEdU10NFVMdHZKUURLblBxakw0SDl5bUxabDFLNmNPbEp6b3Jtd2Q1V2htRHlTdDZ6eTFRdUNnYnVvK2tuVUdhMmwrVWRCZi9rQkU9.7k2gVCGSZKLzJK5Ky3Nr5tKxvGSJhL13Q8W-YhT0uIo'
		};

		beforeEach(function(done){
		  	fs.readFile('./lib/Tests/Resources/file.xml', 'utf8', function(err, contents) {
		  		if(err) {
		  			result = 'error';
		  			msg = 'error al abrir el archivo';
		  			done();
		  		} else {
		  			var callback = (error, data) => {
		  				result = error ? error.status : data.status;
		  				msg = error.message;
		  			 	done();
		  			};

		  	    	let xml = contents;

		  	    	let stamp = StampService.Set(params);
		  	    	stamp.StampV3(xml, callback);
		  		}
		  	});

	  	});

	  	it('Success si las credenciales y el xml son correctos (V3 by token)', function() {
			assert.equal(result, expectedResult, msg);
		});
	});


	describe("StampXMLV3byToken_B64", function() {
		var params = {
			url: 'http://services.test.sw.com.mx',
			token: 'T2lYQ0t4L0RHVkR4dHZ5Nkk1VHNEakZ3Y0J4Nk9GODZuRyt4cE1wVm5tbXB3YVZxTHdOdHAwVXY2NTdJb1hkREtXTzE3dk9pMmdMdkFDR2xFWFVPUXpTUm9mTG1ySXdZbFNja3FRa0RlYURqbzdzdlI2UUx1WGJiKzViUWY2dnZGbFloUDJ6RjhFTGF4M1BySnJ4cHF0YjUvbmRyWWpjTkVLN3ppd3RxL0dJPQ.T2lYQ0t4L0RHVkR4dHZ5Nkk1VHNEakZ3Y0J4Nk9GODZuRyt4cE1wVm5tbFlVcU92YUJTZWlHU3pER1kySnlXRTF4alNUS0ZWcUlVS0NhelhqaXdnWTRncklVSWVvZlFZMWNyUjVxYUFxMWFxcStUL1IzdGpHRTJqdS9Zakw2UGRiMTFPRlV3a2kyOWI5WUZHWk85ODJtU0M2UlJEUkFTVXhYTDNKZVdhOXIySE1tUVlFdm1jN3kvRStBQlpLRi9NeWJrd0R3clhpYWJrVUMwV0Mwd3FhUXdpUFF5NW5PN3J5cklMb0FETHlxVFRtRW16UW5ZVjAwUjdCa2g0Yk1iTExCeXJkVDRhMGMxOUZ1YWlIUWRRVC8yalFTNUczZXdvWlF0cSt2UW0waFZKY2gyaW5jeElydXN3clNPUDNvU1J2dm9weHBTSlZYNU9aaGsvalpQMUxrUndzK0dHS2dpTittY1JmR3o2M3NqNkh4MW9KVXMvUHhZYzVLQS9UK2E1SVhEZFJKYWx4ZmlEWDFuSXlqc2ZRYXlUQk1ldlZkU2tEdU10NFVMdHZKUURLblBxakw0SDl5bUxabDFLNmNPbEp6b3Jtd2Q1V2htRHlTdDZ6eTFRdUNnYnVvK2tuVUdhMmwrVWRCZi9rQkU9.7k2gVCGSZKLzJK5Ky3Nr5tKxvGSJhL13Q8W-YhT0uIo'
		};

		beforeEach(function(done){
		  	fs.readFile('./lib/Tests/Resources/b64.txt', 'utf8', function(err, contents) {
		  		if(err) {
		  			result = 'error';
		  			msg = 'error al abrir el archivo';
		  			done();
		  		} else {
		  			var callback = (error, data) => {
		  				result = error ? error.status : data.status;
		  				msg = error.message;
		  			 	done();
		  			};

		  	    	let xml = contents;

		  	    	let stamp = StampService.Set(params);
		  	    	stamp.StampV3(xml, callback);
		  		}
		  	});

	  	});

	  	it('Success si las credenciales y el xml son correctos (V3 by token B64)', function() {
			assert.equal(result, expectedResult, msg);
		});
	});

/*----------------------------------------------------------V4----------------------------------------------------------*/
	describe('StampXMLV4', function(){
		var result = 'error';
		var msg = '';
		
		var params = {
			user: "demo",
			password: "123456789",
			url: 'http://services.test.sw.com.mx',
		};

	  	beforeEach(function(done){
		  	fs.readFile('./lib/Tests/Resources/file.xml', 'utf8', function(err, contents) {
		  		if(err) {
		  			result = 'error';
		  			msg = 'error al abrir el archivo';
		  			done();
		  		} else {
		  			var callback = (error, data) => {
		  				result = error ? error.status : data.status;
		  				msg = error.message;
		  			 	done();
		  			};

		  	    	let xml = contents;
		  	    	let stamp = StampService.Set(params);
		  	    	stamp.StampV4(xml, callback);
		  		}
		  	});

	  	});

		it('Success si las credenciales y el xml v4 son correctos (V4)', function() {
			assert.equal(result, expectedResult, msg);
		});
	});

	describe('StampB64V4', function() {
		
		var result = 'error';
		var msg = '';

		var params = {
			user: "demo",
			password: "123456789",
			url: 'http://services.test.sw.com.mx',
		};

	  	beforeEach(function(done){
		  	fs.readFile('./lib/Tests/Resources/b64.txt', 'utf8', function(err, contents) {
		  		if(err) {
		  			result = 'error';
		  			msg = 'error al abrir el archivo';
		  			done();
		  		} else {
		  			var callback = (error, data) => {
		  				result = error ? error.status : data.status;
		  				msg = error.message;
		  			 	done();
		  			};

		  	    	let xml = contents;
		  	    	let stamp = StampService.Set(params);
		  	    	stamp.StampV4(xml, callback, true);
		  		}
		  	});

	  	});

		it('Success si las credenciales y el b64 son correctos (V4)', function() {
			assert.equal(result, expectedResult, msg);
		});

	});

	describe("StampXMLV4byToken", function(){
		var params = {
			url: 'http://services.test.sw.com.mx',
			token: 'T2lYQ0t4L0RHVkR4dHZ5Nkk1VHNEakZ3Y0J4Nk9GODZuRyt4cE1wVm5tbXB3YVZxTHdOdHAwVXY2NTdJb1hkREtXTzE3dk9pMmdMdkFDR2xFWFVPUXpTUm9mTG1ySXdZbFNja3FRa0RlYURqbzdzdlI2UUx1WGJiKzViUWY2dnZGbFloUDJ6RjhFTGF4M1BySnJ4cHF0YjUvbmRyWWpjTkVLN3ppd3RxL0dJPQ.T2lYQ0t4L0RHVkR4dHZ5Nkk1VHNEakZ3Y0J4Nk9GODZuRyt4cE1wVm5tbFlVcU92YUJTZWlHU3pER1kySnlXRTF4alNUS0ZWcUlVS0NhelhqaXdnWTRncklVSWVvZlFZMWNyUjVxYUFxMWFxcStUL1IzdGpHRTJqdS9Zakw2UGRiMTFPRlV3a2kyOWI5WUZHWk85ODJtU0M2UlJEUkFTVXhYTDNKZVdhOXIySE1tUVlFdm1jN3kvRStBQlpLRi9NeWJrd0R3clhpYWJrVUMwV0Mwd3FhUXdpUFF5NW5PN3J5cklMb0FETHlxVFRtRW16UW5ZVjAwUjdCa2g0Yk1iTExCeXJkVDRhMGMxOUZ1YWlIUWRRVC8yalFTNUczZXdvWlF0cSt2UW0waFZKY2gyaW5jeElydXN3clNPUDNvU1J2dm9weHBTSlZYNU9aaGsvalpQMUxrUndzK0dHS2dpTittY1JmR3o2M3NqNkh4MW9KVXMvUHhZYzVLQS9UK2E1SVhEZFJKYWx4ZmlEWDFuSXlqc2ZRYXlUQk1ldlZkU2tEdU10NFVMdHZKUURLblBxakw0SDl5bUxabDFLNmNPbEp6b3Jtd2Q1V2htRHlTdDZ6eTFRdUNnYnVvK2tuVUdhMmwrVWRCZi9rQkU9.7k2gVCGSZKLzJK5Ky3Nr5tKxvGSJhL13Q8W-YhT0uIo'
		};

		beforeEach(function(done){
		  	fs.readFile('./lib/Tests/Resources/file.xml', 'utf8', function(err, contents) {
		  		if(err) {
		  			result = 'error';
		  			msg = 'error al abrir el archivo';
		  			done();
		  		} else {
		  			var callback = (error, data) => {
		  				result = error ? error.status : data.status;
		  				msg = error.message;
		  			 	done();
		  			};

		  	    	let xml = contents;

		  	    	let stamp = StampService.Set(params);
		  	    	stamp.StampV4(xml, callback);
		  		}
		  	});

	  	});

	  	it('Success si las credenciales y el xml son correctos (V4 by token)', function() {
			assert.equal(result, expectedResult, msg);
		});
	});

	describe("StampXMLV4byToken_B64", function() {
		var params = {
			url: 'http://services.test.sw.com.mx',
			token: 'T2lYQ0t4L0RHVkR4dHZ5Nkk1VHNEakZ3Y0J4Nk9GODZuRyt4cE1wVm5tbXB3YVZxTHdOdHAwVXY2NTdJb1hkREtXTzE3dk9pMmdMdkFDR2xFWFVPUXpTUm9mTG1ySXdZbFNja3FRa0RlYURqbzdzdlI2UUx1WGJiKzViUWY2dnZGbFloUDJ6RjhFTGF4M1BySnJ4cHF0YjUvbmRyWWpjTkVLN3ppd3RxL0dJPQ.T2lYQ0t4L0RHVkR4dHZ5Nkk1VHNEakZ3Y0J4Nk9GODZuRyt4cE1wVm5tbFlVcU92YUJTZWlHU3pER1kySnlXRTF4alNUS0ZWcUlVS0NhelhqaXdnWTRncklVSWVvZlFZMWNyUjVxYUFxMWFxcStUL1IzdGpHRTJqdS9Zakw2UGRiMTFPRlV3a2kyOWI5WUZHWk85ODJtU0M2UlJEUkFTVXhYTDNKZVdhOXIySE1tUVlFdm1jN3kvRStBQlpLRi9NeWJrd0R3clhpYWJrVUMwV0Mwd3FhUXdpUFF5NW5PN3J5cklMb0FETHlxVFRtRW16UW5ZVjAwUjdCa2g0Yk1iTExCeXJkVDRhMGMxOUZ1YWlIUWRRVC8yalFTNUczZXdvWlF0cSt2UW0waFZKY2gyaW5jeElydXN3clNPUDNvU1J2dm9weHBTSlZYNU9aaGsvalpQMUxrUndzK0dHS2dpTittY1JmR3o2M3NqNkh4MW9KVXMvUHhZYzVLQS9UK2E1SVhEZFJKYWx4ZmlEWDFuSXlqc2ZRYXlUQk1ldlZkU2tEdU10NFVMdHZKUURLblBxakw0SDl5bUxabDFLNmNPbEp6b3Jtd2Q1V2htRHlTdDZ6eTFRdUNnYnVvK2tuVUdhMmwrVWRCZi9rQkU9.7k2gVCGSZKLzJK5Ky3Nr5tKxvGSJhL13Q8W-YhT0uIo'
		};

		beforeEach(function(done){
		  	fs.readFile('./lib/Tests/Resources/b64.txt', 'utf8', function(err, contents) {
		  		if(err) {
		  			result = 'error';
		  			msg = 'error al abrir el archivo';
		  			done();
		  		} else {
		  			var callback = (error, data) => {
		  				result = error ? error.status : data.status;
		  				msg = error.message;
		  			 	done();
		  			};

		  	    	let xml = contents;

		  	    	let stamp = StampService.Set(params);
		  	    	stamp.StampV4(xml, callback, true);
		  		}
		  	});

	  	});

	  	it('Success si las credenciales y el xml son correctos (V4 by token B64)', function() {
			assert.equal(result, expectedResult, msg);
		});
	});
});
