import React from "react";
import SelectField from "../fields/select-field";


class Form extends React.Component {

	onComponentChange(propertyMapping, mappingIndex, variableName) {
		const { collectionData, onSetFieldMapping, name } = this.props;
		const variableSpec = propertyMapping.variable
			.map((v, i) => i === mappingIndex ? {...v, variableName: variableName} : v);

		onSetFieldMapping(collectionData.collection, name, variableSpec);
	}

	onRemoveComponent(propertyMapping, mappingIndex) {
		const { collectionData, onSetFieldMapping, name } = this.props;
		const variableSpec = propertyMapping.variable
			.filter((v, i) => i !== mappingIndex);

		onSetFieldMapping(collectionData.collection, name, variableSpec);
	}

	render() {
		const {collectionData, onSetFieldMapping, mappings, name, archetype} = this.props;

		const mapping = mappings.collections[collectionData.collection].mappings;
		const propertyMapping = mapping.find((m) => m.property === name) || {};
		const components = archetype[mappings.collections[collectionData.collection].archetypeName].find((a) => a.name === name).options;

		return (
			<div style={{margin: "12px"}}>
				{(propertyMapping.variable || []).map((v, i) => (
					<span key={i} style={{display: "inline-block", margin: "8px"}}>
						<div style={{marginBottom: "2px"}}>
							<a className="pull-right btn-danger btn-xs" onClick={() => this.onRemoveComponent(propertyMapping, i)}>
								<span className="glyphicon glyphicon-remove" />
							</a>
							{v.component}&nbsp;
						</div>
						<SelectField onChange={(value) => this.onComponentChange(propertyMapping, i, value)}
							options={collectionData.variables}
							placeholder={`Select column for ${v.component}`}
							value={v.variableName} />
					</span>
				))}
				<span style={{display: "inline-block", margin: "8px"}}>
					<SelectField onChange={(value) => onSetFieldMapping(collectionData.collection, name, [...(propertyMapping.variable || []), {component: value}])}
						options={components} placeholder="Add name component..."
						value={null} />
				</span>
			</div>
		);
	}
}

Form.propTypes = {
	archetype: React.PropTypes.object,
	collectionData: React.PropTypes.object,
	mappings: React.PropTypes.object,
	name: React.PropTypes.string,
	onSetFieldMapping: React.PropTypes.func
};

export default Form;