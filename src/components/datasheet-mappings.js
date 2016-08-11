import React from "react";
import CollectionIndex from "./collection-index";
import CollectionTable from "./collection-table";
import CollectionForm from "./collection-form";

class DatasheetMappings extends React.Component {
	render() {
		if (this.props.importData.sheets) {
			return (
				<div className="row datasheet-mappings" style={{textAlign: "left"}}>
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
		} else {
			return (<div></div>);
		}
	}
}

export default DatasheetMappings;
