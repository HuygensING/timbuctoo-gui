import React from "react";
import AddProperty from "./property-form/add-property";
import PropertyForm from "./property-form";

class CollectionForm extends React.Component {

	render() {
		const { importData, archetype, mappings } = this.props;

		const { activeCollection, sheets } = importData;


		const collectionData = sheets.find((sheet) => sheet.collection === activeCollection);
		const mappingData = mappings.collections[activeCollection];

		const { archetypeName } = mappings.collections[activeCollection];
		const archetypeFields = archetypeName ? archetype[archetypeName] : [];
		const archeTypePropFields = archetypeFields.filter((af) => af.type !== "relation");

		const propertyForms = archeTypePropFields
			.map((af, i) => <PropertyForm {...this.props} collectionData={collectionData} mappingData={mappingData} custom={false} key={i} name={af.name} type={af.type} />);

		const customPropertyForms = mappings.collections[activeCollection].customProperties
			.map((cf, i) => <PropertyForm {...this.props} collectionData={collectionData} mappingData={mappingData} custom={true} key={i} name={cf.name} type={cf.type} />);

		const publishMessage = importData.publishErrors ?
			<li className="list-group-item">
				<span className="glyphicon glyphicon-exclamation-sign"></span>
				{" "}
				Publish failed, please fix the mappings or re-upload the data
			</li> :
			null;

		return (
			<div className="panel panel-default">
				<div className="panel-heading">
					Collection settings: <strong>{activeCollection}</strong>
					{" "}
					from archetype: <strong>{archetypeName}</strong>
				</div>

				<ul className="list-group">
					{publishMessage}
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
