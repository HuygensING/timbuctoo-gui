#!/usr/bin/env node

var browserSync = require("browser-sync").create();
var modRewrite = require("connect-modrewrite");
var debounce = require("lodash.debounce");
var proxy = require("proxy-middleware");
var url = require('url');

var baseDir = "./build/development";
var watchFiles = [
	baseDir + "/js/*.js",
	baseDir + "/css/*.css",
	baseDir + "/index.html"
];

function onFilesChanged(event, file) {
	if (event === "change") {
		browserSync.reload(file);
	}
}

browserSync.watch(watchFiles, debounce(onFilesChanged, 300));


var proxyOptionsAuth1 = url.parse("http://localhost:8080/v2.1/system/users/me");
proxyOptionsAuth1.route = "/api/v2.1/system/users/me";


var proxyOptionsAuth2 = url.parse("http://localhost:8080/v2.1/authenticate");
proxyOptionsAuth2.route = "/api/v2.1/authenticate";


var proxyOptionsLocal2 = url.parse("http://localhost:8080/v2.1/domain");
proxyOptionsLocal2.route = "/api/v2.1/domain";

var proxyOptionsLocal3 = url.parse("http://localhost:8080/v2.1/search");
proxyOptionsLocal3.route = "/api/v2.1/search";


var proxyOptions = url.parse("http://test.repository.huygens.knaw.nl/v2.1");
proxyOptions.route = "/api/v2.1";

var proxyOptionsLocal = url.parse("http://localhost:5000");
proxyOptionsLocal.route = "/api/v4";

browserSync.init({
	server: {
		baseDir: baseDir,
		middleware: [
			proxy(proxyOptionsAuth1),
			proxy(proxyOptionsAuth2),
			proxy(proxyOptionsLocal3),
			proxy(proxyOptionsLocal2),
			proxy(proxyOptions),
			proxy(proxyOptionsLocal),
			modRewrite([
				"^/css/(.*)$ /css/$1 [L]",
				"^/js/(.*)$ /js/$1 [L]",
				"^[^\\.]*$ /index.html [L]"
			])
		]
	}
});

require("./express");