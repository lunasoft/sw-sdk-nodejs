const fs = require('fs');
const StampService = require('sw-sdk-nodejs').StampService;

var params = {
	user: "demo",
	password: "123456789",
	url: 'http://services.test.sw.com.mx',
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
			if(error)
				console.log(error);
			else
				console.log(data);
		};

    	let xml = contents;
    	let stamp = StampService.Set(params);
    	stamp.StampV1(xml, callback);
	}
});