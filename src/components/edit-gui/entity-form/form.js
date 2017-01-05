import React from "react"

import StringField from "./fields/string-field";
import SelectField from "./fields/select";
import MultiSelectField from "./fields/multi-select";
import RelationField from "./fields/relation";
import StringListField from "./fields/list-of-strings";
import LinkField from "./fields/links";
import NamesField from "./fields/names";
import { Link } from "react-router";
import { urls } from "../../../urls";
import camel2label from "./fields/camel2label";

const fieldMap = {
	"string": (fieldDef, props) => (<StringField {...props} name={fieldDef.name} />),
	"text": (fieldDef, props) => (<StringField {...props} name={fieldDef.name} />),
	"datable": (fieldDef, props) => (<StringField {...props} name={fieldDef.name} />),
	"multiselect": (fieldDef, props) => (<MultiSelectField {...props} name={fieldDef.name} options={fieldDef.options} />),
	"select": (fieldDef, props) => (<SelectField {...props} name={fieldDef.name} options={fieldDef.options} />),
	"relation": (fieldDef, props) => (<RelationField {...props} name={fieldDef.name} targetCollection={fieldDef.relation.targetCollection} path={fieldDef.quicksearch} />),
  "list-of-strings": (fieldDef, props) => (<StringListField {...props} name={fieldDef.name} />),
  "links": (fieldDef, props) => (<LinkField {...props} name={fieldDef.name} />),
	"names": (fieldDef, props) => (<NamesField {...props} name={fieldDef.name} options={fieldDef.options} />)
};

class EntityForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      fieldsToAdd: []
    }
  }

  toggleFieldToAdd(fieldName) {
    if (this.state.fieldsToAdd.indexOf(fieldName) > -1) {
      this.setState({fieldsToAdd: this.state.fieldsToAdd.filter((fAdd) => fAdd !== fieldName)});
    } else {
      this.setState({fieldsToAdd: this.state.fieldsToAdd.concat(fieldName)});
    }
  }

  onAddSelectedFields() {
    const { properties } = this.props;

    this.props.onAddSelectedFields(this.state.fieldsToAdd.map((fAdd) => ({
      name: fAdd,
      type: properties.find((prop) => prop.name === fAdd).type
    })));

    this.setState({fieldsToAdd: []});
  }

  render() {
    const { onDelete, onChange, getAutocompleteValues } = this.props;
    const { entity, currentMode, properties, entityLabel } = this.props;
    const { fieldsToAdd } = this.state;
    console.log(entity.data);
    return (
      <div className="col-sm-6 col-md-8">
        <div className="basic-margin">
          <Link to={urls.newEntity(entity.domain)} className="btn btn-primary pull-right">
            New {entityLabel}
          </Link>
        </div>


        {properties
          .filter((fieldDef) => !fieldMap.hasOwnProperty(fieldDef.type))
          .map((fieldDef, i) => (<div key={i} style={{"color": "red"}}><strong>Field type not supported: {fieldDef.type}</strong></div>))}

        {properties
          .filter((fieldDef) => fieldMap.hasOwnProperty(fieldDef.type))
          .filter((fieldDef) => entity.data.hasOwnProperty(fieldDef.name) || entity.data["@relations"].hasOwnProperty(fieldDef.name))
          .map((fieldDef, i) =>
          fieldMap[fieldDef.type](fieldDef, {
						key: `${i}-${fieldDef.name}`,
						entity: entity,
						onChange: onChange,
						getAutocompleteValues: getAutocompleteValues
					})
        )}

        <div className="basic-margin add-field-form">
          <h4>Add fields</h4>
          <div style={{maxHeight: "250px", overflowY: "auto"}}>
            {properties
              .filter((fieldDef) => fieldMap.hasOwnProperty(fieldDef.type))
              .filter((fieldDef) => !entity.data.hasOwnProperty(fieldDef.name) && !entity.data["@relations"].hasOwnProperty(fieldDef.name))
              .map((fieldDef, i) => (
                <div key={i} onClick={() => this.toggleFieldToAdd(fieldDef.name)}
                     className={fieldsToAdd.indexOf(fieldDef.name) > -1 ? "selected" : ""}>
                  <span className="pull-right">({fieldDef.type})</span>
                  {camel2label(fieldDef.name)}
                </div>
              ))
            }
          </div>
          <button className="btn btn-default" onClick={this.onAddSelectedFields.bind(this)}>Add selected fields</button>
        </div>
        {currentMode === "edit"
          ? (<div className="basic-margin">
              <h4>Delete</h4>
              <buton className="btn btn-danger" onClick={onDelete}>
                Delete {entityLabel}
              </buton>
            </div>
          ) : null}
      </div>
    )
  }
}

export default EntityForm;
