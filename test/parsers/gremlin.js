import expect from "expect";
import parse from "../../src/parsers/gremlin";

const query = {
	"domain": "wwperson",
	"deleted": false,
	"pathToQuerySelection": ["entity", "and", 2, "entity"],
	"entity": {
		"type": "entity",
		"domain": "wwperson",
		"and": [{
			"type": "property",
			"name": "gender",
			"or": [{ "type": "value", "value": "FEMALE" }, { "type": "value", "value": "MALE" }]
		}, {
			"type": "property",
			"name": "types",
			"or": [{ "type": "value", "value": "AUTHOR" }]
		}, {
			"name": "isCreatedBy",
			"type": "relation",
			"direction": "both",
			"entity": {
				"type": "entity",
				"domain": "wwdocument",
				"and": [{
					"name": "isCreatedBy",
					"type": "relation",
					"direction": "both",
					"entity": {
						"type": "entity",
						"domain": "wwperson",
						"and": [{
							"type": "property",
							"name": "gender",
							"or": [{
								"type": "value",
								"value": "MALE"
							}]
						}]
					}
				}]
			}
		}]
	}
};

describe("gremlin parser", () => { //eslint-disable-line no-undef
	it("should parse a json query to a gremlin query", () => { //eslint-disable-line no-undef
		const [resultQ, countQ] = parse(query);
		expect(resultQ).toEqual(`g.V().has("isLatest", true).filter{it.get().property("types").value().contains("\\"wwperson\\"")}.as("entity").and(or(has("wwperson_gender").filter{it.get().property("wwperson_gender").value().contains("\\"FEMALE\\"")}, has("wwperson_gender").filter{it.get().property("wwperson_gender").value().contains("\\"MALE\\"")}), has("wwperson_types").filter{it.get().property("wwperson_types").value().contains("\\"AUTHOR\\"")}).bothE("isCreatedBy").as("entity|and|2").otherV().as("entity|and|2|entity").bothE("isCreatedBy").as("entity|and|2|entity|and|0").otherV().as("entity|and|2|entity|and|0|entity").has("wwperson_gender").filter{it.get().property("wwperson_gender").value().contains("\\"MALE\\"")}.select("entity|and|2|entity").dedup().range(0,10)`);
		expect(countQ).toEqual(`g.V().has("isLatest", true).filter{it.get().property("types").value().contains("\\"wwperson\\"")}.as("entity").and(or(has("wwperson_gender").filter{it.get().property("wwperson_gender").value().contains("\\"FEMALE\\"")}, has("wwperson_gender").filter{it.get().property("wwperson_gender").value().contains("\\"MALE\\"")}), has("wwperson_types").filter{it.get().property("wwperson_types").value().contains("\\"AUTHOR\\"")}).bothE("isCreatedBy").as("entity|and|2").otherV().as("entity|and|2|entity").bothE("isCreatedBy").as("entity|and|2|entity|and|0").otherV().as("entity|and|2|entity|and|0|entity").has("wwperson_gender").filter{it.get().property("wwperson_gender").value().contains("\\"MALE\\"")}.select("entity|and|2|entity").dedup().count()`);

	});
});

//g.V().has("isLatest", true).filter{it.get().property("types").value().contains("\\"wwperson\\"")}.as("entity")
//	.or(
//		has("wwperson_gender").filter{it.get().property("wwperson_gender").value().contains("\\"FEMALE\\"")}, has("wwperson_gender").filter{it.get().property("wwperson_gender").value().contains("\\"MALE\\"")}).bothE("isCreatedBy").as("entity|and|1").otherV().as("entity|and|1|entity").has("wwdocument_documentType").filter{it.get().property("wwdocument_documentType").value().contains("\\"ARTICLE\\"")}.bothE("isCreatedBy").as("entity|and|1|entity|and|1").otherV().as("entity|and|1|entity|and|1|entity").has("wwperson_gender").filter{it.get().property("wwperson_gender").value().contains("\\"MALE\\"")}.select("entity|and|1|entity").dedup().count()