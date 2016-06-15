import React from "react";


import UploadSplashScreen from "./upload-splash-screen";
import ArchetypeMappings from "./archetype-mappings";
import DatasheetMappings from "./datasheet-mappings";

class App extends React.Component {


	render() {
		const { importData, mappings } = this.props;
		const collectionsAreMapped = Object.keys(mappings.collections).length > 0 &&
			Object.keys(mappings.collections).map((key) => mappings.collections[key].archetypeName).indexOf(null) < 0;


		if (importData.sheets && collectionsAreMapped && mappings.confirmed) {
			return <DatasheetMappings {...this.props} />
		}

		if (importData.sheets) {
			return <ArchetypeMappings {...this.props} collectionsAreMapped={collectionsAreMapped} />;
		}

		return <UploadSplashScreen {...this.props} />;
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