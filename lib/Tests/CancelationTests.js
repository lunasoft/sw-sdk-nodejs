var chai = require('chai');
var assert = chai.assert;
var CancelationService = require('../SWServices/Cancelation/CancelationService');

var expectedResult = 'success'

describe('CancelationService.js', function(){

	describe('CancelationService by UUID', function() {
		this.timeout(15000);
		var result = 'error';
		var errorMsg = '';

		var params = {
		    url: 'http://services.test.sw.com.mx',  
			token: 'T2lYQ0t4L0RHVkR4dHZ5Nkk1VHNEakZ3Y0J4Nk9GODZuRyt4cE1wVm5tbXB3YVZxTHdOdHAwVXY2NTdJb1hkREtXTzE3dk9pMmdMdkFDR2xFWFVPUXpTUm9mTG1ySXdZbFNja3FRa0RlYURqbzdzdlI2UUx1WGJiKzViUWY2dnZGbFloUDJ6RjhFTGF4M1BySnJ4cHF0YjUvbmRyWWpjTkVLN3ppd3RxL0dJPQ.T2lYQ0t4L0RHVkR4dHZ5Nkk1VHNEakZ3Y0J4Nk9GODZuRyt4cE1wVm5tbFlVcU92YUJTZWlHU3pER1kySnlXRTF4alNUS0ZWcUlVS0NhelhqaXdnWTRncklVSWVvZlFZMWNyUjVxYUFxMWFxcStUL1IzdGpHRTJqdS9Zakw2UGQ5aW9wQzVobTNxaW1QTGk1SGlBcldRaTlMcFdZTTV5eHZBWnBGRlM4eXVKL3hNQ09IWlFLZTQ5VEtvRUVEK2tyVTJ3TnFiYU9ORDJKRXJ3RCsrajNvbkY2KzNEMThVTlJaYVRVMTNRTzdyTFFXV3lsU3o3Y01HdHdtVzVPZGwzV3BHK2MxRFVIU0NHT1l5bzlyRDhLYWJ4SmlCcGxuWkZHck9LSXR0N1JtVytsTkh5MkVqUkMxTXJMcHh1bVcwc0o3TzZreDVLZmsvUzE2R1hTM1cwSnBYU2ZCTWkxWWhCbUo0cDNzK2xuZytURmtCajYraWFZYVVlNjU1alVOSFRKL0hNNWtCWTloY1REZzI4RHFocVl6OXpibXpqTXh0aEtGNnAza0N0a2ZCSitteXc4THhtd2dqNG8zWWhmUU45VUNaVXo2TzN1VkU3UU51YkdrWDZPdkl4T3g3M0tqSHJXeVRtaHh6M0ZSMzlGOEZpVEpLZFV6WENFL2JEb2wxSlBWVW5rRWJzR0RUeUZxdUV6VFJHMGN3PT0.R29CzBWle61aQZI0dq1POju9f4beaSMffo1CXVwOGJI',
		    rfc: 'EKU9003173C9',
			uuid: '2cd3155c-b7e8-4415-ad1d-b29eafe16c53',
		    motivo: '02',
			folioSustitucion: null
		};

	  	beforeEach(function(done){ 
	  		var callback = (error, data) => {
	  			if(error) {
	  				result = error.status;
	  				errorMsg = error.message;
	  			} else {
	  				result = data.status;
	  			}
			 	done();
			};

			var cancelation = CancelationService.Set(params);
			cancelation.CancelationByUUID(callback);
	  	});
		
		it('Success si se ha hecho la cancelación por UUID', function() {
			
			assert.equal(result, expectedResult, errorMsg);
			
		});
	});

	describe('CancelationService by CSD', function() {
		this.timeout(15000);
		var result = 'error';
		var errorMsg = '';

		var params = {
		    url: 'http://services.test.sw.com.mx',  
			token: 'T2lYQ0t4L0RHVkR4dHZ5Nkk1VHNEakZ3Y0J4Nk9GODZuRyt4cE1wVm5tbXB3YVZxTHdOdHAwVXY2NTdJb1hkREtXTzE3dk9pMmdMdkFDR2xFWFVPUXpTUm9mTG1ySXdZbFNja3FRa0RlYURqbzdzdlI2UUx1WGJiKzViUWY2dnZGbFloUDJ6RjhFTGF4M1BySnJ4cHF0YjUvbmRyWWpjTkVLN3ppd3RxL0dJPQ.T2lYQ0t4L0RHVkR4dHZ5Nkk1VHNEakZ3Y0J4Nk9GODZuRyt4cE1wVm5tbFlVcU92YUJTZWlHU3pER1kySnlXRTF4alNUS0ZWcUlVS0NhelhqaXdnWTRncklVSWVvZlFZMWNyUjVxYUFxMWFxcStUL1IzdGpHRTJqdS9Zakw2UGRiMTFPRlV3a2kyOWI5WUZHWk85ODJtU0M2UlJEUkFTVXhYTDNKZVdhOXIySE1tUVlFdm1jN3kvRStBQlpLRi9NeWJrd0R3clhpYWJrVUMwV0Mwd3FhUXdpUFF5NW5PN3J5cklMb0FETHlxVFRtRW16UW5ZVjAwUjdCa2g0Yk1iTExCeXJkVDRhMGMxOUZ1YWlIUWRRVC8yalFTNUczZXdvWlF0cSt2UW0waFZKY2gyaW5jeElydXN3clNPUDNvU1J2dm9weHBTSlZYNU9aaGsvalpQMUxrUndzK0dHS2dpTittY1JmR3o2M3NqNkh4MW9KVXMvUHhZYzVLQS9UK2E1SVhEZFJKYWx4ZmlEWDFuSXlqc2ZRYXlUQk1ldlZkU2tEdU10NFVMdHZKUURLblBxakw0SDl5bUxabDFLNmNPbEp6b3Jtd2Q1V2htRHlTdDZ6eTFRdUNnYnVvK2tuVUdhMmwrVWRCZi9rQkU9.7k2gVCGSZKLzJK5Ky3Nr5tKxvGSJhL13Q8W-YhT0uIo',
		    uuid: '057754fa-28f2-4d06-8963-0426d99ec688',
		    password: '12345678a',
		    rfc: 'CACX7605101P8',
		    b64Cer: 'MIIFijCCA3KgAwIBAgIUMzAwMDEwMDAwMDA0MDAwMDIzMzUwDQYJKoZIhvcNAQELBQAwggErMQ8wDQYDVQQDDAZBQyBVQVQxLjAsBgNVBAoMJVNFUlZJQ0lPIERFIEFETUlOSVNUUkFDSU9OIFRSSUJVVEFSSUExGjAYBgNVBAsMEVNBVC1JRVMgQXV0aG9yaXR5MSgwJgYJKoZIhvcNAQkBFhlvc2Nhci5tYXJ0aW5lekBzYXQuZ29iLm14MR0wGwYDVQQJDBQzcmEgY2VycmFkYSBkZSBjYWRpejEOMAwGA1UEEQwFMDYzNzAxCzAJBgNVBAYTAk1YMRkwFwYDVQQIDBBDSVVEQUQgREUgTUVYSUNPMREwDwYDVQQHDAhDT1lPQUNBTjERMA8GA1UELRMIMi41LjQuNDUxJTAjBgkqhkiG9w0BCQITFnJlc3BvbnNhYmxlOiBBQ0RNQS1TQVQwHhcNMTkwNTI5MTk1MDAxWhcNMjMwNTI5MTk1MDAxWjCBsTEdMBsGA1UEAxMUWE9DSElMVCBDQVNBUyBDSEFWRVoxHTAbBgNVBCkTFFhPQ0hJTFQgQ0FTQVMgQ0hBVkVaMR0wGwYDVQQKExRYT0NISUxUIENBU0FTIENIQVZFWjEWMBQGA1UELRMNQ0FDWDc2MDUxMDFQODEbMBkGA1UEBRMSQ0FDWDc2MDUxME1HVFNIQzA0MR0wGwYDVQQLExRYT0NISUxUIENBU0FTIENIQVZFWjCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAKvYaTyUuvtUIwymg88xS3Ri7W2J758lusEgwUaxdyIyxLQK2736yrK6RotjDu7pfbzqD5CyJ6gkT70x29QNe5MHUgcNPnARoYK2+0a0kWjpweNqjb0pCOMevUCzblF72c7MkErbW5qolIRIsI4UFSZOlLDI9O9lKm0Tk85Ab0siaqUefGl9lOOkjPT7Pr/CkHk4jxZJOzY2cWVey00vgFh/t9xxbF6Rvi738dfZ9R9h2TVEpaRRYb+m4rpTMos6HEfmhuKSsNe2/M8NDxC4zkcwdC5WS9NhNd4kUQ+7TFLmIo14tOXXSBZVVsg49/L+lq/eh44K1Ze3iSW9M7Ii8mECAwEAAaMdMBswDAYDVR0TAQH/BAIwADALBgNVHQ8EBAMCBsAwDQYJKoZIhvcNAQELBQADggIBAK1bJ6vhkqIF0Y4XnDUFQ/nZUOsQCXbs+czwu62kVaOffHWcKhJ1mTaSwkmFoqykV3VAib7RYKYTXcERow21uGEfnOhNxeSi4l2An7y6PtJOGy4wTjAX++iAeoh+ZDel3VBhvNYv6IZAcsVqdTl0Mfs/E7EuCc6YqumEBTbFTMcp92A31HWHqkI+UnXcogYndsaIK2m+iER6AHhUokfOjOiSJmSEovaXmaJVkmjbv3g07FeMB2fZ8fp3rrRtHjgTzbZyPY2LjhBnV/0vaTnGZH4l1RWZ+dgFn5/09GJJYLgaTBHpuRNBI6JRQ9/iR4NMjOEbNXDIpKibnIg3zG1yqQtUwQBUic0lF958n1KOg7fM+Msgq9Fjg2FY3aI2DAoGWKJR8PTiFbXy+Arpzd669QWzgIusT7KLwlFhKm+a+9dmE2lp0WUj2QH0drJdfSuvqA9ZIu3I0yvnpUT0jlun0PZyoloTOd5X+8z2kLSAxbZaOu9I4XATcwZntZK0FIueh4Htom524ne/MNp6nEXzpxV4HPiW626VoykB4AHJwIp7ljcg8D4IJ7oIF/0UEduwbsx3amAfDeg/9YtPRC4j5M0h3l7zLcJ2/BFwr8qYM74d0v00Hm4msirCPkE+kr58oL1NjwN7vvPA96HbSeBohH+f/X8FcZ965FhmjmZWgj0W',
		    b64Key: 'MIIFDjBABgkqhkiG9w0BBQ0wMzAbBgkqhkiG9w0BBQwwDgQIAgEAAoIBAQACAggAMBQGCCqGSIb3DQMHBAgwggS8AgEAMASCBMh4EHl7aNSCaMDA1VlRoXCZ5UUmqErAbucRFLOMmsAaFA8WvOTkQ/E7oO8wZdxRpPywvFoemdb29Hy6I+EJyXlC/Wk2hxzmd+cGRuCU+6iKvwlXMoZERBgK2IjNHlFB1hRmvVRlrp6Xbe8TKwacEAY8phOLdpX0vOrC5GC50arjAq3N0HMxygrz//M4p/TCm59ATVaetJ4GnM3Ri8TrCPGR0Lhi/TAjxNG326FXF+NkAegS16PF/Xmeo8BlqEjCUHqzGs1CQJ799cmALb46oA+gjpYnymiWIJA6zYT6dIqmjYI9ENUI3h/Fu3NxtXi2BQUU8/iwy++xrlkKSKWwnqtQyuARDiUCiKOCeZ7r1xnd7SykU9Muv/gLplDF5vCkkbRSjFOM5NMpu9gYsNwq6u8sJn2QBXnzZYAEfEEGkGGhXNV26BJANu3HNTsCyxo+RyrLIRYyvdtmw5fk+6cFMn3ce2ipN7k6rpzhY/8DkEhnPIMVppN/TTxUmc4Zh7k807DFVoqEKtfBeOrrYk+DeAUqFykJgD0BTv7SmLjXmPkhqoNnrBG7ntrOnB+M8Z1x/Qdu2N//A0QP+TPM7nbAgNN46jtzzjhDtbP/vY3kGehiWieYpaVQO2vb4oJWuAN/y+DPcDnVr5k63ri/BCaGRyX0YpaCa9/TbsxWGPdEoorzU+Ss6A/X/pqttx1UiWrvXi8hmVEBaADpUBf4Sgbam9lcqyh/ojccIzXgok2llu9rKVZhYQgxzcQ6g/sQxIRzXyz5rtwdPg3R49EHMOZ9bCDagL3dcnsIH2BEG0XP8FFfqv4Nk4QsLMlVbRCi3rK1Ye8s21qwpwO02lH4ARz/VkzuQDTffYzUiVl1I2IB0JLVJeMIKxYSkEO+NyxzRIMR8ALPG6eNBhEJefwuTIkHKqmOFIHi9M2oZTcFp0jwn+h267HUL/F91xhWYF5EL3lNPZO0eic3TTw/eYFPA5kfHZUNj34GAirE5q5SKW0XijzlrLnobx4LpDjuxd1hfy313hTcLb/cy3x5ZkkXqjNX9xyJ+AH/tkgZLve20tP872Le7lxOzIyqMQ8t5eD0h47wiuV2DBZovhY6EbUO892DDD63NxnxGiVzqYxGkR71nu5tOWPvj1rMnXwuGPxzKRyLcLapYzr/CJ9k/XMLzFamxc0ZJnhQjRUszW1LF5Nxoi2I/9hlvSGywSDd0LtpoQRUqd4yOm01yrv4EGVfjRrP0PandT2zFS4BoZfXWpLNCuxIEYFPivPKXQHb58oawqw/7EErgTQL0dcyOqGA/cH8rs7G+5oJqg/Snu/50dYxqfoSC3DETKZUtVk86uIcVompgjK831X3Sq+sAgwO0/3LSoocQIA5p02ROECPhZrMvYcHWJZTTlrKDiXcTJKUtpG5iQInpfFYlBSe3UQyanyuwMwbEW0yn+YBk/EX8XTVPh+uSp2LZnF4dKKMfmXP/0uXAGlj9Ta2NAr78+PJgUAWCWJW6dAUsOH0denS4GIMNtDEOuUofYshzr2253XBWBrEq8KqSvWYQWyWyLCyLEkJam2oDGDWQCRLRqkxjJMy9qDJ2J0yuM1XJdRp1dpv/cKagxRlR9qbeEX8RIvDpGKJF8/Bg98hVs6A870=',
			motivo: '02',
			folioSustitucion: null
		};

	  	beforeEach(function(done){ 
	  		var callback = (error, data) => {
	  			if(error) {
	  				result = error.status;
	  				errorMsg = error.message;
	  			} else {
	  				result = data.status;
	  			}
			 	done();
			};
			var cancelation = CancelationService.Set(params);
			cancelation.CancelationByCSD(callback);
	  	});

		it('Success si se ha hecho la cancelación con los CSD', function() {
			assert.equal(result, expectedResult, errorMsg);
		});
	});

	describe('CancelationService by PFX', function() {
		this.timeout(15000);
		var result = 'error';
		var errorMsg = '';

		var params = {
		    url: 'http://services.test.sw.com.mx',  
			token: 'T2lYQ0t4L0RHVkR4dHZ5Nkk1VHNEakZ3Y0J4Nk9GODZuRyt4cE1wVm5tbXB3YVZxTHdOdHAwVXY2NTdJb1hkREtXTzE3dk9pMmdMdkFDR2xFWFVPUXpTUm9mTG1ySXdZbFNja3FRa0RlYURqbzdzdlI2UUx1WGJiKzViUWY2dnZGbFloUDJ6RjhFTGF4M1BySnJ4cHF0YjUvbmRyWWpjTkVLN3ppd3RxL0dJPQ.T2lYQ0t4L0RHVkR4dHZ5Nkk1VHNEakZ3Y0J4Nk9GODZuRyt4cE1wVm5tbFlVcU92YUJTZWlHU3pER1kySnlXRTF4alNUS0ZWcUlVS0NhelhqaXdnWTRncklVSWVvZlFZMWNyUjVxYUFxMWFxcStUL1IzdGpHRTJqdS9Zakw2UGRiMTFPRlV3a2kyOWI5WUZHWk85ODJtU0M2UlJEUkFTVXhYTDNKZVdhOXIySE1tUVlFdm1jN3kvRStBQlpLRi9NeWJrd0R3clhpYWJrVUMwV0Mwd3FhUXdpUFF5NW5PN3J5cklMb0FETHlxVFRtRW16UW5ZVjAwUjdCa2g0Yk1iTExCeXJkVDRhMGMxOUZ1YWlIUWRRVC8yalFTNUczZXdvWlF0cSt2UW0waFZKY2gyaW5jeElydXN3clNPUDNvU1J2dm9weHBTSlZYNU9aaGsvalpQMUxrUndzK0dHS2dpTittY1JmR3o2M3NqNkh4MW9KVXMvUHhZYzVLQS9UK2E1SVhEZFJKYWx4ZmlEWDFuSXlqc2ZRYXlUQk1ldlZkU2tEdU10NFVMdHZKUURLblBxakw0SDl5bUxabDFLNmNPbEp6b3Jtd2Q1V2htRHlTdDZ6eTFRdUNnYnVvK2tuVUdhMmwrVWRCZi9rQkU9.7k2gVCGSZKLzJK5Ky3Nr5tKxvGSJhL13Q8W-YhT0uIo',
		    uuid: '15b0cdf5-7cc6-4f6f-815a-5f101402f185',
			password: '12345678a',
		    rfc: 'EKU9003173C9',
			b64Pfx: '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',
			motivo: '02',
			folioSustitucion: null
		};

	  	beforeEach(function(done){ 
	  		var callback = (error, data) => {
	  			if(error) {
	  				result = error.status;
	  				errorMsg = error.message;
	  			} else {
	  				result = data.status;
	  			}
			 	done();
			};
			var cancelation = CancelationService.Set(params);
			cancelation.CancelationByPFX(callback);
	  	});

		it('Success si se ha hecho la cancelación con los CSD', function() {
			assert.equal(result, expectedResult, errorMsg);
		});
	});

	describe('CancelationService by XML', function() {
		this.timeout(15000);
		var result = 'error';
		var errorMsg = '';

		var params = {
			url: 'http://services.test.sw.com.mx',
			token: 'T2lYQ0t4L0RHVkR4dHZ5Nkk1VHNEakZ3Y0J4Nk9GODZuRyt4cE1wVm5tbXB3YVZxTHdOdHAwVXY2NTdJb1hkREtXTzE3dk9pMmdMdkFDR2xFWFVPUXpTUm9mTG1ySXdZbFNja3FRa0RlYURqbzdzdlI2UUx1WGJiKzViUWY2dnZGbFloUDJ6RjhFTGF4M1BySnJ4cHF0YjUvbmRyWWpjTkVLN3ppd3RxL0dJPQ.T2lYQ0t4L0RHVkR4dHZ5Nkk1VHNEakZ3Y0J4Nk9GODZuRyt4cE1wVm5tbFlVcU92YUJTZWlHU3pER1kySnlXRTF4alNUS0ZWcUlVS0NhelhqaXdnWTRncklVSWVvZlFZMWNyUjVxYUFxMWFxcStUL1IzdGpHRTJqdS9Zakw2UGQ5aW9wQzVobTNxaW1QTGk1SGlBcldRaTlMcFdZTTV5eHZBWnBGRlM4eXVKL3hNQ09IWlFLZTQ5VEtvRUVEK2tyVTJ3TnFiYU9ORDJKRXJ3RCsrajNvbkY2KzNEMThVTlJaYVRVMTNRTzdyTFFXV3lsU3o3Y01HdHdtVzVPZGwzV3BHK2MxRFVIU0NHT1l5bzlyRDhLYWJ4SmlCcGxuWkZHck9LSXR0N1JtVytsTkh5MkVqUkMxTXJMcHh1bVcwc0o3TzZreDVLZmsvUzE2R1hTM1cwSnBYU2ZCTWkxWWhCbUo0cDNzK2xuZytURmtCajYraWFZYVVlNjU1alVOSFRKL0hNNWtCWTloY1REZzI4RHFocVl6OXpibXpqTXh0aEtGNnAza0N0a2ZCSitteXc4THhtd2dqNG8zWWhmUU45VUNaVXo2TzN1VkU3UU51YkdrWDZPdkl4T3g3M0tqSHJXeVRtaHh6M0ZSMzlGOEZpVEpLZFV6WENFL2JEb2wxSlBWVW5rRWJzR0RUeUZxdUV6VFJHMGN3PT0.R29CzBWle61aQZI0dq1POju9f4beaSMffo1CXVwOGJI',
			xml: '<Cancelacion xmlns="http://cancelacfd.sat.gob.mx" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" Fecha="2021-12-26T18:15:28" RfcEmisor="EKU9003173C9"><Folios><Folio UUID="fe4e71b0-8959-4fb9-8091-f5ac4fb0fef8" Motivo="02" FolioSustitucion=""/></Folios><Signature xmlns="http://www.w3.org/2000/09/xmldsig#"><SignedInfo><CanonicalizationMethod Algorithm="http://www.w3.org/TR/2001/REC-xml-c14n-20010315" /> <SignatureMethod Algorithm="http://www.w3.org/2000/09/xmldsig#rsa-sha1" /> <Reference URI=""> <Transforms> <Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature" /> </Transforms> <DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1" /> <DigestValue>XEdUtCptjdlz9DsYAP7nnU6MytU=</DigestValue> </Reference> </SignedInfo> <SignatureValue>ZnWh91e5tUc4/t1ZWnb3yOgB8zuCXNPioND+rv6aLOEwIw26/8sYYb+GT4wgyqlc09wOs32XTUwWoGQwtWMG8Euqq+4xJyobWvPCsX6CiURvD/Pd33xgkH92A0AGQxEMYGVT7wK+GFS2gDTYEYAXvZqzCe6+rXnlQvHML0TOOmhVu/wc8YrCbGt4z/F5sRxhjpa0eqwFEq4RmB4nkWjcD3Pnudn3XAI5NHIiOd8KVGVcDR+LvYvKj7h+18WxZgujpggYjbFN79i1jEsAEPDfgryUdTvjDw+KC7Mg+/ge6pssH42buEMIwVE4VX9Y3NtWSGTwdIK/8pxXk+Y5wyR6Gg==</SignatureValue> <KeyInfo> <X509Data> <X509IssuerSerial> <X509IssuerName>OID.1.2.840.113549.1.9.2=responsable: ACDMA-SAT, OID.2.5.4.45=2.5.4.45, L=COYOACAN, S=CIUDAD DE MEXICO, C=MX, PostalCode=06370, STREET=3ra cerrada de cadiz, E=oscar.martinez@sat.gob.mx, OU=SAT-IES Authority, O=SERVICIO DE ADMINISTRACION TRIBUTARIA, CN=AC UAT</X509IssuerName> <X509SerialNumber>292233162870206001759766198444326234574038512436</X509SerialNumber> </X509IssuerSerial> <X509Certificate>MIIFuzCCA6OgAwIBAgIUMzAwMDEwMDAwMDA0MDAwMDI0MzQwDQYJKoZIhvcNAQELBQAwggErMQ8wDQYDVQQDDAZBQyBVQVQxLjAsBgNVBAoMJVNFUlZJQ0lPIERFIEFETUlOSVNUUkFDSU9OIFRSSUJVVEFSSUExGjAYBgNVBAsMEVNBVC1JRVMgQXV0aG9yaXR5MSgwJgYJKoZIhvcNAQkBFhlvc2Nhci5tYXJ0aW5lekBzYXQuZ29iLm14MR0wGwYDVQQJDBQzcmEgY2VycmFkYSBkZSBjYWRpejEOMAwGA1UEEQwFMDYzNzAxCzAJBgNVBAYTAk1YMRkwFwYDVQQIDBBDSVVEQUQgREUgTUVYSUNPMREwDwYDVQQHDAhDT1lPQUNBTjERMA8GA1UELRMIMi41LjQuNDUxJTAjBgkqhkiG9w0BCQITFnJlc3BvbnNhYmxlOiBBQ0RNQS1TQVQwHhcNMTkwNjE3MTk0NDE0WhcNMjMwNjE3MTk0NDE0WjCB4jEnMCUGA1UEAxMeRVNDVUVMQSBLRU1QRVIgVVJHQVRFIFNBIERFIENWMScwJQYDVQQpEx5FU0NVRUxBIEtFTVBFUiBVUkdBVEUgU0EgREUgQ1YxJzAlBgNVBAoTHkVTQ1VFTEEgS0VNUEVSIFVSR0FURSBTQSBERSBDVjElMCMGA1UELRMcRUtVOTAwMzE3M0M5IC8gWElRQjg5MTExNlFFNDEeMBwGA1UEBRMVIC8gWElRQjg5MTExNk1HUk1aUjA1MR4wHAYDVQQLExVFc2N1ZWxhIEtlbXBlciBVcmdhdGUwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCN0peKpgfOL75iYRv1fqq+oVYsLPVUR/GibYmGKc9InHFy5lYF6OTYjnIIvmkOdRobbGlCUxORX/tLsl8Ya9gm6Yo7hHnODRBIDup3GISFzB/96R9K/MzYQOcscMIoBDARaycnLvy7FlMvO7/rlVnsSARxZRO8Kz8Zkksj2zpeYpjZIya/369+oGqQk1cTRkHo59JvJ4Tfbk/3iIyf4H/Ini9nBe9cYWo0MnKob7DDt/vsdi5tA8mMtA953LapNyCZIDCRQQlUGNgDqY9/8F5mUvVgkcczsIgGdvf9vMQPSf3jjCiKj7j6ucxl1+FwJWmbvgNmiaUR/0q4m2rm78lFAgMBAAGjHTAbMAwGA1UdEwEB/wQCMAAwCwYDVR0PBAQDAgbAMA0GCSqGSIb3DQEBCwUAA4ICAQBcpj1TjT4jiinIujIdAlFzE6kRwYJCnDG08zSp4kSnShjxADGEXH2chehKMV0FY7c4njA5eDGdA/G2OCTPvF5rpeCZP5Dw504RZkYDl2suRz+wa1sNBVpbnBJEK0fQcN3IftBwsgNFdFhUtCyw3lus1SSJbPxjLHS6FcZZ51YSeIfcNXOAuTqdimusaXq15GrSrCOkM6n2jfj2sMJYM2HXaXJ6rGTEgYmhYdwxWtil6RfZB+fGQ/H9I9WLnl4KTZUS6C9+NLHh4FPDhSk19fpS2S/56aqgFoGAkXAYt9Fy5ECaPcULIfJ1DEbsXKyRdCv3JY89+0MNkOdaDnsemS2o5Gl08zI4iYtt3L40gAZ60NPh31kVLnYNsmvfNxYyKp+AeJtDHyW9w7ftM0Hoi+BuRmcAQSKFV3pk8j51la+jrRBrAUv8blbRcQ5BiZUwJzHFEKIwTsRGoRyEx96sNnB03n6GTwjIGz92SmLdNl95r9rkvp+2m4S6q1lPuXaFg7DGBrXWC8iyqeWE2iobdwIIuXPTMVqQb12m1dAkJVRO5NdHnP/MpqOvOgLqoZBNHGyBg4Gqm4sCJHCxA1c8Elfa2RQTCk0tAzllL4vOnI1GHkGJn65xokGsaU4B4D36xh7eWrfj4/pgWHmtoDAYa8wzSwo2GVCZOs+mtEgOQB91/g==</X509Certificate> </X509Data> </KeyInfo> </Signature> </Cancelacion>'
		};

	  	beforeEach(function(done){ 
	  		var callback = (error, data) => {
	  			if(error) {
	  				result = error.status;
	  				errorMsg = error.message;
	  			} else {
	  				result = data.status;
	  			}
			 	done();
			};

			var cancelation = CancelationService.Set(params);
			cancelation.CancelationByXML(callback);
	  	});

		it('Success si se ha hecho la cancelación con los XML', function() {
			assert.equal(result, expectedResult, errorMsg);
		});
	});
});