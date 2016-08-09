import React from "react";
import SelectField from "../fields/select-field";


class Form extends React.Component {


	render() {
		const {collectionData, onSetFieldMapping, onClearFieldMapping, onSetDefaultValue, onSetValueMapping, mappings, name, archetype} = this.props;

		const mapping = mappings.collections[collectionData.collection].mappings;
		const propertyMapping = mapping.find((m) => m.property === name) || {};
		const selectedVariable = propertyMapping.variable && propertyMapping.variable.length ? propertyMapping.variable[0] : {};
		const defaultValue = propertyMapping.defaultValue && propertyMapping.defaultValue.length ? propertyMapping.defaultValue[0] : {};
		const valueMappings = propertyMapping.valueMappings || {};
		const defaultOptions = (archetype[mappings.collections[collectionData.collection].archetypeName] || []).find((a) => a.name === name).options || [];

		return (
			<span>
				<SelectField
					onChange={(value) => onSetFieldMapping(collectionData.collection, name, [{variableName: value}])}
					onClear={() => onClearFieldMapping(collectionData.collection, name, 0)}
					options={collectionData.variables} placeholder="Select a column..."
					value={selectedVariable.variableName} />
				&nbsp;
				{selectedVariable.variableName ? (<SelectField
					onChange={(value) => onSetDefaultValue(collectionData.collection, name, [{value: value}])}
					onClear={() => onSetDefaultValue(collectionData.collection, name, [{value: null}])}
					options={defaultOptions} placeholder="Select a default value..."
					value={defaultValue.value} />) : null }

				{selectedVariable.variableName ? (
					<ul className="list-group" style={{marginTop: "12px", maxHeight: "275px", overflowY: "auto"}}>
						<li className="list-group-item"><strong>Map import values to select options</strong><p>* Leave blank to match exact value</p> </li>
						{defaultOptions.map((selectOption, i) => (
							<li className="list-group-item" key={i}>
								<label>{selectOption}</label>
								<input className="input-property" onChange={(ev) => onSetValueMapping(collectionData.collection, name, selectOption, ev.target.value)}
									type="text" value={valueMappings[selectOption] || ""} />
							</li>
						))}
					</ul>) : null }
			</span>

		);
	}
}

Form.propTypes = {
	archetype: React.PropTypes.object,
	collectionData: React.PropTypes.object,
	mappings: React.PropTypes.object,
	name: React.PropTypes.string,
	onClearFieldMapping: React.PropTypes.func,
	onSetDefaultValue: React.PropTypes.func,
	onSetFieldMapping: React.PropTypes.func,
	onSetValueMapping: React.PropTypes.func
};

export default Form;
