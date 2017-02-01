import React from "react";
import cx from "classnames";

class UploadButton extends React.Component {

  render() {
    const {
      classNames,
      redirectPath,
      uploadStatus,
      onUploadFileSelect,
      glyphicon,
      label,
      vreName,
      vreId,
      float,
      accept,
      format,
      multiple
    } = this.props;

    return (
      <form style={{display: "inline-block", float: float || "right"}}>
        <label className={cx(...classNames, {disabled: !!uploadStatus})}>
          <span className={glyphicon} />
          {" "}
          {uploadStatus || label}
          <input
            disabled={!!uploadStatus}
            onChange={e => onUploadFileSelect(e.target.files, {
              vreName: vreName,
              vreId: vreId,
              redirectTo: redirectPath || null,
              format: format || null
            })}
            accept={accept || "*"}
            style={{display: "none"}}
            type="file"
            multiple={multiple || false} />
        </label>
      </form>
    );
  }
}

export default UploadButton;