import React from "react";

import ColumnSelect from "./column-select";
import NamesForm from "./names-form";
import RelationForm from "./relation-form";

import { propertyMappingIsComplete } from "../../accessors/property-mappings"
import {getColumnValue} from "../../accessors/property-mappings";

const typeMap = {
  text: (props) => <ColumnSelect {...props} />,
  datable: (props) => <ColumnSelect {...props} />,
  select: (props) => <ColumnSelect {...props} />,
  names: (props) => <NamesForm {...props} />,
  relation: (props) => <RelationForm {...props} />
/*
  multiselect: (props) => <ColumnSelect {...props} />,
*/
};



class PropertyForm extends React.Component {

  render() {

    const { onAddPredicateObjectMap, onRemovePredicateObjectMap, onRemoveCustomProperty,
      availableCollectionColumnsPerArchetype, relationTypeInfo } = this.props;

    const { name, type, custom, customIndex, columns, ignoredColumns, predicateObjectMap, predicateObjectMappings } = this.props;

    const formComponent = typeMap[type]
      ? typeMap[type]({
        columns: columns,
        ignoredColumns: ignoredColumns,
        selectedColumn: getColumnValue(predicateObjectMap),
        predicateObjectMap: predicateObjectMap,
        predicateObjectMappings: predicateObjectMappings,
        availableCollectionColumnsPerArchetype: availableCollectionColumnsPerArchetype,
        relationTypeInfo: relationTypeInfo,
        onColumnSelect: (value, predicate) => onAddPredicateObjectMap(predicate || name, value, type),
        onClearColumn: (value, predicate) => onRemovePredicateObjectMap(predicate || name, value)
      })
      : <span>type not yet supported: <span style={{color: "red"}}>{type}</span></span>;

    const unConfirmButton = propertyMappingIsComplete(predicateObjectMap)
      ? (<button className="btn btn-blank" onClick={() => onRemovePredicateObjectMap(name, getColumnValue(predicateObjectMap))}>
          <span className="hi-success glyphicon glyphicon-ok" />
        </button>) : null;

    return (
      <div className="row small-margin">
        <div className="col-sm-2 pad-6-12">
          <strong>{name}</strong>
          <span className="pull-right" style={{fontSize: "0.7em"}}>({type})</span>
        </div>
        <div className="col-sm-8">
          {formComponent}
        </div>
        <div className="col-sm-1">
          { custom
            ? (<button className="btn btn-blank pull-right" type="button" onClick={() => onRemoveCustomProperty(customIndex)}>
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