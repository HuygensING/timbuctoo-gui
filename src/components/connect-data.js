import React from "react";
import CollectionTabs from "./collection-tabs";

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
    const { params: { vreId }, vre, tabs } = this.props;
    const { onSelectCollection } = this.props;

    if (tabs.length === 0 || vre !== vreId) { return null; }

    return (
      <div>
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