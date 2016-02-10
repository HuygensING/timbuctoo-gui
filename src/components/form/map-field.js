import React from "react";
import StringField from "./fields/string";
import TextField from "./fields/text";
import LinksField from "./fields/links";
import DatableField from "./fields/datable";
import NamesField from "./fields/names";
import MultiSelectField from "./fields/multi-select";
import SelectField from "./fields/select";
import RelationField from "./fields/relation";
import KeywordField from "./fields/keyword";


const MAP = {
	"string": (fieldDef, props) => (<StringField {...props} name={fieldDef.name} />),
	"text": (fieldDef, props) => (<TextField {...props} name={fieldDef.name} />),
	"links": (fieldDef, props) => (<LinksField {...props} name={fieldDef.name} />),
	"datable": (fieldDef, props) => (<DatableField {...props} name={fieldDef.name} />),
	"names": (fieldDef, props) => (<NamesField {...props} name={fieldDef.name} />),
	"multiselect": (fieldDef, props) => (<MultiSelectField {...props} name={fieldDef.name} options={fieldDef.options} />),
	"select": (fieldDef, props) => (<SelectField {...props} name={fieldDef.name} options={fieldDef.options} />),
	"relation": (fieldDef, props) => (<RelationField {...props} name={fieldDef.name} />),
	"keyword": (fieldDef, props) => (<KeywordField {...props} name={fieldDef.name} />)
};

export default (fieldDef, props) => MAP[fieldDef.type](fieldDef, props);
