import React from "react";
import SelectField from "./fields/select-field";
import PropertyForm from "./property-form";

class CollectionForm extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			newName: null,
			newType: null
		};
	}

	render() {
		const { importData, archetype, onAddCustomProperty, mappings, relationTypes } = this.props;
		const { newName, newType } = this.state;

		const { activeCollection, sheets } = importData;

		if (!activeCollection) { return null; }

		const collectionData = sheets.find((sheet) => sheet.collection === activeCollection);

		const { archetypeName } = mappings.collections[activeCollection];
		const archetypeFields = archetypeName ? archetype[archetypeName] : [];
		const archeTypePropFields = archetypeFields.filter((af) => af.type !== "relation");

		const availableArchetypes = Object.keys(mappings.collections).map((key) => mappings.collections[key].archetypeName);

		const relationTypeOptions = relationTypes.data
			.filter((relType) => `${relType.sourceTypeName}s` === archetypeName || `${relType.targetTypeName}s` === archetypeName)
			.filter((relType) => availableArchetypes.indexOf(`${relType.sourceTypeName}s`) > -1 && availableArchetypes.indexOf(`${relType.targetTypeName}s`) > -1)
			.map((relType) => `${relType.sourceTypeName}s` === archetypeName ? relType.regularName : relType.inverseName);

		const propertyForms = archeTypePropFields
			.map((af, i) => <PropertyForm {...this.props} collectionData={collectionData} custom={false} key={i} name={af.name} type={af.type} />);

		const customPropertyForms = mappings.collections[activeCollection].customProperties
			.map((cf, i) => <PropertyForm {...this.props} collectionData={collectionData} custom={true} key={i} name={cf.name} type={cf.type} />);

		return (
			<div className="panel panel-default">
				<div className="panel-heading">
					Collection settings: {activeCollection}
				</div>

				<ul className="list-group">
					{propertyForms}
					{customPropertyForms}
					<li className="list-group-item">
						<label><strong>Add property</strong></label>
						<SelectField
							onChange={(value) => this.setState({newType: value, newName: value === "relation" ? null : newName})}
							onClear={() => this.setState({newType: null})}
							options={["text", "datable", "relation"]}
							placeholder="Choose a type..."
							value={newType} />
						&nbsp;
						{ newType === "relation" ?
							<SelectField
								onChange={(value) => this.setState({newName: value})}
								onClear={() => this.setState({newName: null})}
								options={relationTypeOptions}
								placeholder="Choose a type..."
								value={newName} />
							:
							(<input onChange={(ev) => this.setState({newName: ev.target.value })} placeholder="Property name" value={newName} />)
						}
						&nbsp;
						<button className="btn btn-success" disabled={!(newName && newType)}
							onClick={() => {
								onAddCustomProperty(activeCollection, newName, newType);
								this.setState({newName: null, newType: null});
							}}>
							Add
						</button>
					</li>
				</ul>
			</div>
		);
	}
}

CollectionForm.propTypes = {
	archetype: React.PropTypes.object,
	importData: React.PropTypes.object,
	mappings: React.PropTypes.object,
	onAddCustomProperty: React.PropTypes.func,
	onMapCollectionArchetype: React.PropTypes.func,
	relationTypes: React.PropTypes.object
};

export default CollectionForm;
