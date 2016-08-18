import React from "react";
import classnames from "classnames";
import UploadButton from "./upload-button";

class CollectionsOverview extends React.Component {
	render() {
    const { onContinueMapping, onUploadFileSelect, userdata: { vres, myVres, userId }, importData: {isUploading}} = this.props;

    if (myVres) {
  		return (
        <div className="row" style={{"textAlign": "left"}}>
          <div className="container col-md-4 col-md-offset-4">
            <div className="panel panel-default">
              <div className="panel-heading clearfix"><h4 className="panel-title pull-left">Your data sets</h4>
              <div className="btn-group pull-right">
                <UploadButton
                  classNames={["btn", "btn-xs", "btn-success"]}
                  glyphicon="glyphicon glyphicon-plus"
                  isUploading={isUploading}
                  label="New"
                  onUploadFileSelect={onUploadFileSelect} />
                </div>
              </div>
              <div className="list-group">
                {Object.keys(myVres).map((vreId) => ({name: myVres[vreId].name, published: myVres[vreId].published})).map((vre, i) => (
  								!vre.published
  								? <span title={vre.name + " has not yet been published"} className={classnames("list-group-item", {disabled: vre.state})} key={i}>
                    	<i>{vre.name}</i> <button onClick={() => onContinueMapping(vre.name)} title="" className="btn btn-default btn-xs pull-right">finish import</button>
                  	</span>
                  : <span className="list-group-item" key={i}>
                  	 {vre.name}
                      <a className="btn btn-default btn-xs pull-right" href={`${process.env.server}/static/query-gui/?vreId=${vre.name}`}>explore</a>
                      {" "}
                      <a className="btn btn-default btn-xs pull-right" href={`${process.env.server}/static/edit-gui/?hsid=${userId}&vreId=${vre.name}`}>edit</a>
                  	</span>
                ))}
              </div>
            </div>

          </div>
  				<div className="container col-md-4 col-md-offset-4">
            <div className="panel panel-default">
              <div className="panel-heading"><h4 className="panel-title">Published data sets</h4></div>
              <div className="list-group">
                {Object.keys(vres).map((vreId) => ({name: vres[vreId].name})).map((vre, i) => (
                  <span className="list-group-item" key={i}>{vre.name}
                    <a className="btn btn-default btn-xs pull-right" href={`/static/query-gui/?vreId=${vre.name}`}>Explore</a>
                  </span>
                ))}
              </div>
  	        </div>
  				</div>
        </div>
  		);
    } else {
      return (<div></div>);
    }
	}
}

export default CollectionsOverview;
