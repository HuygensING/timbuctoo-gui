import React from "react";
import CollectionIndex from "./collection-index";
import CollectionTable from "./collection-table";
import CollectionForm from "./collection-form";

class DatasheetMappings extends React.Component {
	render() {
		return (
			<div className="row" style={{textAlign: "left"}}>
				<div className="container col-md-12">
					<nav className="col-sm-2">
						<CollectionIndex {...this.props} />
					</nav>
					<main className="col-sm-10">
						<CollectionForm {...this.props} />
						<CollectionTable {...this.props} />
					</main>
				</div>
			</div>
		);
	}
}

export default DatasheetMappings;
