const http = require("http");
const https = require("https");

var helper = {
    getUrlAndModule: (url) => {
        var module = url.indexOf("https") === -1 ? http : https;
		
		if(url.indexOf("https") === -1) {
			module = http;
			url = url.replace("http://", "");
		} else {
			module = https;
			url = url.replace("https://", "");
		}
		
        return { url : url, module : module }
    }
}

module.exports = helper;