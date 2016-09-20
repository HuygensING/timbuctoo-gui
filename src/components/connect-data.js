import React from "react";
import CollectionTable from "./collection-table";
import CollectionForm from "./collection-form";
import CollectionIndex from "./collection-index";
import Message from "./message";
import UploadButton from "./upload-button";

class ConnectData extends React.Component {

  render() {
    const {
      activeCollection,
      uploadedFileName,
      collectionTabs,
      rows,
      headers,
      archetypeFields,
      availableArchetypes,
      propertyMappings,
      customPropertyMappings,
      availableCollectionColumnsPerArchetype,
      nextUrl,
      publishing,
      publishErrors,
      showCollectionsAreConnectedMessage,
      sheets,
      targetableVres

    } = this.props;

    const {
      onIgnoreColumnToggle,
      onSelectCollection,
      onSetFieldMapping,
      onRemoveCustomProperty,
      onConfirmFieldMappings,
      onUnconfirmFieldMappings,
      onAddCustomProperty,
      onClearFieldMapping,
      onLoadMoreClick,
      onPublishData,
      onUploadFileSelect,
      onCloseMessage
    } = this.props;

    const allMappingsAreComplete = collectionTabs.filter((tab) => tab.complete).length === collectionTabs.length;

    const publishFailedMessage = publishErrors ? (
      <Message alertLevel="danger" dismissible={false}>
        <UploadButton classNames={["btn", "btn-danger", "pull-right", "btn-xs"]} label="Re-upload"
                      onUploadFileSelect={onUploadFileSelect} />
        <span className="glyphicon glyphicon-exclamation-sign" />{" "}
        Publish failed. Please fix the mappings or re-upload the data.
      </Message>
    ) : null;

    const collectionsAreConnectedMessage = sheets && showCollectionsAreConnectedMessage ?
      <Message alertLevel="info" dismissible={true} onCloseMessage={() => onCloseMessage("showCollectionsAreConnectedMessage")}>
        {sheets.map((sheet) => <em key={sheet.collection}>{sheet.collection}</em>)
          .reduce((accu, elem) => accu === null ? [elem] : [...accu, ' and ', elem], null)
        } from <em>{uploadedFileName}</em> are connected to the Timbuctoo Archetypes.
      </Message> : null;

    return (
      <div>
        <div className="container basic-margin">
          <h2 className="small-margin">Upload and connect your dataset</h2>
          {collectionsAreConnectedMessage}
          {publishFailedMessage}
          <p>Connect the excel columns to the properties of the Archetypes</p>
        </div>

        <CollectionIndex collectionTabs={collectionTabs} onSelectCollection={onSelectCollection} />

        <CollectionForm columns={headers}
                        collectionName={activeCollection}
                        archetypeFields={archetypeFields}
                        availableArchetypes={availableArchetypes}
                        availableCollectionColumnsPerArchetype={availableCollectionColumnsPerArchetype}
                        propertyMappings={propertyMappings}
                        customPropertyMappings={customPropertyMappings}
                        onSetFieldMapping={onSetFieldMapping}
                        onClearFieldMapping={onClearFieldMapping}
                        onRemoveCustomProperty={onRemoveCustomProperty}
                        onConfirmFieldMappings={onConfirmFieldMappings}
                        onUnconfirmFieldMappings={onUnconfirmFieldMappings}
                        onAddCustomProperty={onAddCustomProperty}
                        targetableVres={targetableVres} />

        <div className="container big-margin">
          <button onClick={onPublishData} className="btn btn-warning btn-lg pull-right" type="button" disabled={!allMappingsAreComplete || publishing}>
            {publishing ? "Publishing" :  "Publish dataset"}
          </button>
        </div>

        <div className="container big-margin">
          <p className="from-excel">
            <img src="images/icon-excel.svg" alt=""/>{" "}
            <em>{activeCollection}</em> from {uploadedFileName}
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