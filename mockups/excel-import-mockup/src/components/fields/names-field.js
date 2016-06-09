import React from "react";
import SelectField from "./select-field";
import BoolField from "./bool-field";

class NamesField extends React.Component {


	render() {
		const { onChange, value } = this.props;

		return (
			<ul className="list-group">

				<BoolField id="name-position" label="Name position"
					labelFalse="Self defined"
					labelTrue="Order of appearance"
					onChange={(val) => onChange("orderOfAppearance", val)}
					value={value.orderOfAppearance} />
				{ value.orderOfAppearance ? null : (
					<li className="list-group-item">
						<label>Choose name component position</label>
						<input onChange={(ev) => onChange("listPosition", ev.target.value) } type="number" value={value.listPosition} />
					</li>
				) }

				<SelectField label="Name component type" onChange={(val) => onChange("componentType", val)} 
					options={["forename", "surname", "nameLink", "roleName", "genName", "addName"]} value={value.componentType} />

				<BoolField id="name-component-position" label="Name component position"
					labelFalse="Self defined"
					labelTrue="Order of appearance"
					onChange={(val) => onChange("componentOrderOfAppearance", val)}
					value={value.componentOrderOfAppearance} />
				{ value.componentOrderOfAppearance ? null : (
					<li className="list-group-item">
						<label>Choose name component position</label>
						<input onChange={(ev) => onChange("componentListPosition", ev.target.value) } type="number" value={value.componentListPosition} />
					</li>
				) }
			</ul>
		);
	}

}

NamesField.propTypes = {
	onChange: React.PropTypes.func,
	value: React.PropTypes.object
};

export default NamesField;