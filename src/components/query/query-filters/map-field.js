import React from "react";
import SelectField from "./fields/select";

const relateButton = (fieldDef, props) => (
		<button
			onClick={() => props.onAddQueryFilter(["and"], {
					name: fieldDef.relation.regularName,
					type: "relation",
					direction: "both",
					targetType: fieldDef.relation.isInverseName ? fieldDef.relation.sourceType : fieldDef.relation.targetType
				})}>
			{fieldDef.name}
		</button>
	);

const MAP = {
//	"string": (fieldDef, props) => (<StringField {...props} name={fieldDef.name} />),
//	"text": (fieldDef, props) => (<StringField {...props} name={fieldDef.name} />),
//	"datable": (fieldDef, props) => (<DatableField {...props} name={fieldDef.name} />),
//	"names": (fieldDef, props) => (<NamesField {...props} name={fieldDef.name} options={fieldDef.options} />),
	"multiselect": (fieldDef, props) => (<SelectField {...props} name={fieldDef.name} options={fieldDef.options} />),
	"select": (fieldDef, props) => (<SelectField {...props} name={fieldDef.name} options={fieldDef.options} />),
	"relation": relateButton,
	"keyword": relateButton,
	"unsupported": () => (null)
};

export default (fieldDef, props) => (MAP[fieldDef.type] || MAP.unsupported)(fieldDef, props);
