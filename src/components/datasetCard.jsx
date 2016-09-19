import React from 'react';

function DataSetCard(props) {
  return (
    <div className="card-dataset">
      <a className="card-dataset btn btn-default explore"
         href={`${process.env.server}/static/query-gui/?vreId=${props.vreId}`} target="_blank">
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
