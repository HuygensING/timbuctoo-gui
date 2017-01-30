#!/usr/bin/env node

var browserSync = require("browser-sync").create();
var modRewrite = require("connect-modrewrite");
var debounce = require("lodash.debounce");
var proxy = require("proxy-middleware");
var url = require('url');

var baseDir = "./";
var watchFiles = [
	baseDir + "build/development/js/*.js",
	baseDir + "build/development/css/*.css",
	baseDir + "build/development/index.html"
];

function onFilesChanged(event, file) {
	if (event === "change") {
		browserSync.reload(file);
	}
}

browserSync.watch(watchFiles, debounce(onFilesChanged, 300));

var localSolr = process.env.SOLR_QUERY_URL;
var solrOpts = url.parse(localSolr);
solrOpts.route = "/repositorysolr/aggregated";


browserSync.init({
	open: false,
	server: {
		baseDir: baseDir,
		middleware: [
			proxy(solrOpts),
			modRewrite([
				"^/dataset-search/css/(.*)$ /build/development/css/$1 [L]",
				"^/dataset-search/src/stylus/(.*)$ /src/stylus/$1 [L]",
				"^/dataset-search/js/(.*)$ /build/development/js/$1 [L]",
				"^/dataset-search/images/(.*)$ /build/development/images/$1 [L]",
				"^/dataset-search/fonts/(.*)$ /build/development/fonts/$1 [L]",
				"^/dataset-search/?.*$ /build/development/index.html [L]",
				"^/?.*$ /build/development/index.html [L]",
			])
		]
	}
});
