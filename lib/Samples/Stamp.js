const fs = require('fs');
const StampService = require('./SWSDK').StampService;

var params = {
	user: "demo",
	password: "12345678A",
	url: 'services.test.sw.com.mx',
};



 
fs.readFile('./file.xml', 'utf8', function(err, contents) {
	if(err) {
		let errRes = {
			status: 'error',
			message: err.message,
			messageDetail: err.message
		}
		console.log(errRes);
	} else {
		var callback = (error, data) => {
			console.log("error:", error, "data:", data);
		};

    	let xml = contents;
    	let stamp = StampService.Set(params);
    	stamp.StampV1(xml, callback);
	}
});