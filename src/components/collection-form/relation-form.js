import React from "react";
import ColumnSelect from "./column-select";

const getSelectedTargetColumn = (objectMap) =>
  objectMap.joinCondition && objectMap.joinCondition.parent && objectMap.parentTriplesMap
    ? `${objectMap.parentTriplesMap}!${objectMap.joinCondition.parent}`
    : null;

class RelationForm extends React.Component {

  render() {
    const { onColumnSelect, predicateObjectMap: optionalPredicateObjectMap, availableCollectionColumnsPerArchetype, relationTypeInfo } = this.props;

    const objectMap = (optionalPredicateObjectMap || {}).objectMap || {};

    const sourceColumnProps = {
      ...this.props,
      valuePrefix: "(source) ",
      placeholder: "Select a source column...",
      onColumnSelect: (value) => onColumnSelect({
        ...(objectMap || {}),
        joinCondition: {
          ...((objectMap || {}).joinCondition || {}),
          child: value
        }
      })
    };

    const targetCollectionColumns = availableCollectionColumnsPerArchetype[relationTypeInfo.relation.targetCollection]
      .map((targetCollectionCols) => targetCollectionCols.columns.map((column) => `${targetCollectionCols.collectionName}!${column}`))
      .reduce((a,b) => a.concat(b));

    const targetColumnProps = {
      valuePrefix: "(target) ",
      columns: targetCollectionColumns,
      selectedColumn: getSelectedTargetColumn(objectMap),
      ignoredColumns: [],
      placeholder: "Select a target column...",
      onColumnSelect: (value) => onColumnSelect({
        ...(objectMap || {}),
        joinCondition: {
          ...((objectMap || {}).joinCondition || {}),
          parent: value.split("!")[1]
        },
        parentTriplesMap: value.split("!")[0]
      })
    };




    return (
      <div>
        <ColumnSelect {...sourceColumnProps} />
        <ColumnSelect {...targetColumnProps} />

      </div>
    )
  }
}

export default RelationForm;