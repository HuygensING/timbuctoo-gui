import React from "react";
import SelectField from "./select-field";
import BoolField from "./bool-field";

class AltnamesField extends React.Component {


	render() {
		const { onChange, value } = this.props;

		return (
			<ul className="list-group">
				<li className="list-group-item">
					<label>Type of name</label>
					<input onChange={(ev) => onChange("type", ev.target.value)} 
						placeholder="Name type"
						type="text" 
						value={value.type} />
					<p>* Please choose a name type - leave empty for default value</p>
				</li>
				<BoolField id="link-position" label="Altname position"
					labelFalse="Self defined"
					labelTrue="Order of appearance"
					onChange={(val) => onChange("orderOfAppearance", val)}
					value={value.orderOfAppearance} />
				{ value.orderOfAppearance ? null : (
					<li className="list-group-item">
						<label>Choose name position</label>
						<input onChange={(ev) => onChange("listPosition", ev.target.value) } type="number" value={value.listPosition} />
					</li>
				) }
			</ul>
		);
	}

}

AltnamesField.propTypes = {
	onChange: React.PropTypes.func,
	value: React.PropTypes.object
};

export default AltnamesField;