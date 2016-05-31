import React from "react";
import mapField from "./map-field";

const MODE_LABELS = {
	edit: "Editing",
	new: "Adding new"
};

class Form extends React.Component {
	render() {
		const { entity, user, vre, onSave, onDelete, onNew } = this.props;
		if (!entity.data) { return null; }

		const disabled = !(user && user.token);

		const currentMode = entity.domain && entity.data._id ? "edit" : "new";

		const saveButton = <button className="pull-right" disabled={disabled} onClick={onSave}>Save</button>;


		const deleteButton = entity.data._id ?
			<button className="pull-right" disabled={disabled} onClick={onDelete}>Delete</button> : null;

		const addNewButton = vre.vreId && entity.domain && entity.data._id ?
			<button className="pull-right" disabled={disabled} onClick={() => onNew(entity.domain)}>Add new</button>
			: null;


		const formFields = vre.collections[entity.domain].map((fieldDef, i) => <li className="list-group-item" key={i}>{mapField(fieldDef, this.props)}</li> );

		return (
			<div className="col-sm-6">
				<div className="panel panel-default edit-form">
					<div className="panel-heading">
						{addNewButton}{saveButton}{deleteButton}
						<h3 className="panel-title">{MODE_LABELS[currentMode]}: {entity.domain.replace(/s$/, "")}</h3>
					</div>
					<ul className="list-group">
						{formFields}
					</ul>
				</div>
			</div>
		);
	}
}

Form.propTypes = {
	entity: React.PropTypes.object,
	onDelete: React.PropTypes.func,
	onNew: React.PropTypes.func,
	onSave: React.PropTypes.func,
	user: React.PropTypes.object,
	vre: React.PropTypes.object
};

export default Form;