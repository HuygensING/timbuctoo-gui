import React from "react";
import UploadButton from "./upload-button";

class UploadForm extends React.Component {

  onChange(ev) {
    const sanitized = ev.target.value
      .replace(/[^a-zA-Z\s\-]+/, "")
      .replace(/^\s*/, "");

    this.props.onSetNewVreName(sanitized);
  }

  render() {
    const {
      onCloseUploadDialog,
      newVreName,
      onUploadFileSelect,
      uploadStatus
    } = this.props;

    const finalVreName = newVreName ?
      newVreName.replace(/\s*$/, "") : null

    return (
      <div>
        <div className="modal-body">
          <div>Please enter a name for the new dataset.</div>
          <div>If no dataset name is entered, the filename of the uploaded file will be used.</div>
          <br />
          <input type="text" placeholder="Enter dataset name" value={newVreName || ""} onChange={this.onChange.bind(this)} />
        </div>
        <div className="modal-footer">
          <UploadButton
            classNames={["btn", "btn-primary"]}
            uploadStatus={uploadStatus}
            vreName={finalVreName}
            label="Upload"
            onUploadFileSelect={onUploadFileSelect}
          />
          <button className="btn btn-default" onClick={onCloseUploadDialog}>
            Cancel
          </button>
        </div>
      </div>
    )
  }
}

export default UploadForm;