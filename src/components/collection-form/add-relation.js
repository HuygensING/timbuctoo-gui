import React from "react";
import SelectField from "../fields/select-field";

class AddRelation extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      newName: "",
    };
  }


  render() {
    const { newName, newType } = this.state;
    const { onAddCustomProperty, archetypeFields, availableArchetypes } = this.props;

    const relationTypeOptions = archetypeFields
      .filter((prop) => prop.type === "relation")
      .filter((prop) => availableArchetypes.indexOf(prop.relation.targetCollection) > -1)
      .map((prop) => <span key={prop.name} value={prop.name}>{prop.name}</span>);

    return (
      <div className="row small-margin">
        <div className="col-sm-2 pad-6-12">
          <strong>Add a relation</strong>
        </div>
        <div className="col-sm-8" >
            <SelectField
              value={newName}
              onChange={(value) => this.setState({newName: value})}
              onClear={() => this.setState({newName: ""})}>
              <span type="placeholder">Choose a relation type...</span>
              {relationTypeOptions}
            </SelectField>
        </div>


        <div className="col-sm-2">

          <button className="pull-right btn btn-default" disabled={!newName}
                  onClick={() => {
                    this.setState({newName: null});
                    onAddCustomProperty(newName, "relation");
                  }}>
            Add relation
          </button>
        </div>
      </div>
    )
  }
}

export default AddRelation;
