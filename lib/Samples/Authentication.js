const Authentication = require('sw-sdk-nodejs').Authentication;

let obj = {
	url : "http://services.test.sw.com.mx",
	user: "demo",
	password: "123456789",
}

let auth = Authentication.auth(obj);

let callback = (err, data) => {
	if(err) {
		console.log(err)
	} else{
		console.log(data)
	}
};

auth.Token(callback);
