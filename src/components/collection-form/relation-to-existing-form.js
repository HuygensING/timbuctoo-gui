import React from "react";
import ColumnSelect from "./column-select";
import SelectField from "../fields/select-field";


class Form extends React.Component {


  render() {
    const { targetableVres } = this.props;

    const sourceColumnProps = {
      ...this.props,
      placeholder: "Select a source column...",
      onColumnSelect: (value) => console.log(value)
    };

    return (
      <div>
        <ColumnSelect {...sourceColumnProps} />
        <SelectField value={null}
                     onChange={(value) => console.log(value)}
                     onClear={() => console.log("-clear-")}>

          <span type="placeholder" className="to-timbuctoo"><img src="images/logo-timbuctoo-icon.svg" alt=""/> Select a target dataset...</span>
          {targetableVres.map((dataset) => (
            <span key={dataset} value={dataset} className="from-excel"><img src="images/icon-excel.svg" alt=""/> {dataset.replace(/^[^_]+_+/, "")}</span>
          ))}
        </SelectField>
      </div>
    )
  }
}

Form.propTypes = {
  collectionData: React.PropTypes.object,
  mappings: React.PropTypes.object,
  name: React.PropTypes.string,
  onClearFieldMapping: React.PropTypes.func,
  onSetFieldMapping: React.PropTypes.func
};

export default Form;
