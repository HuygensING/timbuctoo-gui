import React from "react";
import SelectField from "./fields/select";

const onSelectChange = (props, name, value) => {
	console.log(props, name, value);

	props.onAddQueryFilter(["or"], {type: "value", value: value});
};

const MAP = {
	"multiselect": (fieldDef, props) => (<SelectField {...props} name={fieldDef.name} onChange={(value) => onSelectChange(props, fieldDef.name, value)} options={fieldDef.options} />),
	"select": (fieldDef, props) => (<SelectField {...props} name={fieldDef.name} onChange={(value) => onSelectChange(props, fieldDef.name, value)} options={fieldDef.options} />),
	"unsupported": () => (null)
};

export default (fieldDef, props) => (MAP[fieldDef.type] || MAP.unsupported)(fieldDef, props);
