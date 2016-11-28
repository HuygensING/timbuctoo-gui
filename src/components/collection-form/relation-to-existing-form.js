import React from "react";
import ColumnSelect from "./column-select";
import SelectField from "../fields/select-field";


class Form extends React.Component {


  render() {
    const { onColumnSelect, onTargetDatasetSelect } = this.props;

    const { predicateObjectMap: optionalPredicateObjectMap, targetableVres } = this.props;

    const predicateObjectMap = optionalPredicateObjectMap || {};

    const objectMap = predicateObjectMap.objectMap || {};

    const sourceColumnProps = {
      ...this.props,
      valuePrefix: "(source) ",
      placeholder: "Select a source column...",
      onColumnSelect: (value) => onColumnSelect({
        ...(objectMap || {}),
        column: value
      })
    };

    return (
      <div>
        <ColumnSelect {...sourceColumnProps} />
        <SelectField value={predicateObjectMap.dataset}
                     onChange={onTargetDatasetSelect}
                     noClear={true}>

          <span type="placeholder" className="to-timbuctoo"><img src="images/logo-timbuctoo-icon.svg" alt=""/> Select a target dataset...</span>
          {targetableVres.map((dataset) => (
            <span key={dataset} value={dataset} className="from-excel"><img src="images/icon-excel.svg" alt=""/>{" "}
              {dataset === predicateObjectMap.dataset ? "(target collection) " + dataset.replace(/^[^_]+_+/, "") : dataset.replace(/^[^_]+_+/, "")}
            </span>
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
