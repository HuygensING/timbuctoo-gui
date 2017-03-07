import React from "react";
import DatasetCards from "./dataset-cards"
import FirstUpload from "./firstUpload";
import DeleteVreConfirmationForm from "./delete-vre-confirmation-form";
import Modal from "./fields/modal";
import Message from "./message";
import { urls } from "../router";
import { Link } from "react-router";

function CollectionOverview(props) {
  const {
    onContinueMapping,
    onDeleteVreClick,
    onComfirmDeleteVre,
    onCloseMessage,
    redirectTo
  } = props;

  const {
    userId,
    vres,
    searchGuiUrl,
    showDeleteVreModalFor,
    showDeleteVreFailedMessage,
  } = props;

  const hasOwnVres = (vres && Object.keys(vres).length > 0) > 0;

  const uploadButton = (
    <Link to={urls.newDataset()} className={`btn btn-lg btn-primary ${hasOwnVres ? "pull-right" : ""}`}>
      <span className="glyphicon glyphicon-cloud-upload" />{" "}
      {hasOwnVres ? "Upload new dataset" : "Upload your data"}
    </Link>
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


  return hasOwnVres
    ? (
      <div>
        {deleteVreModal}
        <div className="container">
          {deleteVreFailedMessage}
          <DatasetCards userId={userId} caption="My datasets" vres={vres} mine={true} searchGuiUrl={searchGuiUrl} height="280px"
            onDeleteVreClick={onDeleteVreClick} onContinueMapping={onContinueMapping} redirectTo={redirectTo}>
            {uploadButton}
          </DatasetCards>
        </div>
      </div>
  ) : (
    <FirstUpload {...props}>
      {uploadButton}
    </FirstUpload>
  );
}

export default CollectionOverview;