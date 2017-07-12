const Authentication = require('sw-sdk-nodejs').Authentication;

let obj = {
	url : "services.test.sw.com.mx",
	user: "demo",
	password: "12345678A",
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
