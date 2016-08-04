import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { toplevelWrapper, actions } from "./storytools"

import CollectionsOverview from './collections-overview';

var baseData = function () {
  return {
    vres: [
      {name: "Women writers"},
      {name: "Repertorium Ambtsdragers", state: "unfinished"},
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
