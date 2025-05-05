const Authentication = require('sw-sdk-nodejs').Authentication;
const SDKTEST_USER = process.env.SDKTEST_USER;
const SDKTEST_PASSWORD = process.env.SDKTEST_PASSWORD;

let obj = {
	user: SDKTEST_USER,
	password: SDKTEST_PASSWORD,
	url: "https://services.test.sw.com.mx",
}

let auth = Authentication.auth(obj);

let callback = (err, data) => {
	if (err) {
		console.log(err)
	} else {
		console.log(data)
	}
};

auth.Token(callback);
