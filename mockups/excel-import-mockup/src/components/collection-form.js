import React from "react";
import AddProperty from "./property-form/add-property";
import PropertyForm from "./property-form";

class CollectionForm extends React.Component {

	render() {
		const { importData, archetype, mappings } = this.props;

		const { activeCollection, sheets } = importData;


		const collectionData = sheets.find((sheet) => sheet.collection === activeCollection);

		const { archetypeName } = mappings.collections[activeCollection];
		const archetypeFields = archetypeName ? archetype[archetypeName] : [];
		const archeTypePropFields = archetypeFields.filter((af) => af.type !== "relation");

		const propertyForms = archeTypePropFields
			.map((af, i) => <PropertyForm {...this.props} collectionData={collectionData} custom={false} key={i} name={af.name} type={af.type} />);

		const customPropertyForms = mappings.collections[activeCollection].customProperties
			.map((cf, i) => <PropertyForm {...this.props} collectionData={collectionData} custom={true} key={i} name={cf.name} type={cf.type} />);

		return (
			<div className="panel panel-default">
				<div className="panel-heading">
					Collection settings: {activeCollection}
				</div>

				<ul className="list-group">
					{propertyForms}
					{customPropertyForms}
					<AddProperty {...this.props} />
				</ul>
			</div>
		);
	}
}

CollectionForm.propTypes = {
	archetype: React.PropTypes.object,
	importData: React.PropTypes.object,
	mappings: React.PropTypes.object
};

export default CollectionForm;
