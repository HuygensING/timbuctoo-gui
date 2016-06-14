import React from "react";
import SelectField from "./fields/select-field";
import TextPropForm from "./property-forms/text";

const typeMap = {
	text: (props) => <TextPropForm {...props} />,
	datable: (props) => <TextPropForm {...props} />,
	names: (props) => <TextPropForm {...props} />,
	links: (props) => <TextPropForm {...props} />,
	select: (props) => <TextPropForm {...props} />,
	multiselect: (props) => <TextPropForm {...props} />
};


class CollectionForm extends React.Component {


	render() {
		const { importData, onMapCollectionArchetype, archetype, mappings } = this.props;
		const { activeCollection, sheets } = importData;

		if (!activeCollection) { return null; }

		const collectionData = sheets.find((sheet) => sheet.collection === activeCollection);

		const archetypeFields = mappings.collections[activeCollection].archetypeName ? archetype[mappings.collections[activeCollection].archetypeName] : [];
		const archeTypePropFields = archetypeFields.filter((af) => af.type !== "relation");


		const propertyForms = archeTypePropFields.map((af, i) => typeMap[af.type]({
			...this.props, name: af.name, key: i, collectionData: collectionData
		}));

		return (
			<div className="panel panel-default">
				<div className="panel-heading">
					Collection settings: {activeCollection}
				</div>

				<ul className="list-group">
					<SelectField label="Select archetype" onChange={(value) => onMapCollectionArchetype(activeCollection, value)}
						options={Object.keys(archetype).filter((domain) => domain !== "relations")} value={mappings.collections[activeCollection].archetypeName} />
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