import React from "react";
import CollectionIndex from "./collection-index";
import CollectionTable from "./collection-table";
import VariableForm from "./variable-form";

class App extends React.Component {


	render() {
		const { onUpload } = this.props;

		return (
			<div>
				<header className="well">
						<button className="btn btn-lg btn-success" onClick={onUpload}>
							<span className="glyphicon glyphicon-cloud-upload pull-left"></span>
							&nbsp;
							Upload
						</button>
						<div className="pull-right col-sm-10">
							<VariableForm {...this.props} />
						</div>
				</header>
				<nav className="col-sm-2">
					<CollectionIndex {...this.props} />
				</nav>
				<main className="col-sm-10">
					<CollectionTable {...this.props} />
				</main>
			</div>
		);
	}
}

App.propTypes = {
	importData: React.PropTypes.object,
	onUpload: React.PropTypes.func
};

export default App;