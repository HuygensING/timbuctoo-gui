import React from "react";
import StringField from "../../form/fields/string";
import TextField from "../../form/fields/text";
import LinksField from "../../form/fields/links";
import DatableField from "../../form/fields/datable";
import NamesField from "../../form/fields/names";
import MultiSelectField from "../../form/fields/multi-select";
import SelectField from "../../form/fields/select";
import RelationField from "../../form/fields/relation";
import KeywordField from "../../form/fields/keyword";

const relateButton = (fieldDef, props) => (
		<button
			onClick={() => props.onChange(["@relations"], (props.entity.data["@relations"] || [])
				.concat({name: fieldDef.name, targetType: fieldDef.relation.isInverseName ? fieldDef.relation.sourceType : fieldDef.relation.targetType }))} >
			{fieldDef.name}
		</button>
	);

const MAP = {
//	"string": (fieldDef, props) => (<StringField {...props} name={fieldDef.name} />),
//	"text": (fieldDef, props) => (<StringField {...props} name={fieldDef.name} />),
//	"datable": (fieldDef, props) => (<DatableField {...props} name={fieldDef.name} />),
//	"names": (fieldDef, props) => (<NamesField {...props} name={fieldDef.name} options={fieldDef.options} />),
	"multiselect": (fieldDef, props) => (<MultiSelectField {...props} name={fieldDef.name} options={fieldDef.options} />),
	"select": (fieldDef, props) => (<SelectField {...props} name={fieldDef.name} options={fieldDef.options} />),
	"relation": relateButton,
	"keyword": relateButton,
	"unsupported": (fieldDef, props) => (null)
};

export default (fieldDef, props) => (MAP[fieldDef.type] || MAP["unsupported"]) (fieldDef, props);
