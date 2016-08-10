import React from "react";
import classnames from "classnames";

class CollectionsOverview extends React.Component {
	render() {
    const { onUploadFileSelect, userdata: { vres, myVres, userId }, importData: {isUploading}} = this.props;

    if (myVres) {
  		return (
        <div className="row" style={{"textAlign": "left"}}>
          <div className="container col-md-4 col-md-offset-4">
            <div className="panel panel-default">
              <div className="panel-heading clearfix"><h4 className="panel-title pull-left">Your data sets</h4>
              <div className="btn-group pull-right">
                <form>
                <label className={classnames("btn", "btn-xs", "btn-success", {disabled: isUploading})}>
                  <span className="glyphicon glyphicon-plus"></span>
                  {isUploading ? "Uploading..." : "New"}
                  <input
                    disabled={isUploading}
                    type="file"
                    style={{display: "none"}}
                    onChange={e => onUploadFileSelect(e.target.files)}/>
                </label>
                </form>


                </div></div>
              <div className="list-group">
                {Object.keys(myVres).map((vreId) => ({name: myVres[vreId].name})).map((vre, i) => (
  								vre.state != "published"
  								? <span title={vre.name + " has not yet been published"} className={classnames("list-group-item", {disabled: vre.state})} key={i}>
                    	<i>{vre.name}</i> <button title="" className="btn btn-default btn-xs pull-right">finish import</button>
                  	</span>
                  : <span className="list-group-item" key={i}>
                  	{vre.name} <button title="" className="btn btn-default btn-xs pull-right">explore</button>{" "}<button title="" className="btn btn-default btn-xs pull-right">edit</button>
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
