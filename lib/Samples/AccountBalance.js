const AccountBalanceService = require('sw-sdk-nodejs').AccountBalance;
const SDKTEST_TOKEN = process.env.SDKTEST_TOKEN;

var params = {
	url: 'https://services.test.sw.com.mx',
	token: SDKTEST_TOKEN,
};

var callback = (err, data) => {
	if (err) {
		console.log(err)
	} else {
		console.log(data);
	}
};

var accountBalance = AccountBalanceService.Set(params);
accountBalance.GetAccountBalance(callback);