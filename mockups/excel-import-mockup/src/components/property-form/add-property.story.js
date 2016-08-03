import React from 'react';
import { storiesOf } from '@kadira/storybook';
import {toplevelWrapper, actions} from "../storytools"

import AddProperty from './add-property';

storiesOf('add-property', module)
  .add('', function () {
    var data = {
      mappings: {
        collections: {
          "the active collections": {
            archetypeName: "persons"
          }
        }
      },
      importData: {
        activeCollection: "the active collections"
      },
      archetype: {
        "persons": [
          {
            "name": "isPersonLanguageOf",
            "type": "relation",
            "quicksearch": "/v2.1/domain/persons/autocomplete",
            "relation": {
              "direction": "IN",
              "outName": "hasPersonLanguage",
              "inName": "isPersonLanguageOf",
              "targetCollection": "persons",
              "relationCollection": "relations",
              "relationTypeId": "bba10d37-86cc-4f1f-ba2d-016af2b21aa4"
            }
          },
        ]
      }
    };
    return <AddProperty {...data} {...actions} />
  });
