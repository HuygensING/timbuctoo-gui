import React from "react";

class CollectionsOverview extends React.Component {
	render() {
    const { vres } = this.props;
		return (
      <div className="row" style={{"text-align": "left"}}>
        <div className="container col-md-4 col-md-offset-4">
          <div className="panel panel-default">
            <div className="panel-heading">Your data sets</div>
            <div className="list-group">
              {vres.map((vre, i) => (
                <a href="#" className="list-group-item" key={i}>
                  {vre.state ? <b>{vre.name}</b> : vre.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

		);
	}
}

export default CollectionsOverview;
