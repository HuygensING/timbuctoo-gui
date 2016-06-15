import React from "react";
import SelectField from "./fields/select-field";


class ArchetypeMappings extends React.Component {


	render() {
		const { archetype, importData, onMapCollectionArchetype, mappings, collectionsAreMapped, onConfirmCollectionArchetypeMappings } = this.props;
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
						<button className="btn btn-lg btn-success" disabled={!collectionsAreMapped} onClick={onConfirmCollectionArchetypeMappings}>
							Ok
						</button>
					</li>
				</ul>
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