import React from 'react';
import PublishState from "../util/publish-state";
import { Link } from "react-router";
import { urls } from "../router";

const getMappingState = (publishState) => {
  switch (publishState) {
    case PublishState.MAPPING_CREATION: return {text: "Finish mapping", disabled: false};
    case PublishState.MAPPING_CREATION_AFTER_ERRORS: return {text: "Fix mappings", disabled: false};
    case PublishState.UPLOADING: return {text: "Uploading...", disabled: true};
    case PublishState.UPLOAD_FAILED: return {text: "Re-upload", disabled: false};
    case PublishState.MAPPING_EXECUTION: return {text: "Publishing", disabled: true};
  }
  return {text: "", disabled: ""};
};

function DataSetCard(props) {
  var searchUrl = props.searchGuiUrl;


  const { colorCode, image } = props.vreMetadata;

  const imageStyle = image ? {
    backgroundImage: `url(${image})`,
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
    backgroundBlendMode: "multiply",
    backgroundSize: "125% auto",
    color: "white"
  } : {};

  const onContinueClick = props.publishState === PublishState.UPLOAD_FAILED
    ? () => props.redirectTo("editDataset", [props.vreId])
    : () => props.onContinueMapping(props.vreId);

  if (props.mine && !props.published) {
    const {text, disabled} = getMappingState(props.publishState);
    return (
      <div className="card-dataset" style={{height: props.height}}>
        <button title={props.caption} disabled={disabled}
                style={{...imageStyle, backgroundColor: colorCode ? `#${colorCode}` : "#e6e6e6"}}
                className="card-dataset btn btn-default explore"
                onClick={onContinueClick}>
          {text}<br />
          <strong style={{display: "inline-block", overflow: "hidden", width: "90%", whiteSpace: "nowrap", textOverflow: "ellipsis"}}>
            {props.caption.replace(/^[^_]+_+/, "")}
          </strong>
        </button>
        {props.userId
          ? (
          <Link className="card-dataset btn btn-default" to={urls.editDataset(props.vreId)}>
            <span className="glyphicon glyphicon-wrench" />{" "}
            Settings
          </Link>
        ) : null
        }
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
    <div className="card-dataset" style={{height: props.height}}>
      <a className="card-dataset btn btn-default explore"
         title={props.caption}
         style={{...imageStyle, backgroundColor: colorCode ? `#${colorCode}` : "#e6e6e6" }}
         href={`${searchUrl}?vreId=${props.vreId}`}>
        <strong  style={{display: "inline-block", overflow: "hidden", width: "90%", whiteSpace: "nowrap", textOverflow: "ellipsis"}}>
            {props.caption.replace(/^[^_]+_+/, "")}
        </strong>
      </a>
      {props.userId
        ? (
        <Link className="card-dataset btn btn-default" to={urls.editDataset(props.vreId)}>
          <span className="glyphicon glyphicon-wrench" />{" "}
          Settings
        </Link>
      ) : null
      }
      {props.userId
        ? (<a className="card-dataset btn btn-default"
              href={`${process.env.TIMBUCTOO_EDIT_GUI_URL}/?vreId=${props.vreId}`}>
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
