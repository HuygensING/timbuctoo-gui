import React from "react";
import SelectField from "../fields/select-field";

class AddProperty extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      newName: "",
      newType: null
    };
  }


  onEnter(newName, newType) {
    if (newType !== null) {
      this.setState({newName: null, newType: null});
      this.props.onAddCustomProperty(newName, newType);
    }
  }

  render() {
    const { newName, newType } = this.state;
    const { onAddCustomProperty } = this.props;

    return (
      <div className="row small-margin">
        <hr/>
        <div className="col-sm-2 pad-6-12">
          <strong>Add a new property</strong>
        </div>
        <div className="col-sm-6" >
          <span>
            <SelectField
              value={newType}
              onChange={(value) => this.setState({newType: value, newName: newName})}
              onClear={() => this.setState({newType: null})}>
              <span type="placeholder">Choose a type...</span>
              <span value="text">Text format</span>
              <span value="datable">Datable format</span>
            </SelectField>
          </span>
        </div>
        <div className="col-sm-2">
          <input className="form-control"
                  onChange={(ev) => this.setState({newName: ev.target.value})}
                  onKeyPress={(ev) => ev.key === "Enter" ? this.onEnter(newName, newType) : false}
                  placeholder="Enter name"
                  value={newName} />
        </div>


        <div className="col-sm-2">

          <button className="pull-right btn btn-default" disabled={!(newName && newType)}
                  onClick={() => {
                    this.setState({newName: null, newType: null});
                    onAddCustomProperty(newName, newType);
                  }}>
            Add property
          </button>
        </div>
      </div>
    )
  }
}

export default AddProperty;
