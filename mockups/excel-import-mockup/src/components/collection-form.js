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
		const { importData, archetype, onAddCustomProperty, mappings } = this.props;
		const { newName, newType } = this.state;

		const { activeCollection, sheets } = importData;

		if (!activeCollection) { return null; }

		const collectionData = sheets.find((sheet) => sheet.collection === activeCollection);

		const archetypeFields = mappings.collections[activeCollection].archetypeName ? archetype[mappings.collections[activeCollection].archetypeName] : [];
		const archeTypePropFields = archetypeFields.filter((af) => af.type !== "relation");


		const propertyForms = archeTypePropFields
			.map((af, i) => <PropertyForm {...this.props} collectionData={collectionData} custom={false} key={i} name={af.name} type={af.type} />);

		const customPropertyForms = mappings.collections[activeCollection].customProperties
			.map((cf, i) => <PropertyForm {...this.props} collectionData={collectionData} custom={true} key={i} name={cf.name} type={cf.type} />);

		return (
			<div className="panel panel-default">
				<div className="panel-heading">
					Collection settings: {activeCollection}
				</div>

				{propertyForms}
				{customPropertyForms}
				<ul className="list-group">
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
							(null)
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
	onMapCollectionArchetype: React.PropTypes.func
};

export default CollectionForm;
