import React from "react";
import cx from "classnames";

class UploadButton extends React.Component {

  render() {
    const { classNames, uploadStatus, onUploadFileSelect, glyphicon, label } = this.props;
    return (
      <form>
        <label className={cx(...classNames, {disabled: !!uploadStatus})}>
          <span className={glyphicon}></span>
          {" "}
          {uploadStatus || label}
          <input
            disabled={!!uploadStatus}
            onChange={e => onUploadFileSelect(e.target.files)}
            style={{display: "none"}}
            type="file" />
        </label>
      </form>
    );
  }
}

export default UploadButton;