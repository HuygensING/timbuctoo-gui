import {isBasicProperty} from "../validators/property-mappings";

const defaultNamespace = "http://timbuctoo.com/";

const rmlTemplate =  {
  "@context": {
    "@vocab": "http://www.w3.org/ns/r2rml#",
    "rml": "http://semweb.mmlab.be/ns/rml#",
    "tim": "http://timbuctoo.com/mapping#",
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

const makeMapName = (vre, localName) => `http://timbuctoo.com/mapping/${vre}/${localName}`;

const mapBasicProperty = (predicateObjectMap) => ({
  "objectMap": {
    "column": predicateObjectMap.objectMap.column
  },
  "predicate": `${predicateObjectMap.predicateNamespace || defaultNamespace}${predicateObjectMap.predicate}`
});

const makePredicateObjectMap = (vre, predicateObjectMap) => {
  if (isBasicProperty(predicateObjectMap)) {
    return mapBasicProperty(predicateObjectMap);
  }
  return null;
};

const mapCollection = (vre, archetypeName, collectionName, predicateObjectMaps) => ({
  "@id": makeMapName(vre, collectionName),
  "http://www.w3.org/2000/01/rdf-schema#subClassOf": `http://timbuctoo.com/${archetypeName.replace(/s$/, "")}`,
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

export default (vre, collectionMappings, predicateObjectMappings) => ({
  ...rmlTemplate,
  "@graph": Object.keys(predicateObjectMappings)
    .map((collectionName) => mapCollection(vre, collectionMappings[collectionName].archetypeName, collectionName, predicateObjectMappings[collectionName]))
})
