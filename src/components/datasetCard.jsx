import React from 'react';

function DataSetCard(props) {
  var searchUrl = props.searchGuiUrl;
  return (
    <div className="card-dataset">
      <a className="card-dataset btn btn-default explore"
         href={`${searchUrl}?vreId=${props.vreId}`} target="_blank">
        Explore<br />
        <strong>
            {props.caption}
        </strong>
      </a>
      {props.userId
        ? (<a className="card-dataset btn btn-default"
              href={`${process.env.server}/static/edit-gui/?vreId=${props.vreId}&hsid=${props.userId}`} target="_blank">
            <span className="glyphicon glyphicon-pencil" />{" "}
            Edit
          </a>)
        : null}
    </div>
  );
}

export default DataSetCard;
