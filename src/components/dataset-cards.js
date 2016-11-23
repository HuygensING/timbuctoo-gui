import React from 'react';
import DataSetCard from './datasetCard.jsx';

export default function(props) {
  const { vres, caption, userId, searchGuiUrl, mine, onContinueMapping } = props;

  return (
    <div className="container">
      <div className="basic-margin">
        {props.children}
        <h3>{caption}</h3>
      </div>
      <div className="big-margin">
        { Object.keys(vres).map((vre) => (
          <DataSetCard key={vre} mine={mine} published={vres[vre].published} searchGuiUrl={searchGuiUrl}
                       onContinueMapping={onContinueMapping}
                       userId={userId} vreId={vres[vre].name} caption={vres[vre].name.replace(/^[a-z0-9]+_/, "")} />
        ))}
     </div>
    </div>
  )
};