import React from "react";
import ColumnSelect from "./column-select";
import SelectField from "../fields/select-field";


class Form extends React.Component {


  render() {
    const { onColumnSelect, onClearColumn, propertyMapping, targetableVres } = this.props;

    const relationInfo = propertyMapping && propertyMapping.variable[0]
      ? propertyMapping.variable[0]
      : {};

    const sourceColumnProps = {
      ...this.props,
      placeholder: "Select a source column...",
      onColumnSelect: (value) => onColumnSelect([{...relationInfo, variableName: value[0].variableName}])
    };




    return (
      <div>
        <ColumnSelect {...sourceColumnProps} />
        <SelectField value={relationInfo.targetExistingTimbuctooVre || null}
                     onChange={(value) => onColumnSelect([{...relationInfo, targetExistingTimbuctooVre: value}])}
                     onClear={() => onClearColumn(0)}>

          <span type="placeholder" className="from-excel"><img src="images/icon-excel.svg" alt=""/> Select a target dataset...</span>
          {targetableVres.map((dataset) => (
            <span key={dataset} value={dataset} className="from-excel"><img src="images/icon-excel.svg" alt=""/> {dataset}</span>
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
