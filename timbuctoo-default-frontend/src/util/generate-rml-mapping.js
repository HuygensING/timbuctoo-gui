import {isBasicProperty} from "../accessors/property-mappings";

const defaultNamespace = "http://timbuctoo.huygens.knaw.nl/";

const nameSpaces = {
  surname: "http://www.tei-c.org/ns/1.0/",
  forename: "http://www.tei-c.org/ns/1.0/",
  roleName: "http://www.tei-c.org/ns/1.0/",
  nameLink: "http://www.tei-c.org/ns/1.0/",
  genName: "http://www.tei-c.org/ns/1.0/",
  sameAs: "http://www.w3.org/2002/07/owl#"
};

const dataTypes = {
  datable: "http://timbuctoo.huygens.knaw.nl/types/datable",
  text: "https://www.w3.org/TR/2001/REC-xmlschema-2-20010502/#string",
  names: "https://www.w3.org/TR/2001/REC-xmlschema-2-20010502/#string"
};

const rmlTemplate =  {
  "@context": {
    "@vocab": "http://www.w3.org/ns/r2rml#",
    "rml": "http://semweb.mmlab.be/ns/rml#",
    "tim": "http://timbuctoo.huygens.knaw.nl/mapping#",
    "http://www.w3.org/2000/01/rdf-schema#subClassOf": {
      "@type": "@id"
    },
      "predicate": {
      "@type": "@id"
    },
      "termType": {
      "@type": "@id"
    },
      "parentTriplesMap": {
      "@type": "@id"
    },
      "class": {
      "@type": "@id"
    },
      "object": {
      "@type": "@id"
    }
  }
};

const getNameSpaceFor = (predicate) =>
  typeof nameSpaces[predicate]  === "undefined" ? defaultNamespace : nameSpaces[predicate];

const getDataTypeFor = (propertyType) =>
  typeof dataTypes[propertyType] === "undefined" ? undefined : dataTypes[propertyType];

const makeMapName = (vre, localName) => `http://timbuctoo.huygens.knaw.nl/mapping/${vre}/${localName}`;

const mapBasicProperty = (predicateObjectMap) => ({
  "objectMap": {
    "column": predicateObjectMap.objectMap.column,
    "termType": predicateObjectMap.propertyType === "sameAs" ? "http://www.w3.org/ns/r2rml#IRI" : undefined,
    "datatype": predicateObjectMap.propertyType === "sameAs" ? undefined : {
      "@id": getDataTypeFor(predicateObjectMap.propertyType)
    }
  },
  "predicate": `${getNameSpaceFor(predicateObjectMap.predicate)}${predicateObjectMap.predicate}`
});

const mapRelationProperty = (vre, predicateObjectMap) => ({
  "objectMap": {
    "joinCondition": predicateObjectMap.objectMap.joinCondition,
    "parentTriplesMap": `http://timbuctoo.huygens.knaw.nl/mapping/${vre}/${predicateObjectMap.objectMap.parentTriplesMap}`
  },
  "predicate": `${getNameSpaceFor(predicateObjectMap.predicate)}${predicateObjectMap.predicate}`
});

const makePredicateObjectMap = (vre, predicateObjectMap) => {
  if (isBasicProperty(predicateObjectMap)) {
    return mapBasicProperty(predicateObjectMap);
  }

  if (predicateObjectMap.propertyType === "relation") {
    return mapRelationProperty(vre, predicateObjectMap);
  }

  return null;
};

const mapCollection = (vre, archetypeName, collectionName, predicateObjectMaps) => ({
  "@id": makeMapName(vre, collectionName),
  "http://www.w3.org/2000/01/rdf-schema#subClassOf": `http://timbuctoo.huygens.knaw.nl/${archetypeName.replace(/s$/, "")}`,
  "rml:logicalSource": {
    "rml:source": {
      "tim:rawCollection": collectionName,
      "tim:vreName": vre
    }
  },
  "subjectMap": {
    "template": `${makeMapName(vre, collectionName)}/{tim_id}`
  },
  "predicateObjectMap": [
    {"object": makeMapName(vre, collectionName), "predicate": "http://www.w3.org/1999/02/22-rdf-syntax-ns#type"}
  ].concat(predicateObjectMaps.map((pom) => makePredicateObjectMap(vre, pom)).filter((pom) => pom !== null) )
});

export default (vre, collectionMappings, predicateObjectMappings) => {
  return {
    ...rmlTemplate,
    "@graph": Object.keys(collectionMappings)
      .filter((collectionName) => collectionMappings[collectionName].archetypeName !== null)
      .map((collectionName) => mapCollection(vre, collectionMappings[collectionName].archetypeName, collectionName, predicateObjectMappings[collectionName] || []))
  };
}

export { nameSpaces, defaultNamespace }