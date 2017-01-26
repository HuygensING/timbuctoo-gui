import React from "react";
import UploadButton from "./upload-button";
import PublishState from "../util/publish-state";
import UploadForm from "./upload-form";
import Message from "./message";
import availableColorCodes from "../util/color-codes";

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
    case PublishState.UPLOAD_FAILED:
      return  {
        nameEditDisabled: false,
        continueDisabled: true,
        editDisabled: true,
        editPlaceholder: "Please upload a dataset first...",
        uploadButtonStatus: uploadStatus || null,
        statusMessage: "Upload failed, please try again.",
        title: "Create a new dataset",
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
        uploadButtonLabel: null
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
      returnToRoot,
      imageUploadStatus,
      imageUploadErrorMessage,
      imageUrl,
      uploadedFilenameFromVre,
      format
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

    const uploadError = publishState === PublishState.UPLOAD_FAILED
      ? <Message alertLevel="danger">Upload failed, please try again.</Message>
      : null;
    const imageTag = imageUrl
      ? <img src={imageUrl} style={{maxWidth: "100%"}} />
      : null;

    const imageStyle = imageUrl ? {
      backgroundImage: `url(${imageUrl})`,
      backgroundPosition: "center center",
      backgroundRepeat: "no-repeat",
      backgroundBlendMode: "multiply",
      backgroundSize: "125% auto",
      color: "white",
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

        <UploadForm
          vreId={vreId}
          format={format}
          finalVreName={finalVreName}
          uploadError={uploadError}
          uploadButtonStatus={uploadButtonStatus}
          uploadButtonLabel={uploadButtonLabel}
          onUploadFileSelect={onUploadFileSelect}
          uploadedFileName={uploadedFileName}
          uploadedFilenameFromVre={uploadedFilenameFromVre} />

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
                ? <div>{editPlaceholder}</div>
                : availableColorCodes.map((colorCode) =>
                <a key={colorCode} style={{float: "left", width: "40px", cursor: "pointer", fontWeight: colorCode === newColorCode ? "500" : "300"}} onClick={() => onSetNewColorCode(colorCode)}>
                  <span style={{borderRadius: colorCode === newColorCode ? "8px" : "12px", display: "inline-block", border: `8px solid ${colorCode === newColorCode ? `#${colorCode}` : "white"}`, width: "40px", height: "40px", backgroundColor: `#${colorCode}`}} />{" "}
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
          <button className="btn btn-default pull-right" style={{marginRight: "4px"}} disabled={editDisabled} onClick={() => onSaveVreSettings(vreId, returnToRoot)}>
            Save settings
          </button>
        </div>


      </div>
    )
  }
}

export default DatasetSettings;