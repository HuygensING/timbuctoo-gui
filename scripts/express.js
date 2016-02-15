var app = require("express")();
var bodyParser = require('body-parser');
var clone = require('clone-deep');
var relationTypes = require("./relationtypes");
var keywords = require("./keywords");
app.use(bodyParser.json());


var entities = {
	wwdocuments: [],
	wwpersons: [],
	wwrelations: []
};

app.use(function (req, res, next) {
	console.log(entities);
	next();
})


var relationsFor = function(vertexType, vertexId) {
	var test = entities.wwrelations.filter(function(relation) {
		return (relation["^sourceId"] === "" + vertexId || relation["^targetId"] === "" + vertexId) &&
					(relation["^sourceType"] === vertexType  || relation["^targetType"] === vertexType);
	}).map(function(relation) {
		var relKey = "regularName"; // TODO
		var displayName = keywords.filter(function(kw) { return kw._id === relation["^targetId"]})[0].value;

		return [
			relationTypes.filter(function(relType) { return relType._id === relation["^typeId"]; })[0][relKey],
			{
				displayName: displayName,
				id: relation["^targetId"],
				accepted: true
			}
		];
	}).reduce(function (obj, cur) {
		obj[cur[0]] = obj[cur[0]] || [];
		obj[cur[0]].push(cur[1]);
		return obj;
	}, {});

	return test;
}


app.post("/domain/:domain", function(req, res) {
	var record = req.body;
	record._id = "" + entities[req.params.domain].length;

	entities[req.params.domain].push(req.body);
	res
		.set("Location", "/api/v4/domain/" + req.params.domain + "/" + (entities[req.params.domain].length - 1))
		.status(201)
		.end();
});

app.get("/domain/:domain/:id", function(req, res) {
	var respData = clone(entities[req.params.domain][req.params.id]);
	respData["@relations"] = relationsFor(req.params.domain.replace(/^ww/, "").replace(/s$/, ""), req.params.id);
	res.send(respData);
});

app.put("/domain/:domain/:id", function(req, res) {
	entities[req.params.domain][req.params.id] = req.body;
	var respData = clone(entities[req.params.domain][req.params.id]);
	respData["@relations"] = relationsFor(req.params.domain.replace(/^ww/, "").replace(/s$/, ""), req.params.id);

	res.send(respData);
});


app.listen(5000, function() {
	console.log("express listening on port: 5000");
});