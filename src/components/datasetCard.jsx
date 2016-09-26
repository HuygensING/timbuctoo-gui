import React from 'react';

const TIMBUCTOO_SEARCH_URL = globals && globals.env ?
  globals.env.TIMBUCTOO_SEARCH_URL : "/";

function DataSetCard(props) {
  return (
    <div className="card-dataset">
      <a className="card-dataset btn btn-default explore"
         href={`${TIMBUCTOO_SEARCH_URL}?vreId=${props.vreId}`} target="_blank">
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
