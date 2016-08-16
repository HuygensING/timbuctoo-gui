import React from "react";
import { storiesOf } from "@kadira/storybook";
import {toplevelWrapper, actions } from "./storytools";

import DatasheetMappings from "./datasheet-mappings";

var baseData = function () {
  return {
    importData: {
      "filename": "test.xlsx",
      "sheets": [
        {
          "collection": "mockpersons",
          "variables": ["a", "b"],
          rows: [
            [{value: "valueA", error: undefined}, {value: "valueB", error: "some Error"}],
            [{value: "valueA", error: undefined}, {value: "valueB", error: undefined}]
          ],
          nextUrl: "some url"
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
  };
};

storiesOf("datasheet-mappings", module)
  .addDecorator(toplevelWrapper)
  .add("", function () {
    var data = baseData();
    return (<DatasheetMappings
      {...data}
      {...actions}
    />);
  });
