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


const MAP = {
//	"string": (fieldDef, props) => (<StringField {...props} name={fieldDef.name} />),
//	"text": (fieldDef, props) => (<StringField {...props} name={fieldDef.name} />),
//	"datable": (fieldDef, props) => (<DatableField {...props} name={fieldDef.name} />),
//	"names": (fieldDef, props) => (<NamesField {...props} name={fieldDef.name} options={fieldDef.options} />),
	"multiselect": (fieldDef, props) => (<MultiSelectField {...props} name={fieldDef.name} options={fieldDef.options} />),
	"select": (fieldDef, props) => (<SelectField {...props} name={fieldDef.name} options={fieldDef.options} />),
//	"relation": (fieldDef, props) => (<RelationField {...props} name={fieldDef.name} path={fieldDef.path} />),
//	"keyword": (fieldDef, props) => (<RelationField {...props} fieldDefinition={fieldDef} name={fieldDef.name} />)
	"unsupported": (fieldDef, props) => (null)
};

export default (fieldDef, props) => (MAP[fieldDef.type] || MAP["unsupported"]) (fieldDef, props);
