import React from 'react';
import { Link } from "react-router";
import { urls } from "../router";


function DataSetCard(props) {
  var searchUrl = props.searchGuiUrl;

  if (props.mine && !props.published) {
    return (
      <div className="card-dataset" style={{height: "215px"}}>
        <a className="card-dataset btn btn-default explore" onClick={() => props.onContinueMapping(props.vreId)}>
          Finish mapping<br />
          <strong title={props.caption} style={{display: "inline-block", overflow: "hidden", width: "90%", whiteSpace: "nowrap", textOverflow: "ellipsis"}}>
            {props.caption.replace(/^[^_]+_+/, "")}
          </strong>
        </a>
        {props.userId
          ? (<a className="card-dataset btn btn-default" onClick={() => props.onDeleteVreClick(props.vreId)} style={{cursor: "pointer"}}>
          <span className="glyphicon glyphicon-trash" />{" "}
          Delete
        </a>)
          : null
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
