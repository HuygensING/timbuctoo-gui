import React from "react";
import UploadButton from "./upload-button";
import DatasetCards from "./dataset-cards"
import FirstUpload from "./firstUpload";
import DeleteVreConfirmationForm from "./delete-vre-confirmation-form";
import Modal from "./fields/modal";

function CollectionOverview(props) {
  const { onUploadFileSelect, onContinueMapping, onDeleteVreClick, onComfirmDeleteVre } = props;
  const { userId, uploadStatus, vres, searchGuiUrl, showDeleteVreModalFor } = props;


  const uploadButton = (
    <UploadButton
      classNames={["btn", "btn-lg", "btn-primary", "pull-right"]}
      glyphicon="glyphicon glyphicon-cloud-upload"
      uploadStatus={uploadStatus}
      label="Upload new dataset"
      onUploadFileSelect={onUploadFileSelect} />
  );

  const deleteVreModal = showDeleteVreModalFor
    ? (
      <Modal onClose={() => onDeleteVreClick(null)} header="Delete dataset">
        <DeleteVreConfirmationForm vreId={showDeleteVreModalFor} onComfirmDeleteVre={onComfirmDeleteVre} />
      </Modal>
    )
    : null;

  return vres && Object.keys(vres).length > 0
    ? (
      <div>
        {deleteVreModal}
        <div className="container">
          <DatasetCards userId={userId} caption="My datasets" vres={vres} mine={true} searchGuiUrl={searchGuiUrl}
            onDeleteVreClick={onDeleteVreClick} onContinueMapping={onContinueMapping}>
            {uploadButton}
          </DatasetCards>
        </div>
      </div>
  ) : (
    <FirstUpload {...props} />
  );
}

export default CollectionOverview;