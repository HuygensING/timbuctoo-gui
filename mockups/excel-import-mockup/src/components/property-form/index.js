import React from "react";

import Links from "./links";
import Text from "./text";
import Select from "./select";
import Names from "./names";

const typeMap = {
	text: (props) => <Text {...props} />,
	datable: (props) => <Text {...props} />,
	names: (props) => <Names {...props} />,
	links: (props) => <Links {...props} />,
	select: (props) => <Select {...props} />,
	multiselect: (props) => <Select {...props} />,
	relation: (props) => null
};

class PropertyForm extends React.Component {

	canConfirm(variable) {
		if (!variable || variable.length === 0) { return false; }

		return variable.filter((m) => m.variableName).length === variable.length;
	}

	render() {
		const { custom, name, collectionData, type, mappings, onConfirmFieldMappings, onUnconfirmFieldMappings, onRemoveCustomProperty } = this.props;

		const mapping = mappings.collections[collectionData.collection].mappings;

		const propertyMapping = mapping.find((m) => m.property === name) || {};
		const confirmed = propertyMapping.confirmed || false;

		const confirmButton = this.canConfirm(propertyMapping.variable || null) && !confirmed ?
				<button className="btn btn-success btn-sm" onClick={() => onConfirmFieldMappings(collectionData.collection, name)}>Confirm</button> : confirmed ?
				<button className="btn btn-danger btn-sm" onClick={() => onUnconfirmFieldMappings(collectionData.collection, name)}>Unconfirm</button> : null;


		const formComponent = typeMap[type](this.props);

		return (
			<li className="list-group-item">
				{custom ? (
					<a className="pull-right btn-danger btn-xs" onClick={() => onRemoveCustomProperty(collectionData.collection, name)}>
						<span className="glyphicon glyphicon-remove" />
					</a>) : null}

				<label><strong>{name}</strong> ({type})</label>
				{formComponent}
				&nbsp;
				{confirmButton}
			</li>
		);
	}
}

PropertyForm.propTypes = {
	collectionData: React.PropTypes.object,
	custom: React.PropTypes.bool,
	mappings: React.PropTypes.object,
	name: React.PropTypes.string,
	onConfirmFieldMappings: React.PropTypes.func,
	onRemoveCustomProperty: React.PropTypes.func,
	onUnconfirmFieldMappings: React.PropTypes.func,
	type: React.PropTypes.string
};

export default PropertyForm;