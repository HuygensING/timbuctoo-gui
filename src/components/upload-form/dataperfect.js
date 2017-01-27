import React from "react";
import UploadButton from "../upload-button";

class ExcelForm extends React.Component {

  render() {
    const {
      uploadButtonStatus,
      vreId,
      finalVreName,
      uploadButtonLabel,
      onUploadFileSelect,
      uploadedFileName,
      uploadedFilenameFromVre
    } = this.props;

    return (
      <div>
        <UploadButton
          classNames={["btn", "btn-primary"]}
          uploadStatus={finalVreName === null ? "Please enter a title first..." : uploadButtonStatus}
          vreName={vreId ? null : finalVreName}
          vreId={vreId}
          label={uploadButtonLabel}
          float="left"
          onUploadFileSelect={onUploadFileSelect}
          format="dataperfect"
        />
        <input type="text" className="form-control" disabled={true} value={uploadedFileName || uploadedFilenameFromVre} style={{maxWidth: "400px"}} />
      </div>
    );
  }
}

export default ExcelForm;
