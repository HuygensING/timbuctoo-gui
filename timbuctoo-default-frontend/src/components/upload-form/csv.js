import React from "react";
import UploadButton from "../upload-button";

import caml2label from "../../util/camel2label";

const options = {
  quoteChar: { '"': "double quotes (\")", "": "no quotes", "'": "single quotes (')"},
  delimiter: {";": "semicolon (;)", ",": "comma (,)", "\t": "tab character (\\t)"},
  nullString: {"": "none", '\\N': "mysql style (\\N)"},
  recordSeparator: {"\n": "apple/linux (\\n)", "\r\n": "windows (\\r\\n)"}
};

class CsvForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      settings: {
        quoteChar: "\"",
        delimiter: ";",
        nullString: "",
        recordSeparator: "\n"
      }
    };
  }

  onSettingChange(ev) {
    console.log(ev.target.name);
    this.setState({settings: {
      ...this.state.settings,
      [ev.target.name]: ev.target.value
    }})
  }

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
        <p>
          Upload of multiple CSV files is supported.
        </p>
        <div className="small-margin">
          {Object.keys(options).map((option, i) => (
              <div key={i} style={{borderBottom: "1px solid #eee"}}>
                <span style={{display: "inline-block", width: "150px", fontWeight: "400"}}>{caml2label(option)}</span>
                {Object.keys(options[option]).map((opt, j) => (
                    <span key={j} style={{display: "inline-block", width: "150px"}}>
                      <input type="radio" name={option} value={opt} id={`${option}-${j}`}
                             onChange={this.onSettingChange.bind(this)}
                             checked={this.state.settings[option] === opt} />{" "}
                      <label style={{fontWeight: "300"}} htmlFor={`${option}-${j}`}> {options[option][opt]}</label>
                    </span>
                  )
                )}
              </div>
            )
          )}
        </div>
        <UploadButton
          classNames={["btn", "btn-primary"]}
          uploadStatus={finalVreName === null ? "Please enter a title first..." : uploadButtonStatus}
          vreName={vreId ? null : finalVreName}
          vreId={vreId}
          label={uploadButtonLabel}
          float="left"
          accept="text/csv;text/tsv"
          onUploadFileSelect={(files, baseArgs) => onUploadFileSelect(files, {...baseArgs, csvSettings: this.state.settings})}
          format="csv"
          multiple="multiple"
        />
        <input type="text" className="form-control" disabled={true} value={uploadedFileName || uploadedFilenameFromVre} style={{maxWidth: "400px"}} />
      </div>
    );
  }
}

export default CsvForm;
