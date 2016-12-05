import React from "react";

import ColumnSelect from "./column-select";
import NamesForm from "./names-form";
import RelationForm from "./relation-form";
import { propertyMappingIsComplete } from "../../accessors/property-mappings"
import { getColumnValue } from "../../accessors/property-mappings";
import camel2label from "../../util/camel2label";

const typeMap = {
  text: (props) => <ColumnSelect {...props} />,
  datable: (props) => <ColumnSelect {...props} />,
  select: (props) => <ColumnSelect {...props} />,
  sameAs: (props) => <ColumnSelect {...props} />,
  names: (props) => <NamesForm {...props} />,
  relation: (props) => <RelationForm {...props} />,
  "relation-to-existing": (props) => <RelationToExistingForm {...props} />,
  multiselect: (props) => <ColumnSelect {...props} />,
};

const isCompleteForNames = (type, predicateObjectMappings) =>
  type === "names" && predicateObjectMappings
    .filter((pom) => ["forename", "surname", "nameLink", "genName", "roleName"].indexOf(pom.predicate) > -1)
    .filter((pom) => propertyMappingIsComplete(pom))
    .length > 0;

class PropertyForm extends React.Component {

  render() {

    const { onAddPredicateObjectMap, onRemovePredicateObjectMap, onRemoveCustomProperty,
      availableCollectionColumnsPerArchetype, relationTypeInfo, targetableVres } = this.props;

    const { name: predicateName, type, custom, customIndex, columns, predicateObjectMap, predicateObjectMappings } = this.props;

    const formComponent = typeMap[type]
      ? typeMap[type]({
        columns: columns,
        selectedColumn: getColumnValue(predicateObjectMap),
        predicateObjectMap: predicateObjectMap,
        predicateObjectMappings: predicateObjectMappings,
        availableCollectionColumnsPerArchetype: availableCollectionColumnsPerArchetype,
        relationTypeInfo: relationTypeInfo,
        targetableVres: targetableVres,
        onColumnSelect: (value, predicate) => onAddPredicateObjectMap(predicate || predicateName, value, type),
        onClearColumn: (value, predicate) => onRemovePredicateObjectMap(predicate || predicateName, value)
      })
      : <span>type not yet supported: <span style={{color: "red"}}>{type}</span></span>;

    const unConfirmButton = propertyMappingIsComplete(predicateObjectMap) || isCompleteForNames(type, predicateObjectMappings)
      ? (<button className="btn btn-blank" onClick={() => onRemovePredicateObjectMap(predicateName, getColumnValue(predicateObjectMap))}>
          <span className="hi-success glyphicon glyphicon-ok" />
        </button>) : null;

    return (
      <div className="row small-margin">
        <div className="col-sm-2 pad-6-12">
          <strong>{camel2label(predicateName)}</strong>
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