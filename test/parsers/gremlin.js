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

const exQ = `
g.V().has("isLatest", true).filter{it.get().property("types").value().contains("\\"wwperson\\"")}
.as("or")
	.or(
		__.and(
			or(
				has("wwperson_gender").filter{it.get().property("wwperson_gender").value().contains("\\"FEMALE\\"")},
				has("wwperson_gender").filter{it.get().property("wwperson_gender").value().contains("\\"MALE\\"")}),
				has("wwperson_types").filter{it.get().property("wwperson_types").value().contains("\\"AUTHOR\\"")}).and(__.bothE("isCreatedBy").otherV().as("or|0|and|2|or").or(__.and(__.bothE("isCreatedBy").otherV().as("or|0|and|2|or|0|and|0|or").or(__.has("wwperson_gender").filter{it.get().property("wwperson_gender").value().contains("\\"MALE\\"")}).union(__().as("or|0|and|2|or|0|and|0|or|0").has("wwperson_gender").filter{it.get().property("wwperson_gender").value().contains("\\"MALE\\"")})).union(__.bothE("isCreatedBy").as("or|0|and|2|or|0|and|0").otherV().as("or|0|and|2|or|0|and|0|or").or(__.has("wwperson_gender").filter{it.get().property("wwperson_gender").value().contains("\\"MALE\\"")}).union(__().as("or|0|and|2|or|0|and|0|or|0").has("wwperson_gender").filter{it.get().property("wwperson_gender").value().contains("\\"MALE\\"")}).as("or|0|and|2|or|0|0"))).union(__().as("or|0|and|2|or|0").and(__.bothE("isCreatedBy").otherV().as("or|0|and|2|or|0|and|0|or").or(__.has("wwperson_gender").filter{it.get().property("wwperson_gender").value().contains("\\"MALE\\"")}).union(__().as("or|0|and|2|or|0|and|0|or|0").has("wwperson_gender").filter{it.get().property("wwperson_gender").value().contains("\\"MALE\\"")})).union(__.bothE("isCreatedBy").as("or|0|and|2|or|0|and|0").otherV().as("or|0|and|2|or|0|and|0|or").or(__.has("wwperson_gender").filter{it.get().property("wwperson_gender").value().contains("\\"MALE\\"")}).union(__().as("or|0|and|2|or|0|and|0|or|0").has("wwperson_gender").filter{it.get().property("wwperson_gender").value().contains("\\"MALE\\"")}).as("or|0|and|2|or|0|0")))).union(__.bothE("isCreatedBy").as("or|0|and|2").otherV().as("or|0|and|2|or").or(__.and(__.bothE("isCreatedBy").otherV().as("or|0|and|2|or|0|and|0|or").or(__.has("wwperson_gender").filter{it.get().property("wwperson_gender").value().contains("\\"MALE\\"")}).union(__().as("or|0|and|2|or|0|and|0|or|0").has("wwperson_gender").filter{it.get().property("wwperson_gender").value().contains("\\"MALE\\"")})).union(__.bothE("isCreatedBy").as("or|0|and|2|or|0|and|0").otherV().as("or|0|and|2|or|0|and|0|or").or(__.has("wwperson_gender").filter{it.get().property("wwperson_gender").value().contains("\\"MALE\\"")}).union(__().as("or|0|and|2|or|0|and|0|or|0").has("wwperson_gender").filter{it.get().property("wwperson_gender").value().contains("\\"MALE\\"")}).as("or|0|and|2|or|0|0"))).union(__().as("or|0|and|2|or|0").and(__.bothE("isCreatedBy").otherV().as("or|0|and|2|or|0|and|0|or").or(__.has("wwperson_gender").filter{it.get().property("wwperson_gender").value().contains("\\"MALE\\"")}).union(__().as("or|0|and|2|or|0|and|0|or|0").has("wwperson_gender").filter{it.get().property("wwperson_gender").value().contains("\\"MALE\\"")})).union(__.bothE("isCreatedBy").as("or|0|and|2|or|0|and|0").otherV().as("or|0|and|2|or|0|and|0|or").or(__.has("wwperson_gender").filter{it.get().property("wwperson_gender").value().contains("\\"MALE\\"")}).union(__().as("or|0|and|2|or|0|and|0|or|0").has("wwperson_gender").filter{it.get().property("wwperson_gender").value().contains("\\"MALE\\"")}).as("or|0|and|2|or|0|0"))).as("or|0|2"))).union(__().as("or|0").and(or(has("wwperson_gender").filter{it.get().property("wwperson_gender").value().contains("\\"FEMALE\\"")}, has("wwperson_gender").filter{it.get().property("wwperson_gender").value().contains("\\"MALE\\"")}), has("wwperson_types").filter{it.get().property("wwperson_types").value().contains("\\"AUTHOR\\"")}).and(__.bothE("isCreatedBy").otherV().as("or|0|and|2|or").or(__.and(__.bothE("isCreatedBy").otherV().as("or|0|and|2|or|0|and|0|or").or(__.has("wwperson_gender").filter{it.get().property("wwperson_gender").value().contains("\\"MALE\\"")}).union(__().as("or|0|and|2|or|0|and|0|or|0").has("wwperson_gender").filter{it.get().property("wwperson_gender").value().contains("\\"MALE\\"")})).union(__.bothE("isCreatedBy").as("or|0|and|2|or|0|and|0").otherV().as("or|0|and|2|or|0|and|0|or").or(__.has("wwperson_gender").filter{it.get().property("wwperson_gender").value().contains("\\"MALE\\"")}).union(__().as("or|0|and|2|or|0|and|0|or|0").has("wwperson_gender").filter{it.get().property("wwperson_gender").value().contains("\\"MALE\\"")}).as("or|0|and|2|or|0|0"))).union(__().as("or|0|and|2|or|0").and(__.bothE("isCreatedBy").otherV().as("or|0|and|2|or|0|and|0|or").or(__.has("wwperson_gender").filter{it.get().property("wwperson_gender").value().contains("\\"MALE\\"")}).union(__().as("or|0|and|2|or|0|and|0|or|0").has("wwperson_gender").filter{it.get().property("wwperson_gender").value().contains("\\"MALE\\"")})).union(__.bothE("isCreatedBy").as("or|0|and|2|or|0|and|0").otherV().as("or|0|and|2|or|0|and|0|or").or(__.has("wwperson_gender").filter{it.get().property("wwperson_gender").value().contains("\\"MALE\\"")}).union(__().as("or|0|and|2|or|0|and|0|or|0").has("wwperson_gender").filter{it.get().property("wwperson_gender").value().contains("\\"MALE\\"")}).as("or|0|and|2|or|0|0")))).union(__.bothE("isCreatedBy").as("or|0|and|2").otherV().as("or|0|and|2|or").or(__.and(__.bothE("isCreatedBy").otherV().as("or|0|and|2|or|0|and|0|or").or(__.has("wwperson_gender").filter{it.get().property("wwperson_gender").value().contains("\\"MALE\\"")}).union(__().as("or|0|and|2|or|0|and|0|or|0").has("wwperson_gender").filter{it.get().property("wwperson_gender").value().contains("\\"MALE\\"")})).union(__.bothE("isCreatedBy").as("or|0|and|2|or|0|and|0").otherV().as("or|0|and|2|or|0|and|0|or").or(__.has("wwperson_gender").filter{it.get().property("wwperson_gender").value().contains("\\"MALE\\"")}).union(__().as("or|0|and|2|or|0|and|0|or|0").has("wwperson_gender").filter{it.get().property("wwperson_gender").value().contains("\\"MALE\\"")}).as("or|0|and|2|or|0|0"))).union(__().as("or|0|and|2|or|0").and(__.bothE("isCreatedBy").otherV().as("or|0|and|2|or|0|and|0|or").or(__.has("wwperson_gender").filter{it.get().property("wwperson_gender").value().contains("\\"MALE\\"")}).union(__().as("or|0|and|2|or|0|and|0|or|0").has("wwperson_gender").filter{it.get().property("wwperson_gender").value().contains("\\"MALE\\"")})).union(__.bothE("isCreatedBy").as("or|0|and|2|or|0|and|0").otherV().as("or|0|and|2|or|0|and|0|or").or(__.has("wwperson_gender").filter{it.get().property("wwperson_gender").value().contains("\\"MALE\\"")}).union(__().as("or|0|and|2|or|0|and|0|or|0").has("wwperson_gender").filter{it.get().property("wwperson_gender").value().contains("\\"MALE\\"")}).as("or|0|and|2|or|0|0"))
			).as("or|0|2")
		)
	)
.select("or|0|and|2|or|0").dedup()`;

const expectedQ = exQ.replace(/(?:\r\n|\r|\n|\t|\s)/g, "");
describe("gremlin parser", () => { //eslint-disable-line no-undef
	it("should parse a json query to a gremlin query",/* () => { //eslint-disable-line no-undef
		const [resultQ, countQ] = parse(query);
		expect(resultQ.replace(/\s/g, "")).toEqual(`${expectedQ}.range(0,10)`);
		expect(countQ.replace(/\s/g, "")).toEqual(`${expectedQ}.count()`);
	}*/);
});