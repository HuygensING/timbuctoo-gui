import React from "react";
import SelectField from "../fields/select-field";

class AddProperty extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			newName: null,
			newType: null
		};
	}


	render() {
		const { importData, archetype: allArchetypes, mappings, onAddCustomProperty } = this.props;
		const { newType, newName } = this.state;

		const { activeCollection } = importData;

		const { archetypeName } = mappings.collections[activeCollection];
		const archetype = allArchetypes[archetypeName];

		const availableArchetypes = Object.keys(mappings.collections).map((key) => mappings.collections[key].archetypeName);
		const relationTypeOptions = archetype
			.filter((prop) => prop.type === "relation")
			.filter((prop) => availableArchetypes.indexOf(prop.relation.targetCollection) > -1)
			.map((prop) => prop.name);

		return (
			<li className="list-group-item">
				<label><strong>Add property</strong></label>
				<SelectField
					onChange={(value) => this.setState({newType: value, newName: value === "relation" ? null : newName})}
					onClear={() => this.setState({newType: null})}
					options={["text", "relation"]}
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
					(<input className="input-property" onChange={(ev) => this.setState({newName: ev.target.value })} placeholder="Property name" value={newName} />)
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
		);
	}
}

AddProperty.propTypes = {
	importData: React.PropTypes.object,
	mappings: React.PropTypes.object,
	onAddCustomProperty: React.PropTypes.func
};

export default AddProperty;
