const StampRequest = require("../Stamp/StampRequest.js");
const helper = require("../Helper/Helper.js");
const { default: axios } = require("axios");
class CancelationRequest {
	//Cancelacion por UUID
	static sendReqUUID(url, token, rfc, uuid, motivo, folioSustitucion, callback) {
		var request = axios.create({
		  baseURL: url,
		  headers: {
			'Content-Type': "application/json",
			'Authorization': 'Bearer ' + token
		  }
		});
		var folio = folioSustitucion == null ? "" : folioSustitucion;
		var path = "/cfdi33/cancel/" + rfc + "/" + uuid + "/" + motivo + "/" + folio;
		request.post(path)
		  .then((res) => {
			callback(null, res.data)
		  }).catch((err) => {
			callback(err.response.data, null);
		  });
	}
	//Cancelacion por CSD
	static sendReqCSD(url, token, cfdiData, callback) {
		var request = axios.create({
			baseURL: url,
			headers: {
				'Content-Type': "application/json",
				'Authorization': 'Bearer ' + token
			}
		});
		var path = '/cfdi33/cancel/csd';
		request.post(path, JSON.stringify(cfdiData))
			.then((res) =>{
				callback(null, res.data)
			})
			.catch((err) => {
				callback(err.response.data, null)
			});
	}
	//Cancelacion por PFX
	static sendReqPFX(url, token, cfdiData, callback) {
		var request = axios.create({
			baseURL: url,
			headers: {
				'Content-Type': "application/json",
				'Authorization': 'Bearer ' + token
			}
		});
		var path = '/cfdi33/cancel/pfx';
		request.post(path, JSON.stringify(cfdiData))
			.then((res) =>{
				callback(null, res.data)
			})
			.catch((err) => {
				callback(err.response.data, null)
			});
	}
	//Cancelacion por XML
	static sendReqXML(url, token, xml, callback) {
		var delimiter = '-------------'+ StampRequest._uniqid();
		var fileFields = {
			xml : {
				type: "text/xml",
				content: xml
			}
		};
		var data = "";
		Object.keys(fileFields).forEach(function(name) {
			let file = fileFields[name];
			data+= "--" + delimiter + "\r\n";
			data+= 'Content-Disposition: form-data; name="' + name + '"; ';
			data+= 'filename="' + name + '"\r\n';
			data+= "Content-Type: "+ file.type + "\r\n";
			data+= "\r\n";
			data+= file.content+"\r\n";
		});
		data+= "--"+delimiter+"--\r\n";
		var request = axios.create({
			baseURL: url,
			headers: {
				'Authorization': 'Bearer ' + token,
				'Content-Type': 'multipart/form-data; boundary=' + delimiter
			}
		});
		var path = '/cfdi33/cancel/xml';
		
		request.post(path, data)
			.then((res) =>{
				callback(null, res.data)
			})
			.catch((err) => {
				callback(err.response.data, null)
			});
	}
}

module.exports = CancelationRequest;