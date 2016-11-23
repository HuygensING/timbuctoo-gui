import React from "react";
import SelectField from "./fields/select-field";
import Message from "./message";

class ConnectToArchetype extends React.Component {


  componentWillReceiveProps(nextProps) {
    const { onFetchBulkUploadedMetadata } = this.props;
    // Triggers fetch data from server based on id from route.
    if (this.props.params.vreId !== nextProps.params.vreId) {
      onFetchBulkUploadedMetadata(nextProps.params.vreId);
    }
  }

  componentDidMount() {
    const { onFetchBulkUploadedMetadata, collections, vre, vreId } = this.props;
    if (!collections || vre !== vreId) {
      onFetchBulkUploadedMetadata(this.props.params.vreId);
    }
  }


  render() {
    const { vreId, vre, collections } = this.props;

    return (
      <div>
        { vreId }
        {vre}
        <pre>
          {JSON.stringify(collections, null, 4)}
          </pre>
      </div>
    )
  }
}

export default ConnectToArchetype;