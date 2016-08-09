export default function mappingToJsonLdRml(mapping, vre) {
  return {
  	"@context": {
  		"@vocab": "http://www.w3.org/ns/r2rml#",
  		"rml": "http://semweb.mmlab.be/ns/rml#",
  		"tim": "http://timbuctoo.com/mapping",
  		"predicate": {
  			"@type": "@id"
  		}
  	},
  	"@graph": Object.keys(mapping.collections).map(key => mapSheet(key, mapping.collections[key], vre))
  };
}
var s = {
  "archetypeName": "persons",
  "mappings": [
    {
      "property": "name",
      "variable": [
        {
          "variableName": "Voornaam"
        }
      ],
      "defaultValue": [],
      "confirmed": true,
      "valueMappings": {}
    },
    {
      "property": "Foo",
      "variable": [
        {
          "variableName": "Achternaam"
        }
      ],
      "defaultValue": [],
      "confirmed": true,
      "valueMappings": {}
    },
    {
      "property": "isRelatedTo",
      "variable": [
        {
          "variableName": "Voornaam",
          "targetCollection": "mockpersons",
          "targetVariableName": "Voornaam"
        }
      ],
      "defaultValue": [],
      "confirmed": true,
      "valueMappings": {}
    }
  ]
}

function makeMapName(localName) {
  return `tim:s/${localName}map`;
}

function mapSheet(key, sheet, vre) {
  // console.log(JSON.stringify(sheet, undefined, 2));
  //FIXME: move logicalSource and subjectMap under the control of the server
  return {
    "@id": makeMapName(key),
    "rml:logicalSource": {
			"rml:source": {
				"tim:rawCollection": key,
				"tim:vreName": vre
			}
		},
    "subjectMap": {
			"class": `http://timbuctoo.com/${vre}/${key}`,
			"template": `http://timbuctoo.com/${vre}/${key}/{tim_id}`
		},
    "predicateObjectMap": sheet.mappings.map(makePredicateObjectMap)
  };
}

function makePredicateObjectMap(mapping) {
  let property = mapping.property;
  let variable = mapping.variable[0];
  if (variable.targetCollection) {
    return {
      "objectMap": {
        "reference": {
          "joinCondition": {
            "child": variable.variableName,
            "parent": variable.targetVariableName
          },
          "parentTriplesMap": makeMapName(variable.targetCollection)
        }
      },
      "predicate": `http://timbuctoo.com/${property}`
    }
  } else {
    return {
      "objectMap": {
        "column": variable.variableName
      },
      "predicate": `http://timbuctoo.com/${property}`
    }
  }
}
