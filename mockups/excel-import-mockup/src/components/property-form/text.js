import React from "react";
import SelectField from "../fields/select-field";


class Form extends React.Component {


	render() {
		const {collectionData, onSetFieldMapping, onSetDefaultValue, mappings, name} = this.props;

		const mapping = mappings.collections[collectionData.collection].mappings;
		const propertyMapping = mapping.find((m) => m.property === name) || {};
		const selectedVariable = propertyMapping.variable || null;
		const defaultValue = propertyMapping.defaultValue || "";

		return (
			<span>
				<SelectField onChange={(value) => onSetFieldMapping(collectionData.collection, name, value)}
					options={collectionData.variables} placeholder="Select a column..."
					value={selectedVariable} />
				&nbsp;
				<input onChange={(ev) => onSetDefaultValue(collectionData.collection, name, ev.target.value)}
					placeholder="Default value..." type="text" value={defaultValue} />
			</span>
		);
	}
}

Form.propTypes = {
	collectionData: React.PropTypes.object,
	onSetFieldMapping: React.PropTypes.func,
	onSetDefaultValue: React.PropTypes.func,
	mappings: React.PropTypes.object,
	name: React.PropTypes.string
};

export default Form;