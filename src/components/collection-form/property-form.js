import React from "react";

import ColumnSelect from "./column-select";
import { propertyMappingIsComplete } from "../../validators/property-mappings"

const typeMap = {
  text: (props) => <ColumnSelect {...props} />,
  datable: (props) => <ColumnSelect {...props} />,
  select: (props) => <ColumnSelect {...props} />,
/*
  multiselect: (props) => <ColumnSelect {...props} />,
*/
};



class PropertyForm extends React.Component {

  render() {

    const { onAddPredicateObjectMap, onRemovePredicateObjectMap } = this.props;

    const { name, type, custom, columns, ignoredColumns, predicateObjectMap } = this.props;

    const formComponent = typeMap[type]
      ? typeMap[type]({
      columns: columns,
      ignoredColumns: ignoredColumns,
      selectedColumn: predicateObjectMap && predicateObjectMap.objectMap.column ? predicateObjectMap.objectMap.column : null,
      onColumnSelect: (value) => onAddPredicateObjectMap(name, value, type),
      onClearColumn: () => onRemovePredicateObjectMap(name)
    }) : <span>type not yet supported: <span style={{color: "red"}}>{type}</span></span>;

    const unConfirmButton = propertyMappingIsComplete(predicateObjectMap)
      ? (<button className="btn btn-blank" onClick={() => onRemovePredicateObjectMap(name)}>
          <span className="hi-success glyphicon glyphicon-ok" />
        </button>) : null;

    return (
      <div className="row small-margin">
        <div className="col-sm-2 pad-6-12"><strong>{name}</strong> <span className="pull-right">({type})</span></div>
        <div className="col-sm-8">
          {formComponent}
        </div>
        <div className="col-sm-1">
          { custom
            ? (<button className="btn btn-blank pull-right" type="button" onClick={() => onRemoveCustomProperty(name)}>
            <span className="glyphicon glyphicon-remove"/>
          </button>)
            : null }
        </div>
        <div className="col-sm-1 hi-success">
          {unConfirmButton}
        </div>
      </div>
    );
  }
}

export default PropertyForm;