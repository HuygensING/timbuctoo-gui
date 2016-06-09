import React from "react";
import BoolField from "./fields/bool-field";
import SelectField from "./fields/select-field";
import LinksField from "./fields/links-field";
import AltnamesField from "./fields/altnames-field";
import NamesField from "./fields/names-field";


const fieldMap = {
	text: () => null,
	number: () => null,
	date: () => null,
	names: (props) => <NamesField {...props} />,
	links: (props) => <LinksField {...props} />,
	altnames: (props) => <AltnamesField {...props} />,
	relation: () => null
};

class VariableForm extends React.Component {


	render() {
		const { importData, onUpdateVariable, onUpdateVariableTypeSpec } = this.props;
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

		const confirmButton = variable.confirmed ?
			<button className="btn btn-danger" onClick={() => onUpdateVariable("confirmed", !variable.confirmed)}>Remove confirmation</button> :
			<button className="btn btn-success" onClick={() => onUpdateVariable("confirmed", !variable.confirmed)}>Confirm</button>;

		const typeField = fieldMap[variable.type]({onChange: (key, value) => onUpdateVariableTypeSpec(key, value), value: variable.typeSpec});

		const typeFieldInstruction = typeField ? (
				<div className="panel-body">
					<p>
						* Please specify how to map the {variable.type} field
					</p>
				</div>
			) : null;

		return (
			<div className="panel panel-default">
				<div className="panel-heading">
					Variable settings: {activeVariable}
				</div>
				<div className="panel-body">
					<p>
						{confirmButton}
						&nbsp;
						* only confirmed settings will be used for the import.
					</p>
				</div>

				<ul className="list-group">
					<BoolField id="id" label="Identifying column" labelFalse="No" labelTrue="Yes" onChange={(value) => onUpdateVariable("identifyingColumn", value)} value={variable.identifyingColumn} />
					<BoolField id="import-value" label="Import values?" labelFalse="No" labelTrue="Yes" onChange={(value) => onUpdateVariable("importValue", value)} value={variable.importValue} />
					{fieldTypeSelect}
					{fieldNameInput}
				</ul>
				{typeFieldInstruction}
				{typeField}
			</div>
		);
	}
}

VariableForm.propTypes = {
	importData: React.PropTypes.object,
	onUpdateVariable: React.PropTypes.func,
	onUpdateVariableTypeSpec: React.PropTypes.func
};

export default VariableForm;