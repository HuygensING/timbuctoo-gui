import React from "react";
import SelectField from "../fields/select-field";


class Form extends React.Component {


	render() {
		const {collectionData, onSetFieldMapping, onSetDefaultValue, onSetValueMapping, mappings, name, archetype} = this.props;

		const mapping = mappings.collections[collectionData.collection].mappings;
		const propertyMapping = mapping.find((m) => m.property === name) || {};
		const selectedVariable = propertyMapping.variable || null;
		const defaultValue = propertyMapping.defaultValue || "";
		const valueMappings = propertyMapping.valueMappings || {};
		const defaultOptions = archetype[mappings.collections[collectionData.collection].archetypeName].find((a) => a.name === name).options;

		return (
			<span>
				<SelectField onChange={(value) => onSetFieldMapping(collectionData.collection, name, value)}
					options={collectionData.variables} placeholder="Select a column..."
					value={selectedVariable} />
				&nbsp;
				{selectedVariable ? (<SelectField onChange={(value) => onSetDefaultValue(collectionData.collection, name, value)}
					options={defaultOptions} placeholder="Select a default value..."
					value={defaultValue} />) : null }

				{selectedVariable ? (
					<ul className="list-group" style={{marginTop: "12px", maxHeight: "275px", overflowY: "auto"}}>
						<li className="list-group-item"><strong>Map import values to select options</strong><p>* Leave blank to match exact value</p> </li>
						{defaultOptions.map((opt, i) => (
							<li className="list-group-item" key={i}>
								<label>{opt}</label>
								<input onChange={(ev) => onSetValueMapping(collectionData.collection, name, opt, ev.target.value)}
									type="text" value={valueMappings[opt] || ""} />
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
	onSetDefaultValue: React.PropTypes.func,
	onSetFieldMapping: React.PropTypes.func,
	onSetValueMapping: React.PropTypes.func
};

export default Form;