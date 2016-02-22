var app = require("express")();
var bodyParser = require("body-parser");
var clone = require("clone-deep");
var relationTypes = require("../src/static/relationtypes");
var keywords = require("../src/static/keywords");
var fieldDefinitions = require("../src/static/field-definitions");
app.use(bodyParser.json());


var entities = {
	wwdocuments: {},
	wwpersons: {},
	wwrelations: {}
};

var VREs = {
	"WomenWriters": [
		{name: "wwdocuments"},
		{name: "wwpersons"}
	],
	"CKCC": [
		{name: "ckccpersons"}
	]
};

app.use(function (req, res, next) {
	console.log(req.method, req.path);
	res.set("Access-Control-Allow-Origin", "*");
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

app.get("/fielddefinitions/:domain", function(req, res) {
	res.send(fieldDefinitions[req.params.domain]);
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

app.get("/system/vres/:vreId", function(req, res) {
	res.send(VREs[req.params.vreId] || []);
});


app.listen(5000, function() {
	console.log("express listening on port: 5000");
});