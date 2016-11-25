import React from "react";
import CollectionTabs from "./collection-tabs";
import Message from "./message";
import CollectionTable from "./collection-table"
import CollectionForm from "./collection-form/collection-form";


class ConnectData extends React.Component {

  componentWillReceiveProps(nextProps) {
    const { onFetchBulkUploadedMetadata, params: { serializedArchetypeMappings } } = this.props;
    // Triggers fetch data from server based on vreId from route.
    if (this.props.params.vreId !== nextProps.params.vreId) {
      onFetchBulkUploadedMetadata(nextProps.params.vreId, JSON.parse(decodeURIComponent(serializedArchetypeMappings)));
    }
  }

  componentDidMount() {
    const { onFetchBulkUploadedMetadata, tabs, vre, vreId, params: { serializedArchetypeMappings }  } = this.props;
    if (tabs.length === 0 || vre !== vreId) {
      onFetchBulkUploadedMetadata(vreId, JSON.parse(decodeURIComponent(serializedArchetypeMappings)));
    }
  }

  render() {
    const { onCloseMessage, onSelectCollection, onLoadMoreClick, onIgnoreColumnToggle, onPublishData } = this.props;

    const { onAddPredicateObjectMap, onRemovePredicateObjectMap, onAddCustomProperty, onRemoveCustomProperty } = this.props;

    const {
      params: { vreId },
      vre,
      tabs,
      showCollectionsAreConnectedMessage,
      uploadedFilename,
      publishEnabled,
      publishStatus,
      availableArchetypes,
      customProperties,
      availableCollectionColumnsPerArchetype
    } = this.props;

    // table view properties
    const { rows, headers, nextUrl, activeCollection } = this.props;

    // form view properties
    const { archetypeFields, columns, ignoredColumns, predicateObjectMappings } = this.props;

    if (tabs.length === 0 || vre !== vreId) { return null; }

    const collectionsAreConnectedMessage = showCollectionsAreConnectedMessage && uploadedFilename ?
      <Message alertLevel="info" dismissible={true} onCloseMessage={() => onCloseMessage("showCollectionsAreConnectedMessage")}>
        {tabs.map((tab) => <em key={tab.collectionName}>{tab.collectionName}</em>)
          .reduce((accu, elem) => accu === null ? [elem] : [...accu, ' and ', elem], null)
        } from <em>{uploadedFilename}</em> {tabs.length === 1 ? "is" : "are" } connected to the Timbuctoo Archetypes.
      </Message> : null;

    return (
      <div>
        <div className="container basic-margin">
          <h2 className="small-margin">Upload and connect your dataset</h2>
          {collectionsAreConnectedMessage}
          {/*publishFailedMessage*/}
          <p>Connect the excel columns to the properties of the Archetypes</p>
        </div>
        <CollectionTabs collectionTabs={tabs} onSelectCollection={onSelectCollection} />
        <CollectionForm archetypeFields={archetypeFields} columns={columns} ignoredColumns={ignoredColumns}
                        availableArchetypes={availableArchetypes}
                        availableCollectionColumnsPerArchetype={availableCollectionColumnsPerArchetype}
                        customProperties={customProperties}
                        onAddCustomProperty={onAddCustomProperty}
                        onRemoveCustomProperty={onRemoveCustomProperty}
                        predicateObjectMappings={predicateObjectMappings}
                        onAddPredicateObjectMap={onAddPredicateObjectMap}
                        onRemovePredicateObjectMap={onRemovePredicateObjectMap} />

        <div className="container big-margin">
          <button onClick={onPublishData} className="btn btn-warning btn-lg pull-right" type="button" disabled={!publishEnabled}>
            {publishStatus}
          </button>
        </div>

        <div className="container big-margin">
          <p className="from-excel">
            <img src="images/icon-excel.svg" alt=""/>{" "}
            <em>{activeCollection}</em> {uploadedFilename ? `from ${uploadedFilename}` : ""}
          </p>

          <CollectionTable
            rows={rows}
            headers={headers}
            nextUrl={nextUrl}
            onIgnoreColumnToggle={(header) => onIgnoreColumnToggle(activeCollection, header)}
            onLoadMoreClick={(url) => onLoadMoreClick(url, activeCollection)} />
        </div>
      </div>
    );
  }
}

export default ConnectData;