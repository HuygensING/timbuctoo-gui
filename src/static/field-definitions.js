var keywords = require("./keywords");


module.exports = {
	"wwpersons": [
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
			"options": keywords
				.filter(function(keyword) { return keyword.type === "profession"; })
				.map(function(keyword) { return { key: keyword._id, value: keyword.value }; }),

			"relation": { // This object describes how and where a new relation should be stored
				"type": "wwrelation", // and this seems way too complex for the client --> cannot the server resolve a lot of this info by itself?
				"isInverseName": false, // (does not seem necessary for the keyword use case; is never inverse)
				"sourceType": "person",
				"targetType": "keyword",
				"typeId": "50d748bc-166d-464b-b468-16553f13bf54",
				"regularName": "hasProfession"
			}
		},
		{
			"name": "hasMaritalStatus",
			"type": "keyword",
			"options": keywords
				.filter(function(keyword) { return keyword.type === "maritalStatus"; })
				.map(function(keyword) { return { key: keyword._id, value: keyword.value }; }),

			"relation": { // This object describes how and where a new relation should be stored
				"type": "wwrelation", // and this seems way too complex for the client --> cannot the server resolve a lot of this info by itself?
				"isInverseName": false, // (does not seem necessary for the keyword use case; is never inverse)
				"sourceType": "person",
				"targetType": "keyword",
				"typeId": "74ca3110-f212-4149-9d6d-80d7cbf8dc7c",
				"regularName": "hasMaritalStatus"
			}
		},
		{
			"name": "isCreatorOf",
			"type": "relation",
			"path": "domain/wwdocuments/autocomplete",
			"relation": {
				"type": "wwrelation",
				"isInverseName": true,
				"sourceType": "document",
				"targetType": "person",
				"typeId": "83eb9cc1-ab91-4d6c-8778-b639480f2b9a",
				"regularName": "isCreatedBy"
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
	"wwdocuments": [
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
		},
		{
			"name": "isCreatedBy",
			"type": "relation",
			"path": "domain/wwpersons/autocomplete",
			"relation": {
				"type": "wwrelation",
				"isInverseName": false,
				"sourceType": "document",
				"targetType": "person",
				"typeId": "83eb9cc1-ab91-4d6c-8778-b639480f2b9a",
				"regularName": "isCreatedBy"
			}
		}
	],
	"wwcollectives": [],
	"wwkeywords": [
		{
			"name": "type",
			"type": "string"
		},
		{
			"name": "value",
			"type": "string"
		},
		{
			"name": "isProfessionOf",
			"type": "relation",
			"path": "domain/wwpersons/autocomplete",
			"relation": { // This object describes how and where a new relation should be stored
				"type": "wwrelation", // and this seems way too complex for the client --> cannot the server resolve a lot of this info by itself?
				"isInverseName": true, // (does not seem necessary for the keyword use case; is never inverse)
				"sourceType": "person",
				"targetType": "keyword",
				"typeId": "50d748bc-166d-464b-b468-16553f13bf54",
				"regularName": "hasProfession"
			}
		}
	]
};