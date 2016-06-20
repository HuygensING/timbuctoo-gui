import React from "react";

import UploadSplashScreen from "./upload-splash-screen";
import ArchetypeMappings from "./archetype-mappings";
import DatasheetMappings from "./datasheet-mappings";

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

		return datasheetMappings || archetypeMappings || uploadSplashScreen;
	}
}

App.propTypes = {
	importData: React.PropTypes.object,
	mappings: React.PropTypes.object
};

export default App;