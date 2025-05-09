const AccountBalanceService = require('sw-sdk-nodejs').AccountBalance;
const SDKTEST_USER = process.env.SDKTEST_USER;
const SDKTEST_PASSWORD = process.env.SDKTEST_PASSWORD;

const params = {
	user: SDKTEST_USER,
	password: SDKTEST_PASSWORD,
	url: "https://services.test.sw.com.mx",
	urlApi: "https://api.test.sw.com.mx"
  };

	AccountBalanceService.Set(params).GetAccountBalance((err, res) => {
	if (err) {
	  console.error("Error:", err);
	} else {
	  console.log(res);
	}
  });

  AccountBalanceService.Set(params).AddStamps(VALID_ID, 1, 'Prueba JS', (err, res) => {
	if (err) {
	  console.error("Error:", err);
	} else {
	  console.log(res);
	}
  });

  AccountBalanceService.Set(params).AddStamps(VALID_ID, 1, 'Prueba JS', (err, res) => {
	if (err) {
	  console.error("Error:", err);
	} else {
	  console.log(res);
	}
})