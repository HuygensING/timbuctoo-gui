import React from "react";
import SelectField from "../fields/select-field";


class Form extends React.Component {

	onComponentChange(propertyMapping, mappingIndex, variableName) {
		const { collectionData, onSetFieldMapping, name } = this.props;
		const variableSpec = propertyMapping.variable
			.map((v, i) => i === mappingIndex ? {...v, variableName: variableName} : v);

		if (variableSpec.length > 0) {
			onSetFieldMapping(collectionData.collection, name, variableSpec);
		}
	}


	render() {
		const {collectionData, onSetFieldMapping, onClearFieldMapping, mappings, name, archetype} = this.props;

		const mapping = mappings.collections[collectionData.collection].mappings;
		const propertyMapping = mapping.find((m) => m.property === name) || {};
		const components = archetype[mappings.collections[collectionData.collection].archetypeName].find((a) => a.name === name).options;

		return (
			<span>
				{propertyMapping.variable && propertyMapping.variable.length ? (
				<div style={{marginBottom: "12px"}}>
					{(propertyMapping.variable || []).map((v, i) => (
						<span key={i} style={{display: "inline-block", margin: "8px 8px 0 0"}}>
							<div style={{marginBottom: "2px"}}>
								<a className="pull-right btn-danger btn-xs" onClick={() => onClearFieldMapping(collectionData.collection, name, i)}>
									<span className="glyphicon glyphicon-remove" />
								</a>
								{v.component}&nbsp;
							</div>
							<SelectField
								onChange={(value) => this.onComponentChange(propertyMapping, i, value)}
								onClear={() => onClearFieldMapping(collectionData.collection, name, i)}
								options={collectionData.variables}
								placeholder={`Select column for ${v.component}`}
								value={v.variableName} />
						</span>
					))}
				</div>) : null}

				<SelectField onChange={(value) => onSetFieldMapping(collectionData.collection, name, [...(propertyMapping.variable || []), {component: value}])}
					options={components} placeholder="Add name component..."
					value={null} />
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
	onSetFieldMapping: React.PropTypes.func
};

export default Form;