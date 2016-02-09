export default {
	"wwperson": [
		{
			"name": "names",
			"type": "names",
			"options": ["SURNAME", "FORENAME", "NAME_LINK", "ROLE_NAME", "GEN_NAME"]
		},
		{
			"name": "types",
			"type": "multiselect",
			"options": ["ARCHETYPE", "AUTHOR", "PSEUDONYM", "READER"]
		},
		{
			"name": "gender",
			"type": "select",
			"options": ["FEMALE", "MALE", "UNKNOWN"]
		},
		{
			"name": "birthDate",
			"type": "datable"
		},
		{
			"name": "hasBirthPlace",
			"type": "relation",
			"path": "domain/wwlocations/autocomplete"
		},
		{
			"name": "hasResidenceLocation",
			"type": "multirelation",
			"path": "domain/wwlocations/autocomplete"
		},
		{
			"name": "deathDate",
			"type": "datable"
		},
		{
			"name": "hasDeathPlace",
			"type": "relation",
			"path": "domain/wwlocations/autocomplete"
		},
		{
			"name": "isRelatedTo",
			"type": "multirelation",
			"path": "domain/wwpersons/autocomplete"
		},
		{
			"name": "bibliography",
			"type": "text"
		},
		{
			"name": "notes",
			"type": "text"
		}
	]
}