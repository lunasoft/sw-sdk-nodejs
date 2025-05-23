const fs = require("fs");
const path = require("path");
const StampService = require("sw-sdk-nodejs").StampService;
const SDKTEST_USER = process.env.SDKTEST_USER;
const SDKTEST_PASSWORD = process.env.SDKTEST_PASSWORD;

const params = {
	user: SDKTEST_USER,
	password: SDKTEST_PASSWORD,
	url: 'https://services.test.sw.com.mx',
};

const xmlPath = path.join(__dirname, "fileSign.xml");
const xml = fs.readFileSync(xmlPath, "utf8");

StampService.Set(params).StampV1(xml, (err, res) => {
  if (err) {
    console.error("Error:", err);
  } else {
    console.log(res);
  }
});