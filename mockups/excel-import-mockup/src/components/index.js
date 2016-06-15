import React from "react";
import CollectionIndex from "./collection-index";
import CollectionTable from "./collection-table";
import CollectionForm from "./collection-form";
import SelectField from "./fields/select-field";

class App extends React.Component {


	render() {
		const { onUpload, importData, mappings, onMapCollectionArchetype, onConfirmCollectionMappings, archetype } = this.props;
		const collectionsAreMapped = Object.keys(mappings.collections).length > 0 &&
			Object.keys(mappings.collections).map((key) => mappings.collections[key].archetypeName).indexOf(null) < 0;


		if (importData.sheets && collectionsAreMapped && mappings.confirmed) {
			return (
				<div>
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

		if (importData.sheets) {
			return (
					<div className="panel panel-default col-sm-10">
						<div className="panel-body">
							You have uploaded test.xlsx. We found 2 tabs.<br />
							Connect the tabs to the timbuctoo archetypes
						</div>
						<ul className="list-group">
							{importData.sheets.map((sheet, i) => (
								<li className="list-group-item" key={i}>
									<label>{i + 1} {sheet.collection}</label>
									<SelectField onChange={(value) => onMapCollectionArchetype(sheet.collection, value)}
										options={Object.keys(archetype).filter((domain) => domain !== "relations")}
										placeholder={`Archetype for ${sheet.collection}`}
										value={mappings.collections[sheet.collection].archetypeName} />
								</li>
							))}
							<li className="list-group-item">
								<button className="btn btn-lg btn-success" disabled={!collectionsAreMapped} onClick={onConfirmCollectionMappings}>
									Ok
								</button>
							</li>
						</ul>
					</div>
			);
		}

		return (<div>
			<button className="btn btn-lg btn-success" onClick={onUpload}>
				<span className="glyphicon glyphicon-cloud-upload pull-left"></span>
				&nbsp; Upload
			</button>
		</div>);
	}
}

App.propTypes = {
	importData: React.PropTypes.object,
	mappings: React.PropTypes.object,
	onUpload: React.PropTypes.func
};

export default App;