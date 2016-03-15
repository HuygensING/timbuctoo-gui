import React from "react";
import SelectField from "./fields/select";
import DatableField from "./fields/datable";


const onSelectChange = (props, name, value) => {
	props.onAddQueryFilter(props.filterPath, {type: "value", value: value});
};

const onDatableChange = (props, name, value) => {
	const makeLabel = () => {
		return `${value.operation}(${value.values.filter((v) => v.length).join(", ")})`;
	};

	props.onAddQueryFilter(props.filterPath, {
		type: value.operation,
		values: value.values.filter((v) => v.length),
		label: makeLabel()
	});
};

const MAP = {
	"datable": (fieldDef, props) => <DatableField {...props} name={fieldDef.name} onChange={(value) => onDatableChange(props, fieldDef.name, value)} />,
	"multiselect": (fieldDef, props) => (<SelectField {...props} name={fieldDef.name} onChange={(value) => onSelectChange(props, fieldDef.name, value)} options={fieldDef.options} />),
	"select": (fieldDef, props) => (<SelectField {...props} name={fieldDef.name} onChange={(value) => onSelectChange(props, fieldDef.name, value)} options={fieldDef.options} />),
	"unsupported": () => (null)
};

export default (fieldDef, props) => (MAP[fieldDef.type] || MAP.unsupported)(fieldDef, props);
