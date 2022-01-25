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
					console.log(error);
	  			} else {
	  				result = data.status;
					console.log(data);
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

	describe('CancelationService by XML', function() {
		this.timeout(15000);
		var result = 'error';
		var errorMsg = '';

		var params = {
			url: 'http://services.test.sw.com.mx',
			token: 'T2lYQ0t4L0RHVkR4dHZ5Nkk1VHNEakZ3Y0J4Nk9GODZuRyt4cE1wVm5tbXB3YVZxTHdOdHAwVXY2NTdJb1hkREtXTzE3dk9pMmdMdkFDR2xFWFVPUXpTUm9mTG1ySXdZbFNja3FRa0RlYURqbzdzdlI2UUx1WGJiKzViUWY2dnZGbFloUDJ6RjhFTGF4M1BySnJ4cHF0YjUvbmRyWWpjTkVLN3ppd3RxL0dJPQ.T2lYQ0t4L0RHVkR4dHZ5Nkk1VHNEakZ3Y0J4Nk9GODZuRyt4cE1wVm5tbFlVcU92YUJTZWlHU3pER1kySnlXRTF4alNUS0ZWcUlVS0NhelhqaXdnWTRncklVSWVvZlFZMWNyUjVxYUFxMWFxcStUL1IzdGpHRTJqdS9Zakw2UGRiMTFPRlV3a2kyOWI5WUZHWk85ODJtU0M2UlJEUkFTVXhYTDNKZVdhOXIySE1tUVlFdm1jN3kvRStBQlpLRi9NeWJrd0R3clhpYWJrVUMwV0Mwd3FhUXdpUFF5NW5PN3J5cklMb0FETHlxVFRtRW16UW5ZVjAwUjdCa2g0Yk1iTExCeXJkVDRhMGMxOUZ1YWlIUWRRVC8yalFTNUczZXdvWlF0cSt2UW0waFZKY2gyaW5jeElydXN3clNPUDNvU1J2dm9weHBTSlZYNU9aaGsvalpQMUxrUndzK0dHS2dpTittY1JmR3o2M3NqNkh4MW9KVXMvUHhZYzVLQS9UK2E1SVhEZFJKYWx4ZmlEWDFuSXlqc2ZRYXlUQk1ldlZkU2tEdU10NFVMdHZKUURLblBxakw0SDl5bUxabDFLNmNPbEp6b3Jtd2Q1V2htRHlTdDZ6eTFRdUNnYnVvK2tuVUdhMmwrVWRCZi9rQkU9.7k2gVCGSZKLzJK5Ky3Nr5tKxvGSJhL13Q8W-YhT0uIo',
			xml: '<?xml version="1.0" encoding="utf-8"?><Cancelacion xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" RfcEmisor="LAN7008173R5" Fecha="2017-07-06T17:00:31" xmlns="http://cancelacfd.sat.gob.mx"><Folios><UUID>3eaeabc9-ea41-4627-9609-c6856b78e2b1</UUID></Folios><Signature xmlns="http://www.w3.org/2000/09/xmldsig#"><SignedInfo><CanonicalizationMethod Algorithm="http://www.w3.org/TR/2001/REC-xml-c14n-20010315" /><SignatureMethod Algorithm="http://www.w3.org/2000/09/xmldsig#rsa-sha1" /><Reference URI=""><Transforms><Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature" /></Transforms><DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1" /><DigestValue>rs2ZcFnS9hbfmyJLmR3Mtnklt7g=</DigestValue></Reference></SignedInfo><SignatureValue>O/I7ILsU2y1fqeb2NBZSQKlQC3DpN/bgcDB5LWCMIYp4mFCLmLxEq/6ADz0xVQWUw49BqWDZ1GAI4ODIZLDQtafHSIE7BXKy8huvKD1dtpRLQ/39IfpxXsz1g6Q14mH3LxDOQugk/GhKMWILXZnIipyQosv3IbgLMZ/V/4btK7xrFX/KiOt0PcefChyaerj9A815dA3J4JgpBUNzbOz9VlhvdZMJskrHxzZ5riU1TAuSw/oi68dJfA7S+6XrTmeFDQzYxACHyOzj24RjLi/31+Fc/wiqQXNu9O6oWl8p5+GVoz2xtU4aRqLxVh73L6WAAef/WDeKDMfIge1BtMrxYw==</SignatureValue><KeyInfo><X509Data><X509IssuerSerial><X509IssuerName>OID.1.2.840.113549.1.9.2=Responsable: ACDMA, OID.2.5.4.45=SAT970701NN3, L=Coyoacán, S=Distrito Federal, C=MX, PostalCode=06300, STREET="Av. Hidalgo 77, Col. Guerrero", E=asisnet@pruebas.sat.gob.mx, OU=Administración de Seguridad de la Información, O=Servicio de Administración Tributaria, CN=A.C. 2 de pruebas(4096)</X509IssuerName><X509SerialNumber>3230303031303030303030333030303232383135</X509SerialNumber></X509IssuerSerial><X509Certificate>MIIFxTCCA62gAwIBAgIUMjAwMDEwMDAwMDAzMDAwMjI4MTUwDQYJKoZIhvcNAQELBQAwggFmMSAwHgYDVQQDDBdBLkMuIDIgZGUgcHJ1ZWJhcyg0MDk2KTEvMC0GA1UECgwmU2VydmljaW8gZGUgQWRtaW5pc3RyYWNpw7NuIFRyaWJ1dGFyaWExODA2BgNVBAsML0FkbWluaXN0cmFjacOzbiBkZSBTZWd1cmlkYWQgZGUgbGEgSW5mb3JtYWNpw7NuMSkwJwYJKoZIhvcNAQkBFhphc2lzbmV0QHBydWViYXMuc2F0LmdvYi5teDEmMCQGA1UECQwdQXYuIEhpZGFsZ28gNzcsIENvbC4gR3VlcnJlcm8xDjAMBgNVBBEMBTA2MzAwMQswCQYDVQQGEwJNWDEZMBcGA1UECAwQRGlzdHJpdG8gRmVkZXJhbDESMBAGA1UEBwwJQ295b2Fjw6FuMRUwEwYDVQQtEwxTQVQ5NzA3MDFOTjMxITAfBgkqhkiG9w0BCQIMElJlc3BvbnNhYmxlOiBBQ0RNQTAeFw0xNjEwMjUyMTUyMTFaFw0yMDEwMjUyMTUyMTFaMIGxMRowGAYDVQQDExFDSU5ERU1FWCBTQSBERSBDVjEaMBgGA1UEKRMRQ0lOREVNRVggU0EgREUgQ1YxGjAYBgNVBAoTEUNJTkRFTUVYIFNBIERFIENWMSUwIwYDVQQtExxMQU43MDA4MTczUjUgLyBGVUFCNzcwMTE3QlhBMR4wHAYDVQQFExUgLyBGVUFCNzcwMTE3TURGUk5OMDkxFDASBgNVBAsUC1BydWViYV9DRkRJMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAgvvCiCFDFVaYX7xdVRhp/38ULWto/LKDSZy1yrXKpaqFXqERJWF78YHKf3N5GBoXgzwFPuDX+5kvY5wtYNxx/Owu2shNZqFFh6EKsysQMeP5rz6kE1gFYenaPEUP9zj+h0bL3xR5aqoTsqGF24mKBLoiaK44pXBzGzgsxZishVJVM6XbzNJVonEUNbI25DhgWAd86f2aU3BmOH2K1RZx41dtTT56UsszJls4tPFODr/caWuZEuUvLp1M3nj7Dyu88mhD2f+1fA/g7kzcU/1tcpFXF/rIy93APvkU72jwvkrnprzs+SnG81+/F16ahuGsb2EZ88dKHwqxEkwzhMyTbQIDAQABox0wGzAMBgNVHRMBAf8EAjAAMAsGA1UdDwQEAwIGwDANBgkqhkiG9w0BAQsFAAOCAgEAJ/xkL8I+fpilZP+9aO8n93+20XxVomLJjeSL+Ng2ErL2GgatpLuN5JknFBkZAhxVIgMaTS23zzk1RLtRaYvH83lBH5E+M+kEjFGp14Fne1iV2Pm3vL4jeLmzHgY1Kf5HmeVrrp4PU7WQg16VpyHaJ/eonPNiEBUjcyQ1iFfkzJmnSJvDGtfQK2TiEolDJApYv0OWdm4is9Bsfi9j6lI9/T6MNZ+/LM2L/t72Vau4r7m94JDEzaO3A0wHAtQ97fjBfBiO5M8AEISAV7eZidIl3iaJJHkQbBYiiW2gikreUZKPUX0HmlnIqqQcBJhWKRu6Nqk6aZBTETLLpGrvF9OArV1JSsbdw/ZH+P88RAt5em5/gjwwtFlNHyiKG5w+UFpaZOK3gZP0su0sa6dlPeQ9EL4JlFkGqQCgSQ+NOsXqaOavgoP5VLykLwuGnwIUnuhBTVeDbzpgrg9LuF5dYp/zs+Y9ScJqe5VMAagLSYTShNtN8luV7LvxF9pgWwZdcM7lUwqJmUddCiZqdngg3vzTactMToG16gZA4CWnMgbU4E+r541+FNMpgAZNvs2CiW/eApfaaQojsZEAHDsDv4L5n3M1CC7fYjE/d61aSng1LaO6T1mh+dEfPvLzp7zyzz+UgWMhi5Cs4pcXx1eic5r7uxPoBwcCTt3YI1jKVVnV7/w=</X509Certificate></X509Data></KeyInfo></Signature></Cancelacion>'
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