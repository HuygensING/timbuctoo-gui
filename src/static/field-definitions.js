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
			"path": "domain/wwkeywords/autocomplete?type=profession&rows=1000", // this should definitely change
			"relation": { // This object describes how and where a new relation should be stored
				"type": "wwrelation", // and this seems way too complex for the client --> cannot the server resolve a lot of this info by itself?
				"path": "domain/wwkeywords",
				"isInverseName": false, // (does not seem necessary for the keyword use case; is never inverse)
				"sourceType": "person",
				"targetType": "keyword",
				"typeId": "5f83410f-3b77-404a-ad53-3b2cb7607674"
			}
		},
		{
			"name": "hasMaritalStatus",
			"type": "keyword",
			"path": "domain/wwkeywords/autocomplete?type=maritalStatus&rows=1000", // this should definitely change
			"relation": { // This object describes how and where a new relation should be stored
				"type": "wwrelation", // and this seems way too complex for the client --> cannot the server resolve a lot of this info by itself?
				"path": "domain/wwkeywords",
				"isInverseName": false, // (does not seem necessary for the keyword use case; is never inverse)
				"sourceType": "person",
				"targetType": "keyword",
				"typeId": "d3951eeb-d66f-41c5-8545-9b6498400fa7"
			}
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