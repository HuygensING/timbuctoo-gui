import React from "react";
import SelectField from "../fields/select-field";


class ColumnSelect extends React.Component {


  render() {
    const { columns, selectedColumn, onColumnSelect, onClearColumn, placeholder, ignoredColumns } = this.props;

    return (
      <SelectField value={selectedColumn}
                   onChange={(column) => onColumnSelect(column)}
                   onClear={() => onClearColumn()}>

        <span type="placeholder" className="from-excel">
          <img src="images/icon-excel.svg" alt=""/> {placeholder || "Select an excel column"}
        </span>

        {columns.filter((column) => ignoredColumns.indexOf(column) < 0).map((column) => (
          <span key={column} value={column} className="from-excel"><img src="images/icon-excel.svg" alt=""/> {column}</span>
        ))}
      </SelectField>
    );
  }
}

export default ColumnSelect;
