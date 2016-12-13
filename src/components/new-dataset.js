import React from "react";
import UploadButton from "./upload-button";
import { Link } from "react-router";
import { urls } from "../router";

class NewDataset extends  React.Component {

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
      uploadStatus
    } = this.props;

    const finalVreName = newVreName ?
      newVreName.replace(/\s*$/, "") : null;

    return (
      <div>
        <div className="container basic-margin">
          <h2 className="small-margin">Create a new dataset</h2>
          <div className="col-md-9">To create e new dataset, please enter some basic
            information about your project.
          </div>
          <div className="col-md-3 alert alert-info alert-dismissible" role="alert">
            <span className="glyphicon glyphicon-play-circle"/> Watch a 3 min video to create a new dataset.
          </div>
        </div>

        <div className="container basic-margin">
          <h4>Title</h4>
          <input className="form-control" type="text" disabled={!!uploadStatus}  placeholder="Enter dataset name" value={newVreName || ""} onChange={this.onChange.bind(this)} />
        </div>

        <div className="container basic-margin">
          <h4>Upload Excel file</h4>
          <UploadButton
            classNames={["btn", "btn-primary"]}
            uploadStatus={finalVreName === null ? "Please enter a title first..." : uploadStatus}
            vreName={finalVreName}
            label="Browse..."
            float="none"
            onUploadFileSelect={onUploadFileSelect}
          />
        </div>



        <div className="container basic-margin">
          <h4>Description</h4>
          <textarea disabled={true} placeholder="TODO...." className="form-control" rows="3" />
        </div>

        <div className="container basic-margin">
          <h4>Provenance</h4>
          <textarea disabled={true} placeholder="TODO...." className="form-control" rows="3" />
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
                  vreName={finalVreName}
                  uploadStatus="TODO...."
                  label="Browse..."
                  float="none"
                  onUploadFileSelect={(...args) => console.log(args)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="container basic-margin">
          <Link className="btn btn-default" to={urls.root()}>
            Cancel
          </Link>
          <button className="btn btn-default" disabled={true}>
            TODO continue
          </button>
        </div>


      </div>
    )
  }
}

export default NewDataset;