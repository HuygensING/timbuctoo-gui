import React from 'react';
import { storiesOf } from '@kadira/storybook';
import {toplevelWrapper, actions} from "../storytools"

import Relation from './relation';

const data = {
  collectionData: {
    collection: "mockpersons",
    variables: ["Naam", "geboortedatum", "schreef", "is gerelateerd aan"]
  },
  name: "hasWritten",
  importData: {
    sheets: [
      {
        collection: "mockpersons",
        variables: ["Naam", "geboortedatum", "schreef", "is gerelateerd aan"]
      },
      {
        collection: "mockdocuments",
        variables: ["title", "publishData"]
      }
    ],
  },
  mappingData: {
    archetypeName: "persons",
    mappings: [
    ],
    customProperties: [
      {name: "hasWritten"},
      {name: "isRelatedTo"},
    ]
  },
  mappings: {
    collections: {
      "mockpersons": {
        archetypeName: "persons"
      },
      "mockdocuments": {
        archetypeName: "documents"
      }
    }
  },
  archetype: {
    persons: [
      {
        "name": "hasWritten",
        "type": "relation",
        "quicksearch": "/v2.1/domain/documents/autocomplete",
        "relation": {
          "direction": "OUT",
          "outName": "hasWritten",
          "inName": "wasWrittenBy",
          "targetCollection": "documents",
          "relationCollection": "relations",
          "relationTypeId": "bba10d37-86cc-4f1f-ba2d-016af2b21aa4"
        }
      },
      {
        "name": "isRelatedTo",
        "type": "relation",
        "quicksearch": "/v2.1/domain/persons/autocomplete",
        "relation": {
          "direction": "OUT",
          "outName": "isRelatedTo",
          "inName": "isRelatedTo",
          "targetCollection": "persons",
          "relationCollection": "relations",
          "relationTypeId": "cba10d37-86cc-4f1f-ba2d-016af2b21aa5"
        }
      },
    ]
  }
};


storiesOf('relation', module)
  .add('isRelatedTo: nothing selected', function () {
    data.name = "isRelatedTo";
    data.mappingData.mappings = [];
    return <Relation {...data} {...actions} />
  })
  .add('isRelatedTo: variable name selected', function () {
    data.name = "isRelatedTo";
    data.mappingData.mappings[0] = {
      "property": "isRelatedTo",
      "variable": [
        {
          "variableName": "is gerelateerd aan",
        }
      ],
      "defaultValue": [],
      "confirmed": true,
      "valueMappings": {}
    };
    return <Relation {...data} {...actions} />
  })
  .add('isRelatedTo: variable name and target collection selected', function () {
    data.name = "isRelatedTo";
    data.mappingData.mappings[0] = {
      "property": "isRelatedTo",
      "variable": [
        {
          "variableName": "is gerelateerd aan",
          "targetCollection": "mockpersons",
        }
      ],
      "defaultValue": [],
      "confirmed": true,
      "valueMappings": {}
    };
    return <Relation {...data} {...actions} />
  })
  .add('isRelatedTo: all selected', function () {
    data.name = "isRelatedTo";
    data.mappingData.mappings[0] = {
      "property": "isRelatedTo",
      "variable": [
        {
          "variableName": "is gerelateerd aan",
          "targetCollection": "mockpersons",
          "targetVariableName": "Naam"
        }
      ],
      "defaultValue": [],
      "confirmed": true,
      "valueMappings": {}
    };
    return <Relation {...data} {...actions} />
  })
  .add('hasWritten: all selected', function () {
    data.name = "hasWritten";
    data.mappingData.mappings[0] = {
      "property": "hasWritten",
      "variable": [
        {
          "variableName": "schreef",
          "targetCollection": "mockdocuments",
          "targetVariableName": "title"
        }
      ],
      "defaultValue": [],
      "confirmed": true,
      "valueMappings": {}
    };
    return <Relation {...data} {...actions} />
  })
