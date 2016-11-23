import React from "react";
import UploadButton from "./upload-button";
import DatasetCards from "./dataset-cards"

function CollectionOverview(props) {
  const { onUploadFileSelect, userId, uploadStatus, vres, searchGuiUrl, onContinueMapping } = props;

  const uploadButton = (
    <UploadButton
      classNames={["btn", "btn-lg", "btn-primary", "pull-right"]}
      glyphicon="glyphicon glyphicon-cloud-upload"
      uploadStatus={uploadStatus}
      label="Upload new dataset"
      onUploadFileSelect={onUploadFileSelect} />
  );

  return (
    <div>
      <div className="container">
        <DatasetCards userId={userId} caption="My datasets" vres={vres} mine={true} searchGuiUrl={searchGuiUrl}
          onContinueMapping={onContinueMapping}>
          {uploadButton}
        </DatasetCards>
      </div>
    </div>
  );
}

export default CollectionOverview;