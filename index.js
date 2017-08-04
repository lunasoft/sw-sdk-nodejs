const Authentication = require('./SWSDK.js').Authentication;

let obj = {
	url : "services.test.sw.com.mx",
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