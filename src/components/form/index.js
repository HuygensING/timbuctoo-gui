import React from "react";
import mapField from "./map-field";


class Form extends React.Component {
	render() {
		if(!this.props.entity.data) { return null; }
		let saveButton = this.props.user && this.props.user.token ?
			<li><button onClick={this.props.onSave}>Save</button></li> : null;
		let newForm = this.props.user && this.props.user.token ?
			this.props.entity.fieldDefinitions.map((fieldDef, i) => <li key={i}>{mapField(fieldDef, this.props)}</li> ) :
			"you are not logged in";

		return (
			<ul id="form">
				{newForm}
				{saveButton}
			</ul>
		);
	}
}

Form.propTypes = {
	entity: React.PropTypes.object,
	onSave: React.PropTypes.func,
	user: React.PropTypes.object
};

export default Form;