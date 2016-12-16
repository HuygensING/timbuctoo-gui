import React from "react";
import cx from "classnames";
import camel2label from "../util/camel2label";

class CollectionTabs extends React.Component {

  render() {
    const { collectionTabs, onSelectCollection } = this.props;

    return (
      <div className="container basic-margin">
        <ul className="nav nav-tabs" role="tablist">
          {collectionTabs.map((collectionTab) => (
            <li key={collectionTab.collectionName} className={cx({active: collectionTab.active})}>
              <a onClick={() => collectionTab.active ? false : onSelectCollection(collectionTab.collectionName)}
                 style={{cursor: collectionTab.active ? "default" : "pointer"}}>
                {camel2label(collectionTab.archetypeName)}{" "}
                {collectionTab.complete ? <span className="glyphicon glyphicon-ok" /> : null}
                <span className="excel-tab"><img src="images/icon-excel.svg" className="excel-icon" alt=""/> {collectionTab.collectionName}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
export default CollectionTabs;