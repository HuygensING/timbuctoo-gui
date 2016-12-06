import React from "react";
import CollectionTabs from "./collection-tabs";
import Message from "./message";
import CollectionTable from "./collection-table"
import CollectionForm from "./collection-form/collection-form";
import UploadButton from "./upload-button";

class ConnectData extends React.Component {

  componentWillReceiveProps(nextProps) {
    const { onFetchBulkUploadedMetadata, params: { serializedArchetypeMappings }, onSelectCollection } = this.props;
    const { firstMappedCollection } = nextProps;

    if (this.props.params.vreId !== nextProps.params.vreId) {
      // Triggers fetch data from server based on vreId from route.
      onFetchBulkUploadedMetadata(nextProps.params.vreId, JSON.parse(decodeURIComponent(serializedArchetypeMappings)));
    } else if (firstMappedCollection) {
      // If the currently active collection is not mapped, show the first one that _is_ mapped
      onSelectCollection(firstMappedCollection);
    }
  }

  componentDidMount() {
    const {
      onFetchBulkUploadedMetadata, tabs, vre, vreId, params: { serializedArchetypeMappings },
      firstMappedCollection, onSelectCollection
    } = this.props;

    if (tabs.length === 0 || vre !== vreId) {
      // Triggers fetch data from server based on vreId from route.
      onFetchBulkUploadedMetadata(vreId, JSON.parse(decodeURIComponent(serializedArchetypeMappings)));
    } else if (firstMappedCollection) {
      // If the currently active collection is not mapped, show the first one that _is_ mapped
      onSelectCollection(firstMappedCollection);
    }
  }

  render() {
    const { onCloseMessage, onSelectCollection, onLoadMoreClick, onPublishData, onUploadFileSelect } = this.props;

    const { onAddPredicateObjectMap, onRemovePredicateObjectMap, onAddCustomProperty, onRemoveCustomProperty } = this.props;

    const {
      params: { vreId },
      vre,
      tabs,
      showCollectionsAreConnectedMessage,
      uploadedFilename,
      publishEnabled,
      publishStatus,
      publishErrors,
      uploadStatus,
      availableArchetypes,
      customProperties,
      availableCollectionColumnsPerArchetype,
      rmlPreviewData,
      targetableVres
    } = this.props;

    // table view properties
    const { rows, headers, nextUrl, activeCollection } = this.props;

    // form view properties
    const { archetypeFields, columns, predicateObjectMappings } = this.props;

    if (!archetypeFields || tabs.length === 0 || vre !== vreId) { return null; }


    const rmlPreviewBlock = rmlPreviewData ? (
      <div style={{position: "absolute", zIndex: "10", width: "100%", top: "90px"}}>
        <pre style={{width: "80%", margin: "0 auto", backgroundColor: "#ddd"}}>
          {JSON.stringify(rmlPreviewData, null, 2)}
        </pre>
      </div>
    ) : null;

    const publishFailedMessage = publishErrors ? (
      <Message alertLevel="danger" dismissible={false}>
        <UploadButton classNames={["btn", "btn-danger", "pull-right", "btn-xs"]} label="Re-upload"
                      onUploadFileSelect={onUploadFileSelect} uploadStatus={uploadStatus} />
        <span className="glyphicon glyphicon-exclamation-sign" />{" "}
        Publish failed. Please fix the mappings or re-upload the data.
      </Message>
    ) : null;

    const collectionsAreConnectedMessage = showCollectionsAreConnectedMessage && uploadedFilename ?
      <Message alertLevel="info" dismissible={true} onCloseMessage={() => onCloseMessage("showCollectionsAreConnectedMessage")}>
        {tabs.map((tab) => <em key={tab.collectionName}>{tab.collectionName}</em>)
          .reduce((accu, elem) => accu === null ? [elem] : [...accu, ' and ', elem], null)
        } from <em>{uploadedFilename}</em> {tabs.length === 1 ? "is" : "are" } connected to the Timbuctoo Archetypes.
      </Message> : null;

    return (
      <div>
        {rmlPreviewBlock}
        <div className="container basic-margin">
          <h2 className="small-margin">Upload and connect your dataset</h2>
          {collectionsAreConnectedMessage}
          {publishFailedMessage}
          <p>Connect the excel columns to the properties of the Archetypes</p>
        </div>
        <CollectionTabs collectionTabs={tabs} onSelectCollection={onSelectCollection} />
        <CollectionForm archetypeFields={archetypeFields} columns={columns}
                        availableArchetypes={availableArchetypes}
                        availableCollectionColumnsPerArchetype={availableCollectionColumnsPerArchetype}
                        customProperties={customProperties}
                        onAddCustomProperty={onAddCustomProperty}
                        onRemoveCustomProperty={onRemoveCustomProperty}
                        predicateObjectMappings={predicateObjectMappings}
                        onAddPredicateObjectMap={onAddPredicateObjectMap}
                        onRemovePredicateObjectMap={onRemovePredicateObjectMap}
                        targetableVres={targetableVres} />

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
            onLoadMoreClick={(url) => onLoadMoreClick(url, activeCollection)} />
        </div>
      </div>
    );
  }
}

export default ConnectData;