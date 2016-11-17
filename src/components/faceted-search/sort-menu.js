import React from "react";
import SelectField from "../fields/select-field";

class SortMenu extends React.Component {


  render() {
    const { sortFields, onChange } = this.props;
    if (sortFields.length === 0) { return null; }

    const value = sortFields.find((sf) => sf.value);

    return (
      <div className="pull-right">
        <span className="pull-right">
          <SelectField btnClass="btn-blank" onChange={(sortField) => onChange(sortField, "asc")} noClear={true}
                       value={value ? value.field : null}>
            <span type="placeholder">Order</span>
            {sortFields.map((sortField) => (
              <span key={sortField.field} value={sortField.field}>{sortField.label}</span>
            ))}
          </SelectField>
        </span>
      </div>
    );
  }
}

SortMenu.defaultProps = {
  sortFields: []
};

SortMenu.propTypes = {
  onChange: React.PropTypes.func,
  sortFields: React.PropTypes.array
};

export default SortMenu;