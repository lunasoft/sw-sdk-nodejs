const fs = require("fs");
const path = require("path");
const IssueService = require("sw-sdk-nodejs").IssueService;
const SDKTEST_USER = process.env.SDKTEST_USER;
const SDKTEST_PASSWORD = process.env.SDKTEST_PASSWORD;

const params = {
	user: SDKTEST_USER,
	password: SDKTEST_PASSWORD,
	url: 'https://services.test.sw.com.mx',
};

const xmlPath = path.join(__dirname, "file.xml");
const xml = fs.readFileSync(xmlPath, "utf8");

IssueService.Set(params).IssueV1(xml, (err, res) => {
  if (err) {
    console.error("Error:", err);
  } else {
    console.log(res);
  }
});