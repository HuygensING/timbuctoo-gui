import React from "react";
import cx from "classnames";

class UploadButton extends React.Component {

  render() {
    const { classNames, uploadStatus, onUploadFileSelect, glyphicon, label, vreName, float } = this.props;
    return (
      <form style={{display: "inline-block", float: float || "right"}}>
        <label className={cx(...classNames, {disabled: !!uploadStatus})}>
          <span className={glyphicon}></span>
          {" "}
          {uploadStatus || label}
          <input
            disabled={!!uploadStatus}
            onChange={e => onUploadFileSelect(e.target.files, vreName)}
            style={{display: "none"}}
            type="file" />
        </label>
      </form>
    );
  }
}

export default UploadButton;