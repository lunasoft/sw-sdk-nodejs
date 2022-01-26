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
			user: "pruebas_ut@sw.com.mx",
			password: "swpass",
			url: 'http://services.test.sw.com.mx',
			token: 'T2lYQ0t4L0RHVkR4dHZ5Nkk1VHNEakZ3Y0J4Nk9GODZuRyt4cE1wVm5tbXB3YVZxTHdOdHAwVXY2NTdJb1hkREtXTzE3dk9pMmdMdkFDR2xFWFVPUXpTUm9mTG1ySXdZbFNja3FRa0RlYURqbzdzdlI2UUx1WGJiKzViUWY2dnZGbFloUDJ6RjhFTGF4M1BySnJ4cHF0YjUvbmRyWWpjTkVLN3ppd3RxL0dJPQ.T2lYQ0t4L0RHVkR4dHZ5Nkk1VHNEakZ3Y0J4Nk9GODZuRyt4cE1wVm5tbFlVcU92YUJTZWlHU3pER1kySnlXRTF4alNUS0ZWcUlVS0NhelhqaXdnWTRncklVSWVvZlFZMWNyUjVxYUFxMWFxcStUL1IzdGpHRTJqdS9Zakw2UGQ5aW9wQzVobTNxaW1QTGk1SGlBcldRaTlMcFdZTTV5eHZBWnBGRlM4eXVKL3hNQ09IWlFLZTQ5VEtvRUVEK2tyVTJ3TnFiYU9ORDJKRXJ3RCsrajNvbkY2KzNEMThVTlJaYVRVMTNRTzdyTFFXV3lsU3o3Y01HdHdtVzVPZGwzV3BHK2MxRFVIU0NHT1l5bzlyRDhLYWJ4SmlCcGxuWkZHck9LSXR0N1JtVytsTkh5MkVqUkMxTXJMcHh1bVcwc0o3TzZreDVLZmsvUzE2R1hTM1cwSnBYU2ZCTWkxWWhCbUo0cDNzK2xuZytURmtCajYraWFZYVVlNjU1alVOSFRKL0hNNWtCWTloY1REZzI4RHFocVl6OXpibXpqTXh0aEtGNnAza0N0a2ZCSitteXc4THhtd2dqNG8zWWhmUU45VUNaVXo2TzN1VkU3UU51YkdrWDZPdkl4T3g3M0tqSHJXeVRtaHh6M0ZSMzlGOEZpVEpLZFV6WENFL2JEb2wxSlBWVW5rRWJzR0RUeUZxdUV6VFJHMGN3PT0.R29CzBWle61aQZI0dq1POju9f4beaSMffo1CXVwOGJI'
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
			token: 'T2lYQ0t4L0RHVkR4dHZ5Nkk1VHNEakZ3Y0J4Nk9GODZuRyt4cE1wVm5tbXB3YVZxTHdOdHAwVXY2NTdJb1hkREtXTzE3dk9pMmdMdkFDR2xFWFVPUXpTUm9mTG1ySXdZbFNja3FRa0RlYURqbzdzdlI2UUx1WGJiKzViUWY2dnZGbFloUDJ6RjhFTGF4M1BySnJ4cHF0YjUvbmRyWWpjTkVLN3ppd3RxL0dJPQ.T2lYQ0t4L0RHVkR4dHZ5Nkk1VHNEakZ3Y0J4Nk9GODZuRyt4cE1wVm5tbFlVcU92YUJTZWlHU3pER1kySnlXRTF4alNUS0ZWcUlVS0NhelhqaXdnWTRncklVSWVvZlFZMWNyUjVxYUFxMWFxcStUL1IzdGpHRTJqdS9Zakw2UGQ5aW9wQzVobTNxaW1QTGk1SGlBcldRaTlMcFdZTTV5eHZBWnBGRlM4eXVKL3hNQ09IWlFLZTQ5VEtvRUVEK2tyVTJ3TnFiYU9ORDJKRXJ3RCsrajNvbkY2KzNEMThVTlJaYVRVMTNRTzdyTFFXV3lsU3o3Y01HdHdtVzVPZGwzV3BHK2MxRFVIU0NHT1l5bzlyRDhLYWJ4SmlCcGxuWkZHck9LSXR0N1JtVytsTkh5MkVqUkMxTXJMcHh1bVcwc0o3TzZreDVLZmsvUzE2R1hTM1cwSnBYU2ZCTWkxWWhCbUo0cDNzK2xuZytURmtCajYraWFZYVVlNjU1alVOSFRKL0hNNWtCWTloY1REZzI4RHFocVl6OXpibXpqTXh0aEtGNnAza0N0a2ZCSitteXc4THhtd2dqNG8zWWhmUU45VUNaVXo2TzN1VkU3UU51YkdrWDZPdkl4T3g3M0tqSHJXeVRtaHh6M0ZSMzlGOEZpVEpLZFV6WENFL2JEb2wxSlBWVW5rRWJzR0RUeUZxdUV6VFJHMGN3PT0.R29CzBWle61aQZI0dq1POju9f4beaSMffo1CXVwOGJI'
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
			user: "pruebas_ut@sw.com.mx",
			password: "swpass",
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
			user: "pruebas_ut@sw.com.mx",
			password: "swpass",
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
			token: 'T2lYQ0t4L0RHVkR4dHZ5Nkk1VHNEakZ3Y0J4Nk9GODZuRyt4cE1wVm5tbXB3YVZxTHdOdHAwVXY2NTdJb1hkREtXTzE3dk9pMmdMdkFDR2xFWFVPUXpTUm9mTG1ySXdZbFNja3FRa0RlYURqbzdzdlI2UUx1WGJiKzViUWY2dnZGbFloUDJ6RjhFTGF4M1BySnJ4cHF0YjUvbmRyWWpjTkVLN3ppd3RxL0dJPQ.T2lYQ0t4L0RHVkR4dHZ5Nkk1VHNEakZ3Y0J4Nk9GODZuRyt4cE1wVm5tbFlVcU92YUJTZWlHU3pER1kySnlXRTF4alNUS0ZWcUlVS0NhelhqaXdnWTRncklVSWVvZlFZMWNyUjVxYUFxMWFxcStUL1IzdGpHRTJqdS9Zakw2UGQ5aW9wQzVobTNxaW1QTGk1SGlBcldRaTlMcFdZTTV5eHZBWnBGRlM4eXVKL3hNQ09IWlFLZTQ5VEtvRUVEK2tyVTJ3TnFiYU9ORDJKRXJ3RCsrajNvbkY2KzNEMThVTlJaYVRVMTNRTzdyTFFXV3lsU3o3Y01HdHdtVzVPZGwzV3BHK2MxRFVIU0NHT1l5bzlyRDhLYWJ4SmlCcGxuWkZHck9LSXR0N1JtVytsTkh5MkVqUkMxTXJMcHh1bVcwc0o3TzZreDVLZmsvUzE2R1hTM1cwSnBYU2ZCTWkxWWhCbUo0cDNzK2xuZytURmtCajYraWFZYVVlNjU1alVOSFRKL0hNNWtCWTloY1REZzI4RHFocVl6OXpibXpqTXh0aEtGNnAza0N0a2ZCSitteXc4THhtd2dqNG8zWWhmUU45VUNaVXo2TzN1VkU3UU51YkdrWDZPdkl4T3g3M0tqSHJXeVRtaHh6M0ZSMzlGOEZpVEpLZFV6WENFL2JEb2wxSlBWVW5rRWJzR0RUeUZxdUV6VFJHMGN3PT0.R29CzBWle61aQZI0dq1POju9f4beaSMffo1CXVwOGJI'
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
			user: "pruebas_ut@sw.com.mx",
			password: "swpass",
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
			user: "pruebas_ut@sw.com.mx",
			password: "swpass",
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
			user: "pruebas_ut@sw.com.mx",
			password: "swpass",
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
			token: 'T2lYQ0t4L0RHVkR4dHZ5Nkk1VHNEakZ3Y0J4Nk9GODZuRyt4cE1wVm5tbXB3YVZxTHdOdHAwVXY2NTdJb1hkREtXTzE3dk9pMmdMdkFDR2xFWFVPUXpTUm9mTG1ySXdZbFNja3FRa0RlYURqbzdzdlI2UUx1WGJiKzViUWY2dnZGbFloUDJ6RjhFTGF4M1BySnJ4cHF0YjUvbmRyWWpjTkVLN3ppd3RxL0dJPQ.T2lYQ0t4L0RHVkR4dHZ5Nkk1VHNEakZ3Y0J4Nk9GODZuRyt4cE1wVm5tbFlVcU92YUJTZWlHU3pER1kySnlXRTF4alNUS0ZWcUlVS0NhelhqaXdnWTRncklVSWVvZlFZMWNyUjVxYUFxMWFxcStUL1IzdGpHRTJqdS9Zakw2UGQ5aW9wQzVobTNxaW1QTGk1SGlBcldRaTlMcFdZTTV5eHZBWnBGRlM4eXVKL3hNQ09IWlFLZTQ5VEtvRUVEK2tyVTJ3TnFiYU9ORDJKRXJ3RCsrajNvbkY2KzNEMThVTlJaYVRVMTNRTzdyTFFXV3lsU3o3Y01HdHdtVzVPZGwzV3BHK2MxRFVIU0NHT1l5bzlyRDhLYWJ4SmlCcGxuWkZHck9LSXR0N1JtVytsTkh5MkVqUkMxTXJMcHh1bVcwc0o3TzZreDVLZmsvUzE2R1hTM1cwSnBYU2ZCTWkxWWhCbUo0cDNzK2xuZytURmtCajYraWFZYVVlNjU1alVOSFRKL0hNNWtCWTloY1REZzI4RHFocVl6OXpibXpqTXh0aEtGNnAza0N0a2ZCSitteXc4THhtd2dqNG8zWWhmUU45VUNaVXo2TzN1VkU3UU51YkdrWDZPdkl4T3g3M0tqSHJXeVRtaHh6M0ZSMzlGOEZpVEpLZFV6WENFL2JEb2wxSlBWVW5rRWJzR0RUeUZxdUV6VFJHMGN3PT0.R29CzBWle61aQZI0dq1POju9f4beaSMffo1CXVwOGJI'
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
			token: 'T2lYQ0t4L0RHVkR4dHZ5Nkk1VHNEakZ3Y0J4Nk9GODZuRyt4cE1wVm5tbXB3YVZxTHdOdHAwVXY2NTdJb1hkREtXTzE3dk9pMmdMdkFDR2xFWFVPUXpTUm9mTG1ySXdZbFNja3FRa0RlYURqbzdzdlI2UUx1WGJiKzViUWY2dnZGbFloUDJ6RjhFTGF4M1BySnJ4cHF0YjUvbmRyWWpjTkVLN3ppd3RxL0dJPQ.T2lYQ0t4L0RHVkR4dHZ5Nkk1VHNEakZ3Y0J4Nk9GODZuRyt4cE1wVm5tbFlVcU92YUJTZWlHU3pER1kySnlXRTF4alNUS0ZWcUlVS0NhelhqaXdnWTRncklVSWVvZlFZMWNyUjVxYUFxMWFxcStUL1IzdGpHRTJqdS9Zakw2UGQ5aW9wQzVobTNxaW1QTGk1SGlBcldRaTlMcFdZTTV5eHZBWnBGRlM4eXVKL3hNQ09IWlFLZTQ5VEtvRUVEK2tyVTJ3TnFiYU9ORDJKRXJ3RCsrajNvbkY2KzNEMThVTlJaYVRVMTNRTzdyTFFXV3lsU3o3Y01HdHdtVzVPZGwzV3BHK2MxRFVIU0NHT1l5bzlyRDhLYWJ4SmlCcGxuWkZHck9LSXR0N1JtVytsTkh5MkVqUkMxTXJMcHh1bVcwc0o3TzZreDVLZmsvUzE2R1hTM1cwSnBYU2ZCTWkxWWhCbUo0cDNzK2xuZytURmtCajYraWFZYVVlNjU1alVOSFRKL0hNNWtCWTloY1REZzI4RHFocVl6OXpibXpqTXh0aEtGNnAza0N0a2ZCSitteXc4THhtd2dqNG8zWWhmUU45VUNaVXo2TzN1VkU3UU51YkdrWDZPdkl4T3g3M0tqSHJXeVRtaHh6M0ZSMzlGOEZpVEpLZFV6WENFL2JEb2wxSlBWVW5rRWJzR0RUeUZxdUV6VFJHMGN3PT0.R29CzBWle61aQZI0dq1POju9f4beaSMffo1CXVwOGJI'
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
			user: "pruebas_ut@sw.com.mx",
			password: "swpass",
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
			user: "pruebas_ut@sw.com.mx",
			password: "swpass",
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
			token: 'T2lYQ0t4L0RHVkR4dHZ5Nkk1VHNEakZ3Y0J4Nk9GODZuRyt4cE1wVm5tbXB3YVZxTHdOdHAwVXY2NTdJb1hkREtXTzE3dk9pMmdMdkFDR2xFWFVPUXpTUm9mTG1ySXdZbFNja3FRa0RlYURqbzdzdlI2UUx1WGJiKzViUWY2dnZGbFloUDJ6RjhFTGF4M1BySnJ4cHF0YjUvbmRyWWpjTkVLN3ppd3RxL0dJPQ.T2lYQ0t4L0RHVkR4dHZ5Nkk1VHNEakZ3Y0J4Nk9GODZuRyt4cE1wVm5tbFlVcU92YUJTZWlHU3pER1kySnlXRTF4alNUS0ZWcUlVS0NhelhqaXdnWTRncklVSWVvZlFZMWNyUjVxYUFxMWFxcStUL1IzdGpHRTJqdS9Zakw2UGQ5aW9wQzVobTNxaW1QTGk1SGlBcldRaTlMcFdZTTV5eHZBWnBGRlM4eXVKL3hNQ09IWlFLZTQ5VEtvRUVEK2tyVTJ3TnFiYU9ORDJKRXJ3RCsrajNvbkY2KzNEMThVTlJaYVRVMTNRTzdyTFFXV3lsU3o3Y01HdHdtVzVPZGwzV3BHK2MxRFVIU0NHT1l5bzlyRDhLYWJ4SmlCcGxuWkZHck9LSXR0N1JtVytsTkh5MkVqUkMxTXJMcHh1bVcwc0o3TzZreDVLZmsvUzE2R1hTM1cwSnBYU2ZCTWkxWWhCbUo0cDNzK2xuZytURmtCajYraWFZYVVlNjU1alVOSFRKL0hNNWtCWTloY1REZzI4RHFocVl6OXpibXpqTXh0aEtGNnAza0N0a2ZCSitteXc4THhtd2dqNG8zWWhmUU45VUNaVXo2TzN1VkU3UU51YkdrWDZPdkl4T3g3M0tqSHJXeVRtaHh6M0ZSMzlGOEZpVEpLZFV6WENFL2JEb2wxSlBWVW5rRWJzR0RUeUZxdUV6VFJHMGN3PT0.R29CzBWle61aQZI0dq1POju9f4beaSMffo1CXVwOGJI'
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
			token: 'T2lYQ0t4L0RHVkR4dHZ5Nkk1VHNEakZ3Y0J4Nk9GODZuRyt4cE1wVm5tbXB3YVZxTHdOdHAwVXY2NTdJb1hkREtXTzE3dk9pMmdMdkFDR2xFWFVPUXpTUm9mTG1ySXdZbFNja3FRa0RlYURqbzdzdlI2UUx1WGJiKzViUWY2dnZGbFloUDJ6RjhFTGF4M1BySnJ4cHF0YjUvbmRyWWpjTkVLN3ppd3RxL0dJPQ.T2lYQ0t4L0RHVkR4dHZ5Nkk1VHNEakZ3Y0J4Nk9GODZuRyt4cE1wVm5tbFlVcU92YUJTZWlHU3pER1kySnlXRTF4alNUS0ZWcUlVS0NhelhqaXdnWTRncklVSWVvZlFZMWNyUjVxYUFxMWFxcStUL1IzdGpHRTJqdS9Zakw2UGQ5aW9wQzVobTNxaW1QTGk1SGlBcldRaTlMcFdZTTV5eHZBWnBGRlM4eXVKL3hNQ09IWlFLZTQ5VEtvRUVEK2tyVTJ3TnFiYU9ORDJKRXJ3RCsrajNvbkY2KzNEMThVTlJaYVRVMTNRTzdyTFFXV3lsU3o3Y01HdHdtVzVPZGwzV3BHK2MxRFVIU0NHT1l5bzlyRDhLYWJ4SmlCcGxuWkZHck9LSXR0N1JtVytsTkh5MkVqUkMxTXJMcHh1bVcwc0o3TzZreDVLZmsvUzE2R1hTM1cwSnBYU2ZCTWkxWWhCbUo0cDNzK2xuZytURmtCajYraWFZYVVlNjU1alVOSFRKL0hNNWtCWTloY1REZzI4RHFocVl6OXpibXpqTXh0aEtGNnAza0N0a2ZCSitteXc4THhtd2dqNG8zWWhmUU45VUNaVXo2TzN1VkU3UU51YkdrWDZPdkl4T3g3M0tqSHJXeVRtaHh6M0ZSMzlGOEZpVEpLZFV6WENFL2JEb2wxSlBWVW5rRWJzR0RUeUZxdUV6VFJHMGN3PT0.R29CzBWle61aQZI0dq1POju9f4beaSMffo1CXVwOGJI'
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
