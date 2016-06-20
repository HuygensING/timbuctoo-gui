import React from "react";
import SelectField from "./fields/select-field";
import { disablePersist } from "../util/persist";

class ArchetypeMappings extends React.Component {


	render() {

		const { archetype, importData, onMapCollectionArchetype, mappings, collectionsAreMapped, onConfirmCollectionArchetypeMappings } = this.props;
		return (
			<div className="row centered-form center-block">
				<a onClick={() => { disablePersist(); location.reload(); }} style={{position: "absolute", top: 0, right: 0, zIndex: 10}}>clear state</a>
				<div className="container col-md-12" style={{textAlign: "left"}}>
					<main>
						<div className="panel panel-default col-md-6 col-md-offset-3">
							<div className="panel-body">
								You have uploaded test.xlsx. We found 2 tabs.<br />
								Connect the tabs to the timbuctoo archetypes
							</div>
							<ul className="list-group">
								{importData.sheets.map((sheet, i) => (
									<li className="list-group-item" key={i}>
										<label>{i + 1} {sheet.collection}</label>
										<SelectField
											onChange={(value) => onMapCollectionArchetype(sheet.collection, value)}
											onClear={() => onMapCollectionArchetype(sheet.collection, null) }
											options={Object.keys(archetype).filter((domain) => domain !== "relations")}
											placeholder={`Archetype for ${sheet.collection}`}
											value={mappings.collections[sheet.collection].archetypeName} />
									</li>
								))}
								<li className="list-group-item">
									<button className="btn btn-lg btn-success" disabled={!collectionsAreMapped} onClick={onConfirmCollectionArchetypeMappings}>
										Ok
									</button>
								</li>
							</ul>
						</div>
					</main>
				</div>
			</div>
		);
	}
}

ArchetypeMappings.propTypes = {
	archetype: React.PropTypes.object,
	collectionsAreMapped: React.PropTypes.bool,
	importData: React.PropTypes.object,
	mappings: React.PropTypes.object,
	onConfirmCollectionArchetypeMappings: React.PropTypes.func,
	onMapCollectionArchetype: React.PropTypes.func
};

export default ArchetypeMappings;