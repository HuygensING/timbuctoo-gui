import React from 'react';
import { storiesOf } from '@kadira/storybook';
import {toplevelWrapper, actions} from "./storytools"

import ArchetypeMappings from './archetype-mappings';

var baseData = function () {
  return {
    importData: {
      "filename": "test.xlsx",
      "sheets": [
        { "collection": "mockpersons" },
        { "collection": "mockdocuments" }
      ]
    },
    archetype: {
      "legislations": []
    },
    mappings: {
      "collections": {
        "mockpersons": {
          "archetypeName": null
        },
        "mockdocuments": {
          "archetypeName": null
        }
      }
    }
  }
}

storiesOf('archetype-mappings', module)
  .addDecorator(toplevelWrapper)
  .add('empty', function () {
    var data = baseData();
    return <ArchetypeMappings
      {...data}
      {...actions} />
  })
  .add('withOneFilled', function () {
    var data = baseData();
    data.mappings.collections.mockpersons.archetypeName = "legislations";

    return <ArchetypeMappings
      {...data}
      {...actions} />
  })
  .add('withAllFilled', function () {
    var data = baseData();
    data.mappings.collections.mockpersons.archetypeName = "legislations";
    data.mappings.collections.mockdocuments.archetypeName = "legislations";

    return <ArchetypeMappings
      {...data}
      {...actions} />
  });
