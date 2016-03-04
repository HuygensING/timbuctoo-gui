import expect from "expect";
import parse from "../../src/parsers/gremlin";

const query = {
	"domain": "wwperson",
	"deleted": false,
	"pathToQuerySelection": ["or", 0, "and", 2, "or", 0],
	"or": [{
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
			"or": [{
				"type": "entity",
				"domain": "wwdocument",
				"and": [{
					"name": "isCreatedBy",
					"type": "relation",
					"direction": "both",
					"or": [{
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
					}]
				}]
			}]
		}]
	}]
};

describe("gremlin parser", () => { //eslint-disable-line no-undef
	it("should parse a json query to a gremlin query", () => { //eslint-disable-line no-undef
		const [resultQ, countQ] = parse(query);
		expect(resultQ).toEqual(`g.V().has("isLatest", true).filter{it.get().property("types").value().contains("\\"wwperson\\"")}.as("or|0").and(or(has("wwperson_gender").filter{it.get().property("wwperson_gender").value().contains("\\"FEMALE\\"")}, has("wwperson_gender").filter{it.get().property("wwperson_gender").value().contains("\\"MALE\\"")}), has("wwperson_types").filter{it.get().property("wwperson_types").value().contains("\\"AUTHOR\\"")}).bothE("isCreatedBy").as("or|0|and|2").otherV().as("or|0|and|2|or|0").bothE("isCreatedBy").as("or|0|and|2|or|0|and|0").otherV().as("or|0|and|2|or|0|and|0|or|0").has("wwperson_gender").filter{it.get().property("wwperson_gender").value().contains("\\"MALE\\"")}.select("or|0|and|2|or|0").dedup().range(0,10)`);
		expect(countQ).toEqual(`g.V().has("isLatest", true).filter{it.get().property("types").value().contains("\\"wwperson\\"")}.as("or|0").and(or(has("wwperson_gender").filter{it.get().property("wwperson_gender").value().contains("\\"FEMALE\\"")}, has("wwperson_gender").filter{it.get().property("wwperson_gender").value().contains("\\"MALE\\"")}), has("wwperson_types").filter{it.get().property("wwperson_types").value().contains("\\"AUTHOR\\"")}).bothE("isCreatedBy").as("or|0|and|2").otherV().as("or|0|and|2|or|0").bothE("isCreatedBy").as("or|0|and|2|or|0|and|0").otherV().as("or|0|and|2|or|0|and|0|or|0").has("wwperson_gender").filter{it.get().property("wwperson_gender").value().contains("\\"MALE\\"")}.select("or|0|and|2|or|0").dedup().count()`);
	});
});