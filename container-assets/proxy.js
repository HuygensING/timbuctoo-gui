var http = require('http'),
    https = require("https"),
    url = require("url");

// var server = http.createServer(function(req, res) {
//   var query = url.parse(req.url, true).query;
//   if (query.redirect) {
//     res.statusCode = query.statusCode || 302;
//     res.setHeader(query.locationHeader || "Location", query.redirect);
//   } else {
//     res.write(JSON.stringify({
//       statusCode: req.statusCode,
//       path: req.url,
//       headers: req.headers
//     }, undefined, 2))
//   }
//   res.end()
// }).listen(8000);

//FIXME: special case localhost handling by connecting to the docker host



var server = http.createServer(function(req, res) {
  var target = url.parse(req.url, true).query.url;
  if (target) {
    var parsed = url.parse(target);
    if (process.env.TIMBUCTOO_PROXY_BRIDGE_IP && parsed.hostname === "localhost" || parsed.hostname === "127.0.0.1") {
      parsed.hostname = process.env.TIMBUCTOO_PROXY_BRIDGE_IP;
      parsed.host = process.env.TIMBUCTOO_PROXY_BRIDGE_IP + ":" + (parsed.port || 80)
    }
    var cleanHeaders = {};
    Object.keys(req.headers).forEach(function (header) {
      if (header !== "cookie" && header !== "host") {
        cleanHeaders[header] = req.headers[header];
      }
    });
    cleanHeaders["host"] = parsed.host;
    cleanHeaders["connection"] = "close";
    var options = {
      "port": parsed.port,
      "hostname": parsed.hostname,
      path: parsed.path,
      "method": "GET",
      "headers": cleanHeaders
    };
    (parsed.protocol === "https:" ? https : http).get(options, (proxyres) => {
      res.statusCode = proxyres.statusCode;
      Object.keys(proxyres.headers).forEach(function (header) {
        var value = proxyres.headers[header];
        if (header === "location") {
          if (value[0] === "/") {
            value = parsed.protocol + "//" + parsed.host + value;
          }
          value = process.env.OWN_HOST_URL + "/proxy?url=" + encodeURIComponent(value);
        }
        res.setHeader(header, value);
      });
      proxyres.pipe(res);
    }).on('error', (e) => {
      res.statusCode = 404;
      console.log("error while retrieving targer: ", target, e);
      res.end();
    });
  } else {
    res.statusCode = 404;
    res.end();
  }
});

server.listen(5050);