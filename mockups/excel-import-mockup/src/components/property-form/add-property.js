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
		const { importData, relationTypes, mappings, onAddCustomProperty } = this.props;
		const { newType, newName } = this.state;

		const { activeCollection } = importData;

		const { archetypeName } = mappings.collections[activeCollection];

		const availableArchetypes = Object.keys(mappings.collections).map((key) => mappings.collections[key].archetypeName);


		const relationTypeOptions = relationTypes.data
			.filter((relType) => `${relType.sourceTypeName}s` === archetypeName || `${relType.targetTypeName}s` === archetypeName)
			.filter((relType) => availableArchetypes.indexOf(`${relType.sourceTypeName}s`) > -1 && availableArchetypes.indexOf(`${relType.targetTypeName}s`) > -1)
			.map((relType) => `${relType.sourceTypeName}s` === archetypeName ? relType.regularName : relType.inverseName);

		return (
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
		);
	}
}

AddProperty.propTypes = {
	importData: React.PropTypes.object,
	mappings: React.PropTypes.object,
	onAddCustomProperty: React.PropTypes.func,
	relationTypes: React.PropTypes.object
};

export default AddProperty;