import React from "react";
import UploadButton from "./upload-button";
import PublishState from "../util/publish-state";
import Message from "./message";

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
    case PublishState.AVAILABLE:
      return {
        nameEditDisabled: false,
        continueDisabled: true,
        editDisabled: false,
        editPlaceHolder: null,
        statusMessage: uploadStatus || "This dataset is already published. You can edit the settings from here.",
        title: "Dataset settings",
        uploadButtonStatus: "This dataset is already published",
        uploadButtonLabel: "Re-Upload (deletes currently published data)"
      }
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

const availableColorCodes = [
  "ce7060",
  "92e3fc",
  "fade8d",
  "9ce479",
  "e39061",
  "d3b2d6",
  "95cac4"
];

class DatasetSettings extends  React.Component {

  componentWillReceiveProps(nextProps) {
    if (nextProps.vreId !== this.props.vreId) {
      this.props.onClearFormSettingData();
    }
  }

  componentDidMount() {
    this.props.onClearFormSettingData();
  }

  onChange(ev) {
    const sanitized = ev.target.value
      .replace(/[^a-zA-Z\s\-]+/, "")
      .replace(/^\s*/, "");

    this.props.onSetNewVreName(sanitized);
  }

  render() {
    const {
      newVreName,
      newDescription,
      newProvenance,
      newColorCode,
      onUploadFileSelect,
      uploadStatus,
      publishState,
      vreId,
      uploadedFileName,
      onContinueMapping,
      onSaveVreSettings,
      onSetNewDescription,
      onSetNewProvenance,
      onSetNewColorCode,
      onUploadImage,
      onCloseImageError,
      imageUploadStatus,
      imageUploadErrorMessage,
      imageUrl,
      uploadedFilenameFromVre
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

    const imageError = imageUploadErrorMessage
      ? <Message alertLevel="danger" onCloseMessage={onCloseImageError} dismissible={true}>{imageUploadErrorMessage}</Message>
      : null;

    const imageTag = imageUrl
      ? <img src={imageUrl} style={{maxWidth: "100%"}} />
      : null;

    const imageStyle = imageUrl ? {
      backgroundImage: `url(${imageUrl})`,
      backgroundPosition: "center center",
      backgroundRepeat: "no-repeat",
      backgroundBlendMode: "multiply",
      color: "white"
    } : {};

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
              vreName={vreId ? null : finalVreName}
              vreId={vreId}
              label={uploadButtonLabel}
              float="left"
              onUploadFileSelect={onUploadFileSelect}
            />
            <input type="text" className="form-control" disabled={true} value={uploadedFileName || uploadedFilenameFromVre} style={{maxWidth: "400px"}} />
        </div>



        <div className="container basic-margin">
          <h4>Description</h4>
          <textarea disabled={editDisabled} value={newDescription} onChange={(ev) => { onSetNewDescription(ev.target.value)}}
                    placeholder={editPlaceholder || "Enter a description..."} className="form-control" rows="3" />
        </div>

        <div className="container basic-margin">
          <h4>Provenance</h4>
          <textarea disabled={editDisabled} value={newProvenance} onChange={(ev) => { onSetNewProvenance(ev.target.value)}}
                    placeholder={editPlaceholder || "Enter provenance..."} className="form-control" rows="3" />
        </div>

        <div className="container basic-margin">
          {imageError}
          <div className="row">
            <div className="col-md-6">
              <h4>Color</h4>
              {editDisabled
                ? editPlaceholder
                : availableColorCodes.map((colorCode) =>
                <a key={colorCode} style={{float: "left", width: "33%", cursor: "pointer", fontWeight: colorCode === newColorCode ? "500" : "300"}} onClick={() => onSetNewColorCode(colorCode)}>
                  <span style={{borderRadius: "4px", display: "inline-block", border: `2px solid ${colorCode === newColorCode ? "black" : `#${colorCode}`}`, width: "14px", height: "14px", backgroundColor: `#${colorCode}`}} />{" "}
                  {colorCode}
                </a>
              )}
              <div className="card-dataset" style={{clear: "left", marginTop: "20px"}}>
                <button title={finalVreName} style={{...imageStyle, backgroundColor: newColorCode ? `#${newColorCode}` : "#e6e6e6"}}
                        className="card-dataset btn btn-default explore">
                  <strong style={{display: "inline-block", overflow: "hidden", width: "90%", whiteSpace: "nowrap", textOverflow: "ellipsis"}}>
                    {finalVreName}
                  </strong>
                </button>
              </div>
            </div>


            <div className="col-md-6">
              <h4>Dataset illustration</h4>
              <div className="input-group">
                <UploadButton
                  classNames={["btn", "btn-primary"]}
                  vreId={vreId}
                  accept="image/jpeg,image/gif,image/png"
                  uploadStatus={imageUploadStatus || editPlaceholder}
                  label="Browse..."
                  float="none"
                  onUploadFileSelect={(files) => onUploadImage(vreId, files)}
                />
              </div>
              {imageTag}
            </div>
          </div>
        </div>

        <div className="container basic-margin">
          <button className="btn btn-default pull-right" disabled={continueDisabled} onClick={() => onSaveVreSettings(vreId, () => onContinueMapping(vreId))}>
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