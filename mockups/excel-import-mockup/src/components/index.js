import React from "react";


import UploadSplashScreen from "./upload-splash-screen";
import ArchetypeMappings from "./archetype-mappings";
import DatasheetMappings from "./datasheet-mappings";

import { disablePersist } from "../reducers/persist";

class App extends React.Component {


	render() {
		const { importData, mappings } = this.props;
		const collectionsAreMapped = Object.keys(mappings.collections).length > 0 &&
			Object.keys(mappings.collections).map((key) => mappings.collections[key].archetypeName).indexOf(null) < 0;

		const datasheetMappings = importData.sheets && collectionsAreMapped && mappings.confirmed ?
			<DatasheetMappings {...this.props} /> : null;

		const archetypeMappings = !datasheetMappings && importData.sheets ?
			<ArchetypeMappings {...this.props} collectionsAreMapped={collectionsAreMapped} /> : null;

		const uploadSplashScreen = !datasheetMappings && !archetypeMappings ?
			<UploadSplashScreen {...this.props} /> : null;

		const nav = !uploadSplashScreen ? (
			<nav>TODO: wizard steps - will act as state skipper in the mock stage</nav>
		) : null;

		return (
			<div>
				<a onClick={() => { disablePersist(); location.reload(); }} style={{position: "absolute", top: 0, right: 0, zIndex: 10}}>clear state</a>
				<div className="row centered-form center-block">
					<div className="container col-md-12">
						{nav}
						<main>
							{datasheetMappings}
							{archetypeMappings}
							{uploadSplashScreen}
						</main>
					</div>
				</div>
			</div>
		)
	}
}

App.propTypes = {
	archetype: React.PropTypes.object,
	importData: React.PropTypes.object,
	mappings: React.PropTypes.object,
	onConfirmCollectionArchetypeMappings: React.PropTypes.func,
	onMapCollectionArchetype: React.PropTypes.func,
	onUpload: React.PropTypes.func
};

export default App;