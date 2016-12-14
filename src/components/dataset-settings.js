import React from "react";
import UploadButton from "./upload-button";
import PublishState from "../util/publish-state";

const getMappingState = (publishState, uploadStatus) => {
  switch (publishState) {
    case PublishState.MAPPING_CREATION:
    case PublishState.MAPPING_CREATION_AFTER_ERRORS:
      return {
        nameEditDisabled: false,
        continueDisabled: false,
        editDisabled: false,
        editPlaceHolder: null,
        statusMessage: "Upload is finished. Please enter some basic information about your project",
        title: "Dataset settings",
        uploadButtonStatus: uploadStatus || null,
        uploadButtonLabel: "Upload a new file"
      };
    case PublishState.UPLOADING:
      return {
        nameEditDisabled: false,
        continueDisabled: true,
        editDisabled: false,
        editPlaceHolder: null,
        statusMessage: "Uploading data",
        title: "Dataset settings",
        uploadButtonStatus: uploadStatus || "Uploading please wait..."
      };
    case PublishState.MAPPING_EXECUTION:
      return {
        nameEditDisabled: true,
        continueDisabled: true,
        editDisabled: true,
        editPlaceHolder: "This dataset is currently being published an may not be edited",
        statusMessage: "This dataset is currently being published an may not be edited",
        title: "Dataset settings",
        uploadButtonStatus: "This dataset is currently being published an may not be edited"
      };
  }
  return  {
    nameEditDisabled: false,
    continueDisabled: true,
    editDisabled: true,
    editPlaceholder: "Please upload a dataset first...",
    uploadButtonStatus: uploadStatus || null,
    statusMessage: "To create e new dataset, please enter some basic information about your project",
    title: "Create a new dataset",
    uploadButtonLabel: "Browse..."
  }
};

class DatasetSettings extends  React.Component {

  onChange(ev) {
    const sanitized = ev.target.value
      .replace(/[^a-zA-Z\s\-]+/, "")
      .replace(/^\s*/, "");

    this.props.onSetNewVreName(sanitized);

  }

  render() {
    const {
      newVreName,
      onUploadFileSelect,
      uploadStatus,
      publishState,
      vreId,
      uploadedFileName,
      onContinueMapping
    } = this.props;

    const finalVreName = newVreName ?
      newVreName.replace(/\s*$/, "") : null;

    const {
      nameEditDisabled,
      continueDisabled,
      editPlaceholder,
      editDisabled,
      statusMessage,
      title,
      uploadButtonStatus,
      uploadButtonLabel
    } = getMappingState(publishState, uploadStatus);

    return (
      <div>
        <div className="container basic-margin">
          <h2 className="small-margin">
            {title}
          </h2>
          <div className="col-md-9">
            {statusMessage}
          </div>
          <div className="col-md-3 alert alert-info alert-dismissible" role="alert">
            <span className="glyphicon glyphicon-play-circle"/> Watch a 3 min video to create a new dataset.
          </div>
        </div>

        <div className="container basic-margin">
          <h4>Title</h4>
          <input className="form-control" type="text" disabled={nameEditDisabled} placeholder="Enter dataset name" value={newVreName || ""} onChange={this.onChange.bind(this)} />
        </div>

        <div className="container basic-margin">
          <h4>Upload Excel file</h4>
            <UploadButton
              classNames={["btn", "btn-primary"]}
              uploadStatus={finalVreName === null ? "Please enter a title first..." : uploadButtonStatus}
              vreName={finalVreName}
              vreId={vreId}
              label={uploadButtonLabel}
              float="left"
              onUploadFileSelect={onUploadFileSelect}
            />
            <input type="text" className="form-control" disabled={true} value={uploadedFileName} style={{maxWidth: "400px"}} />
        </div>



        <div className="container basic-margin">
          <h4>Description</h4>
          <textarea disabled={editDisabled} placeholder={editPlaceholder || "Enter a description..."} className="form-control" rows="3" />
        </div>

        <div className="container basic-margin">
          <h4>Provenance</h4>
          <textarea disabled={editDisabled} placeholder={editPlaceholder || "Enter a provenance..."} className="form-control" rows="3" />
        </div>

        <div className="container basic-margin">
          <div className="row">
            <div className="col-md-6">
              <h4>Color</h4>
            </div>


            <div className="col-md-6">
              <h4>Dataset illustration</h4>
              <div className="input-group">
                <UploadButton
                  classNames={["btn", "btn-primary"]}
                  vreId={vreId}
                  uploadStatus={editPlaceholder}
                  label="Browse..."
                  float="none"
                  onUploadFileSelect={(...args) => console.log(args)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="container basic-margin">
          <button className="btn btn-default pull-right" disabled={continueDisabled} onClick={() => onContinueMapping(vreId)}>
            Save settings and continue to mapping
          </button>
          <button className="btn btn-default pull-right" style={{marginRight: "4px"}} disabled={editDisabled} onClick={() => onSaveVreSettings(vreId)}>
            Save settings
          </button>
        </div>


      </div>
    )
  }
}

export default DatasetSettings;