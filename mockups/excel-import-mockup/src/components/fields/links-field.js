import React from "react";
import SelectField from "./select-field";
import BoolField from "./bool-field";

class LinksField extends React.Component {


	render() {
		const { onChange, value } = this.props;

		return (
			<ul className="list-group">
				<SelectField label="Link field type" onChange={(val) => onChange("type", val)} options={["url", "label"]} value={value.type} />
				<BoolField id="link-position" label="Link position"
					labelFalse="Self defined"
					labelTrue="Order of appearance"
					onChange={(val) => onChange("orderOfAppearance", val)}
					value={value.orderOfAppearance} />
				{ value.orderOfAppearance ? null : (
					<li className="list-group-item">
						<label>Choose link position</label>
						<input onChange={(ev) => onChange("listPosition", ev.target.value) } type="number" value={value.listPosition} />
					</li>
				) }
			</ul>
		);
	}

}

LinksField.propTypes = {
	onChange: React.PropTypes.func,
	value: React.PropTypes.object
};

export default LinksField;