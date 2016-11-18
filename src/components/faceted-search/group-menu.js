import React from "react";
import SelectField from "../fields/select-field";

class GroupMenu extends React.Component {


  render() {
    const { fields, onChange, value } = this.props;

    return (
      <div className="pull-right">
        <span className="pull-right">
          <SelectField btnClass="btn-blank" onChange={(field) => onChange({field: field})} noClear={true}
                       value={value}>
            <span type="placeholder">Order</span>
            {Object.keys(fields).map((field) => (
              <span key={field} value={field}>{fields[field]}</span>
            ))}
          </SelectField>
        </span>
      </div>
    );
  }
}

GroupMenu.defaultProps = {
  sortFields: []
};

GroupMenu.propTypes = {
  onChange: React.PropTypes.func,
  sortFields: React.PropTypes.array
};

export default GroupMenu;