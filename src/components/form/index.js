import React from "react";
import mapField from "./map-field";

class Form extends React.Component {
	render() {
		if(!this.props.entity.data) { return null; }
		return (
			<ul>
				{this.props.entity.fieldDefinitions.map((fieldDef, i) => <li key={i}>{mapField(fieldDef, this.props)}</li> )}
			</ul>
		);
	}
}

Form.propTypes = {
	entity: React.PropTypes.object
};

export default Form;