export default {
	"wwperson": [
		{
			"name": "names",
			"type": "names",
			"options": ["FORENAME", "SURNAME", "NAME_LINK", "ROLE_NAME", "GEN_NAME"]
		},
		{
			"name": "types",
			"type": "multiselect",
			"options": ["ARCHETYPE", "AUTHOR", "PSEUDONYM", "READER"]
		},
		{
			"name": "gender",
			"type": "select",
			"options": ["UNKNOWN", "FEMALE", "MALE"],
			"defaultValue": "UNKNOWN"
		},
		{
			"name": "birthDate",
			"type": "datable"
		},
		{
			"name": "deathDate",
			"type": "datable"
		},
		{
			"name": "bibliography",
			"type": "text"
		},
		{
			"name": "notes",
			"type": "text"
		},
		{
			"name": "links",
			"type": "links"
		},
		{
			"name": "children",
			"type": "select",
			"options": ["YES", "NO", "UNKNOWN"]
		},
		{
			"name": "hasProfession",
			"type": "keyword",
			"path": "domain/wwkeywords/autocomplete?type=profession&rows=1000" // this should definitely change
		},
		{
			"name": "hasMaritalStatus",
			"type": "keyword",
			"path": "domain/wwkeywords/autocomplete?type=maritalStatus&rows=1000" // this should definitely change
		}
/*		{
			"name": "hasBirthPlace",
			"type": "relation",
			"path": "domain/wwlocations/autocomplete"
		},
		{
			"name": "hasResidenceLocation",
			"type": "relation",
			"path": "domain/wwlocations/autocomplete"
		},
		{
			"name": "hasDeathPlace",
			"type": "relation",
			"path": "domain/wwlocations/autocomplete"
		},
		{
			"name": "isRelatedTo",
			"type": "relation",
			"path": "domain/wwpersons/autocomplete"
		}*/
	],
	"wwdocument": [
		{
			"name": "title",
			"type": "string"
		},
		{
			"name": "notes",
			"type": "text"
		},
		{
			"name": "links",
			"type": "links"
		},
		{
			"name": "documentType",
			"type": "select",
			"options": ["UNKNOWN", "ANTHOLOGY", "ARTICLE", "AWARD", "CATALOGUE", "COMPILATION"],
			"defaultValue": "UNKNOWN"
		}
	]
};