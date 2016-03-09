var app = require("express")();
var bodyParser = require("body-parser");
var clone = require("clone-deep");
var relationTypes = require("../src/static/relationtypes");
var keywords = require("../src/static/keywords");
var fieldDefinitions = require("../src/static/field-definitions2");
var fs = require("fs");

app.use(bodyParser.json());


var entities = {
	wwdocuments: {},
	wwpersons: {},
	wwrelations: {},
	wwkeywords: {}
};

var VREs = {
	"WomenWriters": fieldDefinitions
};

app.use(function (req, res, next) {
	console.log(req.method, req.path);
	res.set("Access-Control-Allow-Origin", "*");
	res.set("Access-Control-Allow-Headers", "content-type");
	next();
});


var relationsFor = function(vertexType, vertexId) {

	return Object.keys(entities.wwrelations)
		.filter(function(id) {
			var relation = entities.wwrelations[id];
			return (relation["^sourceId"] === vertexId || relation["^targetId"] === vertexId) &&
				(relation["^sourceType"] === vertexType || relation["^targetType"] === vertexType);

		}).map(function(id) {
			var relation = entities.wwrelations[id];
			var relKey = relation["^sourceId"] === vertexId ? "regularName" : "inverseName";
			var targetKey = relation["^sourceId"] === vertexId ? "^targetId" : "^sourceId";

			return [
				relationTypes.filter(function(relType) { return relType._id === relation["^typeId"]; })[0][relKey],
				{
					displayName: (keywords.filter(function(kw) { return kw._id === relation[targetKey]; })[0] || {value: "mock value"}).value,
					id: relation[targetKey],
					relationId: id,
					accepted: true
				}
			];

		}).reduce(function (obj, cur) {
			obj[cur[0]] = obj[cur[0]] || [];
			obj[cur[0]].push(cur[1]);
			return obj;

		}, {});
};



app.post("/domain/:domain", function(req, res) {
	var record = req.body;
	record._id = req.params.domain + "_" + new Date().getTime();

	entities[req.params.domain][record._id] = req.body;
	res
		.set("Location", "/api/v4/domain/" + req.params.domain + "/" + record._id)
		.status(201)
		.end();
});

app.get("/domain/:domain/:id", function(req, res) {
	var respData = clone(entities[req.params.domain][req.params.id]);
	respData["@relations"] = relationsFor(req.params.domain.replace(/^ww/, "").replace(/s$/, ""), req.params.id);
	res.send(respData);
});

app.get("/metadata/:vreId", function(req, res) {
	res.send(VREs[req.params.vreId] || {});
});


app.put("/domain/:domain/:id", function(req, res) {
	entities[req.params.domain][req.params.id] = req.body;
	var respData = clone(entities[req.params.domain][req.params.id]);
	respData["@relations"] = relationsFor(req.params.domain.replace(/^ww/, "").replace(/s$/, ""), req.params.id);
	res.send(respData);
});

app.delete("/domain/:domain/:id", function(req, res) {
	delete entities[req.params.domain][req.params.id];
	res
		.status(204)
		.end();
});

app.get("/saved-queries", function(req, res) {
	fs.readFile("scripts/saved-queries.json", "utf8", function(err, data) {
		res.send(data);
	});
});

app.post("/saved-queries", function(req, res) {
	fs.readFile("scripts/saved-queries.json", "utf8", function(err, data) {
		var queries = JSON.parse(data);
		var foundIndex = queries.map(function(query) { return query.name; }).indexOf(req.body.name);

		if(foundIndex > -1) {
			queries[foundIndex] = req.body;
		} else {
			queries.push(req.body);
		}
		fs.writeFile("scripts/saved-queries.json", JSON.stringify(queries));
		res.set("Content-type", "application/json")
			.send(queries);
	});
});

app.get("/system/vres/:vreId", function(req, res) {
	res.send(VREs[req.params.vreId] || []);
});


app.listen(5000, function() {
	console.log("express listening on port: 5000");
});