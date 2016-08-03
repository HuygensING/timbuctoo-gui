import React from "react";
import SelectField from "../fields/select-field";


class Form extends React.Component {


	render() {
		const ownSheet = this.props.collectionData;
		const allSheets = this.props.importData.sheets;
		const allSheetMappings = this.props.mappings.collections;
		const mapping = this.props.mappingData.mappings.find(prop => prop.property === this.props.name);
		//at one point the mapping does not yet exists, but a custom property reference containing the name does exist
		const customProperty = this.props.mappingData.customProperties.find(prop => prop.name === this.props.name);
		const ownArchetype = this.props.archetype[this.props.mappingData.archetypeName];
		const onSetFieldMapping = this.props.onSetFieldMapping.bind(null, ownSheet.collection, this.props.name);
		const onClearFieldMapping = this.props.onClearFieldMapping.bind(null, ownSheet.collection, this.props.name);

		const relationInfo = mapping && mapping.variable && mapping.variable.length > 0
			? mapping.variable[0]
			: {};

		const propertyMetadata = ownArchetype.find(metadata => metadata.name === (mapping ? mapping.property : customProperty.name));

		const availableSheets = propertyMetadata
			? Object.keys(allSheetMappings)
				.filter(key => allSheetMappings[key].archetypeName === propertyMetadata.relation.targetCollection)
			: [];

		const linkedSheet = relationInfo.targetCollection
			? allSheets
				.find(sheet => sheet.collection === relationInfo.targetCollection)
			: null;

		return (
			<span>
				<SelectField
					onChange={(value) => onSetFieldMapping([{...relationInfo, variableName: value}])}
					onClear={() => onClearFieldMapping(0)}
					options={ownSheet.variables} placeholder="Select source column..."
					value={relationInfo.variableName || null} />
				&nbsp;
				<SelectField
					onChange={(value) => onSetFieldMapping([{...relationInfo, targetCollection: value}])}
					onClear={() => onClearFieldMapping(0)}
					options={availableSheets} placeholder="Select a target collection..."
					value={relationInfo.targetCollection || null} />
				&nbsp;
				{linkedSheet
					? <SelectField
							onChange={(value) => onSetFieldMapping([{...relationInfo, targetVariableName: value}])}
							onClear={() => onClearFieldMapping(0)}
							options={linkedSheet.variables} placeholder="Select a target column..."
							value={relationInfo.targetVariableName || null} />
					: null
				}

			</span>
		);
	}
}

Form.propTypes = {
	collectionData: React.PropTypes.object,
	importData: React.PropTypes.object,
	mappings: React.PropTypes.object,
	name: React.PropTypes.string,
	onClearFieldMapping: React.PropTypes.func,
	onSetFieldMapping: React.PropTypes.func
};

export default Form;
