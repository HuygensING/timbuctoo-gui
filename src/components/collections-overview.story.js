import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { toplevelWrapper, actions } from "./storytools"

import CollectionsOverview from './collections-overview';

var baseData = function () {
  return {
    userdata: {
      myVres: {
        "WomenWriters": {name: "Women writers", state:"published", url:"http://repository.huygens.knaw.nl/v2.1/WomenWriters"},
        "RepAmbt": {name: "Repertorium Ambtsdragers", state: "unfinished", url:"http://repository.huygens.knaw.nl/v2.1/RepertoriumAmbtsdragers"},
        "Bioport": {name: "Biografisch portaal", state: "published", url:"http://repository.huygens.knaw.nl/v2.1/bioport"},
      },
      vres: {
        "BIA": {name: "BIA", url:"http://repository.huygens.knaw.nl/v2.1/BIA"},
        "EM": {name: "Migrants", url:"http://repository.huygens.knaw.nl/v2.1/migrants"},
        "ckcc": {name: "CKCC", url:"http://repository.huygens.knaw.nl/v2.1/ckcc"},
      }
    }
  }
}

storiesOf('collections-overview', module)
  .addDecorator(toplevelWrapper)
  .add('', function () {
    var data = baseData();
    return <CollectionsOverview
      {...data}
      {...actions}
      />
  });
