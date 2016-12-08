import React from "react";
import UploadButton from "./upload-button";

class UploadForm extends React.Component {

  render() {
    const {
      onCloseUploadDialog,
      onSetNewVreName,
      newVreName,
      onUploadFileSelect,
      uploadStatus
    } = this.props;

    return (
      <div>
        <div className="modal-body">
          <div>Please enter a name for the new dataset.</div>
          <div>If no dataset name is entered, the filename of the uploaded file will be used.</div>
          <br />
          <input type="text" placeholder="Enter dataset name" value={newVreName} onChange={(ev)=> onSetNewVreName(ev.target.value)} />
        </div>
        <div className="modal-footer">
          <UploadButton
            classNames={["btn", "btn-primary"]}
            uploadStatus={uploadStatus}
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