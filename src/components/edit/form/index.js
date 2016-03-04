import React from "react";
import mapField from "./map-field";


class Form extends React.Component {
	render() {
		if(!this.props.entity.data) { return null; }

		let saveButton = this.props.user && this.props.user.token ?
			<button onClick={this.props.onSave}>Save</button> : null;

		let deleteButton = this.props.user && this.props.user.token && this.props.entity.data._id ?
			<button onClick={this.props.onDelete}>Delete</button> : null;

		let newForm = this.props.user && this.props.user.token ?
			this.props.vre.collections[this.props.entity.domain].map((fieldDef, i) => <li key={i}>{mapField(fieldDef, this.props)}</li> ) :
			"you are not logged in";

		return (
			<ul id="form">
				{newForm}
				<li>{saveButton}{deleteButton}</li>
			</ul>
		);
	}
}

Form.propTypes = {
	entity: React.PropTypes.object,
	onDelete: React.PropTypes.func,
	onSave: React.PropTypes.func,
	user: React.PropTypes.object,
	vre: React.PropTypes.object
};

export default Form;