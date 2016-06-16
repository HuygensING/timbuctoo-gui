import React from "react";
import SelectField from "../fields/select-field";


class Form extends React.Component {


	render() {
		const {collectionData, onSetFieldMapping, onClearFieldMapping, onSetDefaultValue, mappings, name} = this.props;

		const mapping = mappings.collections[collectionData.collection].mappings;
		const propertyMapping = mapping.find((m) => m.property === name) || {};
		const selectedVariableUrl = (propertyMapping.variable || []).find((v) => v.field === "url") || {};
		const defaultValueUrl = (propertyMapping.defaultValue || []).find((v) => v.field === "url") || {};

		const selectedVariableLabel = (propertyMapping.variable || []).find((v) => v.field === "label") || {};
		const defaultValueLabel = (propertyMapping.defaultValue || []).find((v) => v.field === "label") || {};

		return (
			<span>
				<SelectField
					onChange={(value) => onSetFieldMapping(collectionData.collection, name, [{...selectedVariableUrl}, {...selectedVariableLabel, field: "label", variableName: value}])}
					onClear={() => onClearFieldMapping(collectionData.collection, name, (propertyMapping.variable || []).map((v) => v.field).indexOf("label"))}
					options={collectionData.variables} placeholder="Select label column..."
					value={selectedVariableLabel.variableName || null} />
				&nbsp;

				{selectedVariableUrl.variableName && selectedVariableLabel.variableName ? (
					<input onChange={(ev) => onSetDefaultValue(collectionData.collection, name, [{...defaultValueUrl}, {...defaultValueLabel, field: "label", value: ev.target.value}])}
						placeholder="Default value..." type="text" value={defaultValueLabel.value || null} />) : null}

				&nbsp;
				<SelectField
					onChange={(value) => onSetFieldMapping(collectionData.collection, name, [{...selectedVariableUrl, field: "url", variableName: value}, {...selectedVariableLabel}])}
					onClear={() => onClearFieldMapping(collectionData.collection, name, (propertyMapping.variable || []).map((v) => v.field).indexOf("url"))}
					options={collectionData.variables} placeholder="Select URL column..."
					value={selectedVariableUrl.variableName || null} />
				&nbsp;
				{selectedVariableUrl.variableName && selectedVariableLabel.variableName ? (
					<input onChange={(ev) => onSetDefaultValue(collectionData.collection, name, [{...defaultValueUrl, field: "url", value: ev.target.value}, {...defaultValueLabel}])}
						placeholder="Default value..." type="text" value={defaultValueUrl.value || null} />) : null}
			</span>
		);
	}
}

Form.propTypes = {
	collectionData: React.PropTypes.object,
	mappings: React.PropTypes.object,
	name: React.PropTypes.string,
	onClearFieldMapping: React.PropTypes.func,
	onSetDefaultValue: React.PropTypes.func,
	onSetFieldMapping: React.PropTypes.func
};

export default Form;