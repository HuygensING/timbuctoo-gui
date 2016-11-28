import React from "react";
import UploadButton from "./upload-button";

function FirstUpload(props) {
  const { onUploadFileSelect, userId, uploadStatus } = props;

  const sampleSheet = props.exampleSheetUrl ?
    <p>Don't have a dataset handy? Here’s an <a href={props.exampleSheetUrl}>example excel sheet</a>.</p> : null;

  const uploadButton = (
    <UploadButton
      uploadStatus={uploadStatus}
      classNames={["btn", "btn-lg", "btn-primary"]}
      glyphicon="glyphicon glyphicon-cloud-upload"
      label="Browse"
      onUploadFileSelect={onUploadFileSelect} />
  );

  console.log(userId);
  return (
    <div className="container">
      <div className="jumbotron first-upload upload-bg">
        <h2>Upload your first dataset</h2>
        {sampleSheet}
        {userId ? uploadButton : (
          <form action="https://secure.huygens.knaw.nl/saml2/login" method="POST">
            <input name="hsurl"  type="hidden" value={window.location.href} />
            <p>Most university accounts will work.</p>
            <button className="btn btn-primary btn-lg" type="submit">
              <span className="glyphicon glyphicon-log-in" /> Log in to upload
            </button>
          </form>) }
      </div>
    </div>
  );
}

export default FirstUpload;
