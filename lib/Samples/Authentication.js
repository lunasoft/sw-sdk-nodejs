const Authentication = require('sw-sdk-nodejs').Authentication;
const SDKTEST_USER = process.env.SDKTEST_USER;
const SDKTEST_PASSWORD = process.env.SDKTEST_PASSWORD;

let obj = {
	user: SDKTEST_USER,
	password: SDKTEST_PASSWORD,
	url: "https://services.test.sw.com.mx",
}

const auth = Authentication.auth(params);

auth.Token((err, res) => {
	if (err) {
	  console.error("Error:", err);
	} else {
	  console.log(res);
	}
  });
