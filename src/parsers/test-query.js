export default {
	"domain": "wwperson",
	"deleted": false,
	"pathToSelectedEntity": ["entity", "data", "@relations", 0],
	"entity": {
		"domain": "wwperson",
		"fieldDefinitions": [{
			"name": "names",
			"type": "names",
			"options": ["FORENAME", "SURNAME", "NAME_LINK", "ROLE_NAME", "GEN_NAME"]
		}, {
			"name": "types",
			"type": "multiselect",
			"options": ["ARCHETYPE", "AUTHOR", "PSEUDONYM", "READER"]
		}, {
			"name": "gender",
			"type": "select",
			"options": ["UNKNOWN", "FEMALE", "MALE"],
			"defaultValue": "UNKNOWN"
		}, {
			"name": "birthDate",
			"type": "datable"
		}, {
			"name": "deathDate",
			"type": "datable"
		}, {
			"name": "bibliography",
			"type": "text"
		}, {
			"name": "notes",
			"type": "text"
		}, {
			"name": "links",
			"type": "links"
		}, {
			"name": "children",
			"type": "select",
			"options": ["YES", "NO", "UNKNOWN"]
		}, {
			"name": "hasProfession",
			"type": "keyword",
			"options": [{
				"key": "a0be2f24-883a-4ed7-b858-4ebc932751c5",
				"value": "Actress"
			}, {
				"key": "38e9cdd8-dd50-4b26-842e-9558fbf827b2",
				"value": "Biographer"
			}, {
				"key": "a5945c91-c43a-4a07-b7b9-1bd5283bf8fc",
				"value": "Compiler"
			}, {
				"key": "ce71d06a-c96c-4fc2-ad34-2bcde6a513a4",
				"value": "Contributor to periodical press"
			}, {
				"key": "30bc1fb5-a760-46eb-ae08-330588fb4649",
				"value": "Cultural and educational patron"
			}, {
				"key": "6cb452ad-bf58-4188-a0e1-8bbf60d70d81",
				"value": "Editor of periodical press"
			}, {
				"key": "7836e878-ae2e-4353-a922-48d7b758c92e",
				"value": "Embroiderer"
			}, {
				"key": "f556debe-0119-418a-bcbd-9a143b3715dd",
				"value": "Essayist"
			}, {
				"key": "bc4393bb-a5ba-46de-84d3-cfa94449c371",
				"value": "Fiction writer/novelist"
			}, {
				"key": "bec33207-b3e2-4606-b84e-fae01d575e99",
				"value": "Historian"
			}, {
				"key": "df1c5e02-0302-45f0-942d-9c32499c42c4",
				"value": "Journalist"
			}, {
				"key": "2fac9877-7306-4f0d-8142-5d6d51e27f2b",
				"value": "Lady-in-waiting"
			}, {
				"key": "051d7f6d-f6f3-4b95-b874-694745b27b5a",
				"value": "Literary critic"
			}, {
				"key": "d3230405-0dc9-4434-84ba-1121251a2992",
				"value": "Midwife"
			}, {
				"key": "a92b97cc-689d-4237-a38b-77e1f3a2b2b2",
				"value": "Musician/composer"
			}, {
				"key": "2b14a5f7-b5fb-4849-b4a0-4e20c9266ee8",
				"value": "Nun"
			}, {
				"key": "95bad0fe-f2c2-455d-a090-a1fd81c9ad96",
				"value": "Nurse"
			}, {
				"key": "309bae29-05fe-4105-9b2e-c02cd670b449",
				"value": "Painter"
			}, {
				"key": "0f16f571-e8de-4af7-90ce-13cc1b208791",
				"value": "Philosopher"
			}, {
				"key": "7eca015a-4ecb-404c-be1c-c89272d30ff4",
				"value": "Playwright"
			}, {
				"key": "109f324c-68b9-4b6a-b5c0-b3ce86440962",
				"value": "Poet"
			}, {
				"key": "17e45b2f-c21f-4454-b3ad-05c17457ea4b",
				"value": "Publisher"
			}, {
				"key": "c6fc85b3-326d-4db4-8bfe-6394a099341c",
				"value": "Salonnière"
			}, {
				"key": "a9a84392-6030-402e-b095-0a60021af447",
				"value": "Scholar"
			}, {
				"key": "64f7de47-d502-4982-a5cc-51754d913f55",
				"value": "Social-cultural activist"
			}, {
				"key": "dae46d45-cab8-497b-8ea6-f8091f9099f5",
				"value": "Teacher/governess"
			}, {
				"key": "08f540f6-76a2-42e7-908b-f71bc1949455",
				"value": "Translator"
			}, {
				"key": "e62b7eac-f6a5-40c2-9936-d2ec34adb582",
				"value": "Traveller"
			}, {
				"key": "637113b5-bd45-427f-81cb-600110a50c34",
				"value": "Writer"
			}],
			"relation": {
				"type": "wwrelation",
				"isInverseName": false,
				"sourceType": "person",
				"targetType": "keyword",
				"typeId": "50d748bc-166d-464b-b468-16553f13bf54"
			}
		}, {
			"name": "hasMaritalStatus",
			"type": "keyword",
			"options": [{
				"key": "1f1a472d-e800-4edf-9078-6f300aedf268",
				"value": "Abandoned by husband/partner"
			}, {
				"key": "d414321e-5f73-4a2b-bf01-7b204b6c673b",
				"value": "Co-habitation with partner female"
			}, {
				"key": "10fcd455-7c1f-4d07-8665-a6e6d388fcef",
				"value": "Co-habitation with partner male"
			}, {
				"key": "2b412f59-c875-41c5-932a-f79a46fd742a",
				"value": "Divorced"
			}, {
				"key": "d6727ef1-131f-47e0-8565-c3e14c3b8842",
				"value": "Liaison with man"
			}, {
				"key": "9d7e0d30-8283-40e1-b28c-c130d3fb7bb0",
				"value": "Liaison with woman"
			}, {
				"key": "6cd8ddc8-3315-47b0-9914-a4901ef6eabf",
				"value": "Married"
			}, {
				"key": "0439a881-a950-46eb-88e7-d2aa02ed0591",
				"value": "Remarried"
			}, {
				"key": "2bc54474-879c-4ae4-9b14-f857480d740d",
				"value": "Separated"
			}, {
				"key": "06014785-e948-4a67-9eaa-03cd415284f2",
				"value": "Single"
			}, {
				"key": "7398ad7f-5152-4cc5-a45d-d824a0195f8c",
				"value": "Widowed"
			}],
			"relation": {
				"type": "wwrelation",
				"isInverseName": false,
				"sourceType": "person",
				"targetType": "keyword",
				"typeId": "74ca3110-f212-4149-9d6d-80d7cbf8dc7c"
			}
		}, {
			"name": "isCreatorOf",
			"type": "relation",
			"path": "domain/wwdocuments/autocomplete",
			"relation": {
				"type": "wwrelation",
				"isInverseName": true,
				"sourceType": "document",
				"targetType": "person",
				"typeId": "83eb9cc1-ab91-4d6c-8778-b639480f2b9a"
			}
		}],
		"data": {
			"@properties": [{
				"name": "gender",
				"value": "FEMALE"
			}, {
				"name": "types",
				"value": "AUTHOR"
			}],
			"@relations": [{
				"name": "isCreatorOf",
				"targetType": "document",
				"entity": {
					"domain": "wwdocument",
					"fieldDefinitions": [{
						"name": "title",
						"type": "string"
					}, {
						"name": "notes",
						"type": "text"
					}, {
						"name": "links",
						"type": "links"
					}, {
						"name": "documentType",
						"type": "select",
						"options": ["UNKNOWN", "ANTHOLOGY", "ARTICLE", "AWARD", "CATALOGUE", "COMPILATION"],
						"defaultValue": "UNKNOWN"
					}, {
						"name": "isCreatedBy",
						"type": "relation",
						"path": "domain/wwpersons/autocomplete",
						"relation": {
							"type": "wwrelation",
							"isInverseName": false,
							"sourceType": "document",
							"targetType": "person",
							"typeId": "83eb9cc1-ab91-4d6c-8778-b639480f2b9a"
						}
					}],
					"data": {
						"@properties": [{
							"name": "documentType",
							"value": "ARTICLE"
						}],
						"@relations": [{
							"name": "isCreatedBy",
							"targetType": "person",
							"entity": {
								"domain": "wwperson",
								"fieldDefinitions": [{
									"name": "names",
									"type": "names",
									"options": ["FORENAME", "SURNAME", "NAME_LINK", "ROLE_NAME", "GEN_NAME"]
								}, {
									"name": "types",
									"type": "multiselect",
									"options": ["ARCHETYPE", "AUTHOR", "PSEUDONYM", "READER"]
								}, {
									"name": "gender",
									"type": "select",
									"options": ["UNKNOWN", "FEMALE", "MALE"],
									"defaultValue": "UNKNOWN"
								}, {
									"name": "birthDate",
									"type": "datable"
								}, {
									"name": "deathDate",
									"type": "datable"
								}, {
									"name": "bibliography",
									"type": "text"
								}, {
									"name": "notes",
									"type": "text"
								}, {
									"name": "links",
									"type": "links"
								}, {
									"name": "children",
									"type": "select",
									"options": ["YES", "NO", "UNKNOWN"]
								}, {
									"name": "hasProfession",
									"type": "keyword",
									"options": [{
										"key": "a0be2f24-883a-4ed7-b858-4ebc932751c5",
										"value": "Actress"
									}, {
										"key": "38e9cdd8-dd50-4b26-842e-9558fbf827b2",
										"value": "Biographer"
									}, {
										"key": "a5945c91-c43a-4a07-b7b9-1bd5283bf8fc",
										"value": "Compiler"
									}, {
										"key": "ce71d06a-c96c-4fc2-ad34-2bcde6a513a4",
										"value": "Contributor to periodical press"
									}, {
										"key": "30bc1fb5-a760-46eb-ae08-330588fb4649",
										"value": "Cultural and educational patron"
									}, {
										"key": "6cb452ad-bf58-4188-a0e1-8bbf60d70d81",
										"value": "Editor of periodical press"
									}, {
										"key": "7836e878-ae2e-4353-a922-48d7b758c92e",
										"value": "Embroiderer"
									}, {
										"key": "f556debe-0119-418a-bcbd-9a143b3715dd",
										"value": "Essayist"
									}, {
										"key": "bc4393bb-a5ba-46de-84d3-cfa94449c371",
										"value": "Fiction writer/novelist"
									}, {
										"key": "bec33207-b3e2-4606-b84e-fae01d575e99",
										"value": "Historian"
									}, {
										"key": "df1c5e02-0302-45f0-942d-9c32499c42c4",
										"value": "Journalist"
									}, {
										"key": "2fac9877-7306-4f0d-8142-5d6d51e27f2b",
										"value": "Lady-in-waiting"
									}, {
										"key": "051d7f6d-f6f3-4b95-b874-694745b27b5a",
										"value": "Literary critic"
									}, {
										"key": "d3230405-0dc9-4434-84ba-1121251a2992",
										"value": "Midwife"
									}, {
										"key": "a92b97cc-689d-4237-a38b-77e1f3a2b2b2",
										"value": "Musician/composer"
									}, {
										"key": "2b14a5f7-b5fb-4849-b4a0-4e20c9266ee8",
										"value": "Nun"
									}, {
										"key": "95bad0fe-f2c2-455d-a090-a1fd81c9ad96",
										"value": "Nurse"
									}, {
										"key": "309bae29-05fe-4105-9b2e-c02cd670b449",
										"value": "Painter"
									}, {
										"key": "0f16f571-e8de-4af7-90ce-13cc1b208791",
										"value": "Philosopher"
									}, {
										"key": "7eca015a-4ecb-404c-be1c-c89272d30ff4",
										"value": "Playwright"
									}, {
										"key": "109f324c-68b9-4b6a-b5c0-b3ce86440962",
										"value": "Poet"
									}, {
										"key": "17e45b2f-c21f-4454-b3ad-05c17457ea4b",
										"value": "Publisher"
									}, {
										"key": "c6fc85b3-326d-4db4-8bfe-6394a099341c",
										"value": "Salonnière"
									}, {
										"key": "a9a84392-6030-402e-b095-0a60021af447",
										"value": "Scholar"
									}, {
										"key": "64f7de47-d502-4982-a5cc-51754d913f55",
										"value": "Social-cultural activist"
									}, {
										"key": "dae46d45-cab8-497b-8ea6-f8091f9099f5",
										"value": "Teacher/governess"
									}, {
										"key": "08f540f6-76a2-42e7-908b-f71bc1949455",
										"value": "Translator"
									}, {
										"key": "e62b7eac-f6a5-40c2-9936-d2ec34adb582",
										"value": "Traveller"
									}, {
										"key": "637113b5-bd45-427f-81cb-600110a50c34",
										"value": "Writer"
									}],
									"relation": {
										"type": "wwrelation",
										"isInverseName": false,
										"sourceType": "person",
										"targetType": "keyword",
										"typeId": "50d748bc-166d-464b-b468-16553f13bf54"
									}
								}, {
									"name": "hasMaritalStatus",
									"type": "keyword",
									"options": [{
										"key": "1f1a472d-e800-4edf-9078-6f300aedf268",
										"value": "Abandoned by husband/partner"
									}, {
										"key": "d414321e-5f73-4a2b-bf01-7b204b6c673b",
										"value": "Co-habitation with partner female"
									}, {
										"key": "10fcd455-7c1f-4d07-8665-a6e6d388fcef",
										"value": "Co-habitation with partner male"
									}, {
										"key": "2b412f59-c875-41c5-932a-f79a46fd742a",
										"value": "Divorced"
									}, {
										"key": "d6727ef1-131f-47e0-8565-c3e14c3b8842",
										"value": "Liaison with man"
									}, {
										"key": "9d7e0d30-8283-40e1-b28c-c130d3fb7bb0",
										"value": "Liaison with woman"
									}, {
										"key": "6cd8ddc8-3315-47b0-9914-a4901ef6eabf",
										"value": "Married"
									}, {
										"key": "0439a881-a950-46eb-88e7-d2aa02ed0591",
										"value": "Remarried"
									}, {
										"key": "2bc54474-879c-4ae4-9b14-f857480d740d",
										"value": "Separated"
									}, {
										"key": "06014785-e948-4a67-9eaa-03cd415284f2",
										"value": "Single"
									}, {
										"key": "7398ad7f-5152-4cc5-a45d-d824a0195f8c",
										"value": "Widowed"
									}],
									"relation": {
										"type": "wwrelation",
										"isInverseName": false,
										"sourceType": "person",
										"targetType": "keyword",
										"typeId": "74ca3110-f212-4149-9d6d-80d7cbf8dc7c"
									}
								}, {
									"name": "isCreatorOf",
									"type": "relation",
									"path": "domain/wwdocuments/autocomplete",
									"relation": {
										"type": "wwrelation",
										"isInverseName": true,
										"sourceType": "document",
										"targetType": "person",
										"typeId": "83eb9cc1-ab91-4d6c-8778-b639480f2b9a"
									}
								}],
								"data": {
									"@properties": [{
										"name": "gender",
										"value": "MALE"
									}]
								}
							}
						}]
					}
				}
			}, {
				"name": "hasProfession",
				"targetType": "keyword",
				"entity": {
					"domain": "wwkeyword",
					"fieldDefinitions": [],
					"data": {}
				}
			}]
		}
	}
};