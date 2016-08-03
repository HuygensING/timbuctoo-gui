import React from 'react';
import { storiesOf } from '@kadira/storybook';
import {toplevelWrapper, actions } from "./storytools"

import DatasheetMappings from './datasheet-mappings';

var baseData = function () {
  return {
    importData: {
      "filename": "test.xlsx",
      "sheets": [
        {
          "collection": "mockpersons",
          "variables": [],
          rows: []
        }
      ],
      activeCollection: "mockpersons"
    },
    archetype: {
      "legislations": []
    },
    mappings: {
      "collections": {
        "mockpersons": {
          "archetypeName": "legislations",
          "mappings": [],
          "ignoredColumns": [],
          "customProperties": []
        }
      }
    },
  }
}

storiesOf('datasheet-mappings', module)
  .addDecorator(toplevelWrapper)
  .add('', function () {
    var data = baseData();
    return <DatasheetMappings
      {...data}
      {...actions}
      />
  });
