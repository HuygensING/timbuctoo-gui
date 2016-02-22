#!/usr/bin/env node

var browserSync = require("browser-sync").create();
var modRewrite = require("connect-modrewrite");
var debounce = require("lodash.debounce");
// var proxy = require("proxy-middleware");
// var url = require("url");

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

//var proxyOptions = url.parse("http://acc.repository.huygens.knaw.nl/v2.1");
////var proxyOptions = url.parse("http://localhost:8080/");
//proxyOptions.route = "/api/v2.1";
//
//var proxyOptionsLocal = url.parse("http://localhost:5000");
//proxyOptionsLocal.route = "/api/v4";

browserSync.init({
	server: {
		baseDir: baseDir,
		middleware: [
//			proxy(proxyOptions),
//			proxy(proxyOptionsLocal),
			modRewrite([
				"^/css/(.*)$ /css/$1 [L]",
				"^/js/(.*)$ /js/$1 [L]",
				"^[^\\.]*$ /index.html [L]"
			])
		]
	}
});

require("./express");