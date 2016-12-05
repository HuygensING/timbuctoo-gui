import React from "react";
import SelectField from "../fields/select-field";


class ColumnSelect extends React.Component {


  render() {
    const { columns, selectedColumn, onColumnSelect, onClearColumn, placeholder, valuePrefix } = this.props;

    return (
      <SelectField value={selectedColumn} style={{display: "inline-block"}}
                   valuePrefix={valuePrefix}
                   onChange={(column) => onColumnSelect(column)}
                   onClear={() => onClearColumn(selectedColumn)}>

        <span type="placeholder" className="from-excel">
          <img src="images/icon-excel.svg" alt=""/> {placeholder || "Select an excel column"}
        </span>

        {columns.map((column) => (
          <span key={column} value={column} className="from-excel">
            <img src="images/icon-excel.svg" alt=""/>{" "}
            {valuePrefix && column === selectedColumn ? valuePrefix : ""}
            {column}
          </span>
        ))}
      </SelectField>
    );
  }
}

export default ColumnSelect;
