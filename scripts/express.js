var app = require("express")();
var bodyParser = require('body-parser');
var clone = require('clone-deep');
var relationTypes = require("./relationtypes");
var keywords = require("./keywords");
app.use(bodyParser.json());


var entities = {
	wwdocuments: {},
	wwpersons: {},
	wwrelations: {}
};

app.use(function (req, res, next) {
	console.log(req.method, req.path);
	next();
})


var relationsFor = function(vertexType, vertexId) {
	var test = Object.keys(entities.wwrelations)
	.map(function(id) {
		return {
			relation: entities.wwrelations[id],
			id: id
		};
	}).filter(function(relObj) {
		var relation = relObj.relation;
		return (relation["^sourceId"] === "" + vertexId || relation["^targetId"] === "" + vertexId) &&
					(relation["^sourceType"] === vertexType  || relation["^targetType"] === vertexType);
	}).map(function(relObj) {
		var relation = relObj.relation;
		var relKey = "regularName"; // TODO
		var displayName = keywords.filter(function(kw) { return kw._id === relation["^targetId"]})[0].value // TODO;

		return [
			relationTypes.filter(function(relType) { return relType._id === relation["^typeId"]; })[0][relKey],
			{
				displayName: displayName,
				id: relation["^targetId"], // TODO,
				relationId: relObj.id,
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
	record._id = req.params.domain + "_" + Object.keys(entities[req.params.domain]).length;

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

app.put("/domain/:domain/:id", function(req, res) {
	entities[req.params.domain][req.params.id] = req.body;
	var respData = clone(entities[req.params.domain][req.params.id]);
	respData["@relations"] = relationsFor(req.params.domain.replace(/^ww/, "").replace(/s$/, ""), req.params.id);

	res.send(respData);
});

app.delete("/domain/:domain/:id", function(req, res) {
	delete entities[req.params.domain][req.params.id]
	res
		.status(204)
		.end();
});



app.listen(5000, function() {
	console.log("express listening on port: 5000");
});