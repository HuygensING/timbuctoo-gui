import React from "react";

import SelectField from "../fields/select-field";


class TextPropertyForm extends React.Component {


	render() {
		const { name, collectionData, onSetFieldMapping, mappings, onConfirmFieldMappings, onUnconfirmFieldMappings } = this.props;

		const mapping = mappings.collections[collectionData.collection].mappings;

		console.log(mappings.collections[collectionData.collection]);
				const propertyMapping = mapping.find((m) => m.property === name) || {};
		const selectedVariable = propertyMapping.variable || null;
		const confirmed = propertyMapping.confirmed || false;

		const confirmButton = selectedVariable && !confirmed ?
				<button className="btn btn-success btn-sm" onClick={() => { onConfirmFieldMappings(collectionData.collection, name); }}>Confirm</button> : confirmed ?
				<button className="btn btn-danger btn-sm" onClick={() => { onUnconfirmFieldMappings(collectionData.collection, name); }}>Unconfirm</button> : null;


		return (
			<ul className="list-group">
				<li className="list-group-item">
					<label><strong>{name}</strong></label>
					<SelectField onChange={(value) => onSetFieldMapping(collectionData.collection, name, value)}
						placeholder="Select a column..."
						options={collectionData.variables} value={selectedVariable} />
					&nbsp;
					{confirmButton}
				</li>
			</ul>
		);
	}
}

TextPropertyForm.propTypes = {
	collectionData: React.PropTypes.object,
	mappings: React.PropTypes.object,
	name: React.PropTypes.string,
	onConfirmFieldMappings: React.PropTypes.func,
	onSetFieldMapping: React.PropTypes.func,
	onUnconfirmFieldMappings: React.PropTypes.func
};

export default TextPropertyForm;