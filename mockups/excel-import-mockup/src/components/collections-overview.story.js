import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { toplevelWrapper, actions } from "./storytools"

import CollectionsOverview from './collections-overview';

var baseData = function () {
  return {
    myVres: [
      {name: "Women writers", state:"published", url:"http://repository.huygens.knaw.nl/v2.1/WomenWriters"},
      {name: "Repertorium Ambtsdragers", state: "unfinished", url:"http://repository.huygens.knaw.nl/v2.1/RepertoriumAmbtsdragers"},
      {name: "Biografisch portaal", state: "published", url:"http://repository.huygens.knaw.nl/v2.1/bioport"},
    ],
    vres: [
      {name: "BIA", url:"http://repository.huygens.knaw.nl/v2.1/BIA"},
      {name: "Migrants", url:"http://repository.huygens.knaw.nl/v2.1/migrants"},
      {name: "CKCC", url:"http://repository.huygens.knaw.nl/v2.1/ckcc"},
    ]
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
