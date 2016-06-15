import React from "react";
import SelectField from "./fields/select-field";
import PropertyForm from "./property-form";

class CollectionForm extends React.Component {


	render() {
		const { importData, onMapCollectionArchetype, archetype, mappings } = this.props;
		const { activeCollection, sheets } = importData;

		if (!activeCollection) { return null; }

		const collectionData = sheets.find((sheet) => sheet.collection === activeCollection);

		const archetypeFields = mappings.collections[activeCollection].archetypeName ? archetype[mappings.collections[activeCollection].archetypeName] : [];
		const archeTypePropFields = archetypeFields.filter((af) => af.type !== "relation");


		const propertyForms = archeTypePropFields.map((af, i) => <PropertyForm {...this.props} collectionData={collectionData} key={i} name={af.name} type={af.type} />);

		return (
			<div className="panel panel-default">
				<div className="panel-heading">
					Collection settings: {activeCollection}
				</div>

				<ul className="list-group">
					<li className="list-group-item">
						<label>Select archetype</label>
						<SelectField onChange={(value) => onMapCollectionArchetype(activeCollection, value)}
							options={Object.keys(archetype).filter((domain) => domain !== "relations")} value={mappings.collections[activeCollection].archetypeName} />
					</li>
				</ul>
				{propertyForms}
			</div>
		);
	}
}

CollectionForm.propTypes = {
	archetype: React.PropTypes.object,
	importData: React.PropTypes.object,
	mappings: React.PropTypes.object,
	onMapCollectionArchetype: React.PropTypes.func
};

export default CollectionForm;

/*
	label: React.PropTypes.string,
	onChange: React.PropTypes.func,
	options: React.PropTypes.array,
	value: React.PropTypes.string
*/