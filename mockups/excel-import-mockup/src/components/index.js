import React from "react";
import CollectionIndex from "./collection-index";
import CollectionTable from "./collection-table";
import CollectionForm from "./collection-form";


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
						<a href="http://10.152.32.34/MOCK_V1/">GA NAAR ORIGINELE MOCKUP</a>
				</header>
				<nav className="col-sm-2">
					<CollectionIndex {...this.props} />
				</nav>
				<main className="col-sm-10">
					<CollectionForm {...this.props} />
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