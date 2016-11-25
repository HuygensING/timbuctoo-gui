import React from "react";
import ColumnSelect from "./column-select";

class RelationForm extends React.Component {

  render() {
    const { onColumnSelect, predicateObjectMap } = this.props;

    const sourceColumnProps = {
      ...this.props,
      valuePrefix: "(source) ",
      placeholder: "Select a source column...",
      onColumnSelect: (value) => onColumnSelect({
        ...(predicateObjectMap || {}),
        joinCondition: {
          ...((predicateObjectMap || {}).joinCondition || {}),
          child: value
        }
      })
    };



    return (
      <div>
        <ColumnSelect {...sourceColumnProps} />

      </div>
    )
  }
}

export default RelationForm;