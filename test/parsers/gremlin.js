import expect from "expect";
import parse from "../../src/parsers/gremlin";

const query = {
	"domain": "wwperson",
	"deleted": false,
	"pathToQuerySelection": ["entity", "and", 0, "entity"],
	"entity": {
		"type": "entity",
		"domain": "wwperson",
		"and": [{
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
							"value": "FEMALE"
						}]
					}
				}, {
					"type": "property",
					"name": "documentType",
					"value": "ARTICLE"
				}]
			}
		}, {
			"type": "property",
			"name": "gender",
			"value": "MALE"
		}]
	}
};

describe("gremlin parser", () => { //eslint-disable-line no-undef
	it("should parse a json query to a gremlin query", () => { //eslint-disable-line no-undef
		const [resultQ, countQ] = parse(query);
		expect(resultQ).toEqual(`g.V().has("isLatest", true).filter{it.get().property("types").value().contains("\\"wwperson\\"")}.as("entity").has("wwperson_gender").filter{it.get().property("wwperson_gender").value().contains("\\"MALE\\"")}.bothE("isCreatedBy").as("entity|and|0").otherV().as("entity|and|0|entity").has("wwdocument_documentType").filter{it.get().property("wwdocument_documentType").value().contains("\\"ARTICLE\\"")}.bothE("isCreatedBy").as("entity|and|0|entity|and|0").otherV().as("entity|and|0|entity|and|0|entity").has("wwperson_gender").filter{it.get().property("wwperson_gender").value().contains("\\"FEMALE\\"")}.dedup().dedup().dedup().select("entity|and|0|entity").dedup().range(0,10)`);
		expect(countQ).toEqual(`g.V().has("isLatest", true).filter{it.get().property("types").value().contains("\\"wwperson\\"")}.as("entity").has("wwperson_gender").filter{it.get().property("wwperson_gender").value().contains("\\"MALE\\"")}.bothE("isCreatedBy").as("entity|and|0").otherV().as("entity|and|0|entity").has("wwdocument_documentType").filter{it.get().property("wwdocument_documentType").value().contains("\\"ARTICLE\\"")}.bothE("isCreatedBy").as("entity|and|0|entity|and|0").otherV().as("entity|and|0|entity|and|0|entity").has("wwperson_gender").filter{it.get().property("wwperson_gender").value().contains("\\"FEMALE\\"")}.dedup().dedup().dedup().select("entity|and|0|entity").dedup().count()`);

	});
});