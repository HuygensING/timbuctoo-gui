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
	multiselect: (props) => <Select {...props} />
};

class PropertyForm extends React.Component {


	render() {
		const { name, collectionData, type, mappings, onConfirmFieldMappings, onUnconfirmFieldMappings } = this.props;

		const mapping = mappings.collections[collectionData.collection].mappings;

		const propertyMapping = mapping.find((m) => m.property === name) || {};
		const selectedVariable = propertyMapping.variable || null;
		const confirmed = propertyMapping.confirmed || false;

		const confirmButton = selectedVariable && !confirmed ?
				<button className="btn btn-success btn-sm" onClick={() => { onConfirmFieldMappings(collectionData.collection, name); }}>Confirm</button> : confirmed ?
				<button className="btn btn-danger btn-sm" onClick={() => { onUnconfirmFieldMappings(collectionData.collection, name); }}>Unconfirm</button> : null;


		const formComponent = typeMap[type](this.props);

		return (
			<ul className="list-group">
				<li className="list-group-item">
					<label><strong>{name}</strong> ({type})</label>
					{formComponent}
					&nbsp;
					{confirmButton}
				</li>
			</ul>
		);
	}
}

PropertyForm.propTypes = {
	collectionData: React.PropTypes.object,
	mappings: React.PropTypes.object,
	name: React.PropTypes.string,
	onConfirmFieldMappings: React.PropTypes.func,
	onUnconfirmFieldMappings: React.PropTypes.func,
	type: React.PropTypes.string
};

export default PropertyForm;