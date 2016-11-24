import React from "react";
import CollectionTabs from "./collection-tabs";
import Message from "./message";

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
    const {
      params: { vreId },
      vre,
      tabs,
      showCollectionsAreConnectedMessage,
      uploadedFilename
    } = this.props;
    const { onCloseMessage, onSelectCollection } = this.props;

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

        <pre>
          {vreId}<br />
          {JSON.stringify(tabs, null, 4)}
        </pre>
      </div>
    );
  }
}

export default ConnectData;