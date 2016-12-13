import React from "react";
import UploadButton from "./upload-button";

export default function(props) {
  const {
    newVreName,
    onUploadFileSelect,
    uploadStatus
  } = props;

  const finalVreName = newVreName ?
    newVreName.replace(/\s*$/, "") : null;

  return (
    <div>
      <div className="container basic-margin">
        <h2 className="small-margin">Create a new dataset</h2>
        <div className="col-md-9">To create e new dataset, please enter some basic
          information about your project.
        </div>
        <div className="col-md-3 alert alert-info alert-dismissible" role="alert">
          <span className="glyphicon glyphicon-play-circle" /> Watch a 3 min video to create a new dataset.
        </div>
      </div>
      <div className="container basic-margin">
        <h4>Upload Excel file</h4>
        <UploadButton
          classNames={["btn", "btn-primary"]}
          uploadStatus={uploadStatus}
          vreName={finalVreName}
          label="Browse..."
          float="none"
          onUploadFileSelect={onUploadFileSelect}
        />
      </div>
    </div>
  )
}