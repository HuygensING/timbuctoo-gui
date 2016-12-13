import React from 'react';
import PublishState from "../util/publish-state";

const getMappingState = (publishState) => {
  switch (publishState) {
    case PublishState.MAPPING_CREATION: return {text: "Finish mapping", disabled: false};
    case PublishState.MAPPING_CREATION_AFTER_ERRORS: return {text: "Fix mappings", disabled: false};
    case PublishState.UPLOADING: return {text: "Uploading...", disabled: true};
    case PublishState.MAPPING_EXECUTION: return {text: "Publishing", disabled: true};
  }
  return {text: "", disabled: ""};
};

function DataSetCard(props) {
  var searchUrl = props.searchGuiUrl;

  if (props.mine && !props.published) {
    const {text, disabled} = getMappingState(props.publishState);
    return (
      <div className="card-dataset" style={{height: "215px"}}>
        <button disabled={disabled} className="card-dataset btn btn-default explore" onClick={() => props.onContinueMapping(props.vreId)}>
          {text}<br />
          <strong title={props.caption} style={{display: "inline-block", overflow: "hidden", width: "90%", whiteSpace: "nowrap", textOverflow: "ellipsis"}}>
            {props.caption.replace(/^[^_]+_+/, "")}
          </strong>
        </button>
        {props.userId
          ? (
            <button disabled={disabled} className="card-dataset btn btn-default" onClick={() => props.onDeleteVreClick(props.vreId)}>
              <span className="glyphicon glyphicon-trash" />{" "}
               Delete
            </button>
        ) : null
        }
      </div>
    )
  }

  return (
    <div className="card-dataset">
      <a className="card-dataset btn btn-default explore"
         href={`${searchUrl}?vreId=${props.vreId}`} target="_blank">
        Explore<br />
        <strong title={props.caption} style={{display: "inline-block", overflow: "hidden", width: "90%", whiteSpace: "nowrap", textOverflow: "ellipsis"}}>
            {props.caption.replace(/^[^_]+_+/, "")}
        </strong>
      </a>
      {props.userId
        ? (<a className="card-dataset btn btn-default"
              href={`${process.env.server}/static/edit-gui/?vreId=${props.vreId}&hsid=${props.userId}`} target="_blank">
            <span className="glyphicon glyphicon-pencil" />{" "}
            Edit
          </a>)
        : null}
      {props.userId
        ? (<a className="card-dataset btn btn-default" onClick={() => props.onDeleteVreClick(props.vreId)} style={{cursor: "pointer"}}>
          <span className="glyphicon glyphicon-trash" />{" "}
            Delete
          </a>)
        : null
      }
    </div>
  );
}

export default DataSetCard;
