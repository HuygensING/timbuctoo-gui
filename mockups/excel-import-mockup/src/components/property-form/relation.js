import React from "react";
import SelectField from "../fields/select-field";


class Form extends React.Component {


	render() {
		const {collectionData, onSetFieldMapping, onClearFieldMapping, mappings, name, importData, relationTypes} = this.props;

		const mapping = mappings.collections[collectionData.collection].mappings;
		const propertyMapping = mapping.find((m) => m.property === name) || {};
		const selectedVariable = propertyMapping.variable && propertyMapping.variable.length ? propertyMapping.variable[0] : {};
		const relationType = relationTypes.data.find((relType) => relType.regularName === name || relType.inverseName === name);
		const isInverse = relationType.inverseName === name;
		const availableCollections = Object.keys(mappings.collections)
			.map((key) => ({
				archetype: mappings.collections[key].archetypeName,
				collection: key
			})).filter((ac) => ac.archetype === (isInverse ? `${relationType.sourceTypeName}s` :  `${relationType.targetTypeName}s`))
			.map((ac) => ac.collection);

		const availableTargetColumns = (importData.sheets.find((sheet) => sheet.collection === selectedVariable.targetCollection) || {}).variables;

		return (
			<span>
				<SelectField
					onChange={(value) => onSetFieldMapping(collectionData.collection, name, [{...selectedVariable, variableName: value}])}
					onClear={() => onClearFieldMapping(collectionData.collection, name, 0)}
					options={collectionData.variables} placeholder="Select source column..."
					value={selectedVariable.variableName || null} />
				&nbsp;
				{selectedVariable.variableName ? (
					<SelectField
						onChange={(value) => onSetFieldMapping(collectionData.collection, name, [{...selectedVariable, targetCollection: value}])}
						onClear={() => onClearFieldMapping(collectionData.collection, name, 0)}
						options={availableCollections} placeholder="Select a target collection..."
						value={selectedVariable.targetCollection || null} />
				) : null}
				&nbsp;
				{selectedVariable.targetCollection ? (
					<SelectField
						onChange={(value) => onSetFieldMapping(collectionData.collection, name, [{...selectedVariable, targetVariableName: value}])}
						onClear={() => onClearFieldMapping(collectionData.collection, name, 0)}
						options={availableTargetColumns} placeholder="Select a target column..."
						value={selectedVariable.targetVariableName || null} />
				) : null}

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
	onSetFieldMapping: React.PropTypes.func,
	relationTypes: React.PropTypes.object
};

export default Form;