import React from "react";
import SelectField from "./fields/select";

const relateButton = (fieldDef, props) => (
		<button
			onClick={() => props.onAddQueryFilter(["and"], {
					name: fieldDef.relation.outName,
					type: "relation",
					direction: fieldDef.relation.direction.toLowerCase(),
					targetType: fieldDef.relation.targetCollection.replace(/s$/, "")
				})}>
			{fieldDef.name}
		</button>
	);

const onSelectChange = (props, name, value) => {
	props.onAddQueryFilter(["and"], {
		type: "property",
		name: name,
		or: [{type: "value", value: value}]
	});
};

const MAP = {
	"multiselect": (fieldDef, props) => (<SelectField {...props} name={fieldDef.name} onChange={(value) => onSelectChange(props, fieldDef.name, value)} options={fieldDef.options} />),
	"select": (fieldDef, props) => (<SelectField {...props} name={fieldDef.name} onChange={(value) => onSelectChange(props, fieldDef.name, value)} options={fieldDef.options} />),
	"relation": relateButton,
	"keyword": relateButton,
	"unsupported": () => (null)
};

export default (fieldDef, props) => (MAP[fieldDef.type] || MAP.unsupported)(fieldDef, props);
