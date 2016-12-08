import React from "react";
import UploadForm from "./upload-form";
import DatasetCards from "./dataset-cards"
import FirstUpload from "./firstUpload";
import DeleteVreConfirmationForm from "./delete-vre-confirmation-form";
import Modal from "./fields/modal";
import Message from "./message";


function CollectionOverview(props) {
  const {
    onUploadFileSelect,
    onContinueMapping,
    onDeleteVreClick,
    onComfirmDeleteVre,
    onCloseMessage,
    onOpenUploadDialog,
    onCloseUploadDialog,
    onSetNewVreName
  } = props;

  const {
    userId,
    uploadStatus,
    vres,
    searchGuiUrl,
    showDeleteVreModalFor,
    showDeleteVreFailedMessage,
    showUploadDialog,
    newVreName
  } = props;

  const hasOwnVres = (vres && Object.keys(vres).length > 0) > 0;

  const uploadButton = (
    <button className={`btn btn-lg btn-primary ${hasOwnVres ? "pull-right" : ""}`} onClick={onOpenUploadDialog}>
      <span className="glyphicon glyphicon-cloud-upload" />{" "}
      {hasOwnVres ? "Upload new dataset" : "Browse"}
    </button>
  );

  const deleteVreFailedMessage = showDeleteVreFailedMessage ? (
    <Message alertLevel="danger" dismissible={true} onCloseMessage={() => onCloseMessage("showDeleteVreFailedMessage")}>
      Failed to delete dataset
    </Message>
  ) : null;

  const deleteVreModal = showDeleteVreModalFor
    ? (
      <Modal onClose={() => onDeleteVreClick(null)} header="Delete dataset">
        <DeleteVreConfirmationForm vreId={showDeleteVreModalFor} onComfirmDeleteVre={onComfirmDeleteVre} onClose={() => onDeleteVreClick(null)} />
      </Modal>
    )
    : null;

  const uploadDialog = showUploadDialog
    ? (
      <Modal  onClose={uploadStatus ? () => {} : onCloseUploadDialog} header="Upload new dataset">
        <UploadForm onCloseUploadDialog={uploadStatus ? () => {} : onCloseUploadDialog} onSetNewVreName={onSetNewVreName} newVreName={newVreName}
                    onUploadFileSelect={onUploadFileSelect} uploadStatus={uploadStatus} />
      </Modal>
    )
    : null;

  return hasOwnVres
    ? (
      <div>
        {deleteVreModal}
        {uploadDialog}
        <div className="container">
          {deleteVreFailedMessage}
          <DatasetCards userId={userId} caption="My datasets" vres={vres} mine={true} searchGuiUrl={searchGuiUrl}
            onDeleteVreClick={onDeleteVreClick} onContinueMapping={onContinueMapping}>
            {uploadButton}
          </DatasetCards>
        </div>
      </div>
  ) : (
    <FirstUpload {...props}>
      {uploadDialog}
      {uploadButton}
    </FirstUpload>
  );
}

export default CollectionOverview;