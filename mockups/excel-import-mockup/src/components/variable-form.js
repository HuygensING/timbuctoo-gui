import React from "react";
import BoolField from "./fields/bool-field";
import SelectField from "./fields/select-field";
import cx from "classnames";

class VariableForm extends React.Component {


	render() {
		const { importData, onUpdateVariable } = this.props;
		const { activeVariable, activeCollection, sheets } = importData;

		if (!activeVariable) { return null; }

		const collectionData = sheets.find((sheet) => sheet.collection === activeCollection);
		const variable = collectionData.variables[activeVariable];

		const fieldNameInput = variable.importValue ? (
				<li className="list-group-item">
					<label>Name</label>
					<input onChange={(ev) => onUpdateVariable("name", ev.target.value)} value={variable.name} />
				</li>
			) : null;

		const fieldTypeSelect = variable.importValue ?
			<SelectField label="Data type" onChange={(value) => onUpdateVariable("type", value)} options={["text", "number", "date", "names", "links", "altnames", "relation"]} value={variable.type} />
			: null;

		return (
			<div className="panel panel-default">
				<div className="panel-heading">
					Variable settings: {activeVariable}
				</div>

				<ul className="list-group">
					<BoolField id="id" label="Identifying column" labelFalse="No" labelTrue="Yes" onChange={(value) => onUpdateVariable("identifyingColumn", value)} value={variable.identifyingColumn} />
					<BoolField id="import-value" label="Import values?" labelFalse="No" labelTrue="Yes" onChange={(value) => onUpdateVariable("importValue", value)} value={variable.importValue} />
					{fieldNameInput}
					{fieldTypeSelect}
				</ul>
			</div>
		);
	}
}

VariableForm.propTypes = {
	importData: React.PropTypes.object,
	onUpdateVariable: React.PropTypes.func
};

export default VariableForm;