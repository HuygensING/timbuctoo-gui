import React from "react";
import ColumnSelect from "./column-select";
import camel2label from "../../util/camel2label";
import {getColumnValue} from "../../accessors/property-mappings";


const getObjectForPredicate = (predicateObjectMappings, predicate) =>
  predicateObjectMappings
    .filter((pom) => pom.predicate === predicate)
    .map((pom) => getColumnValue(pom))[0];

class NamesForm extends React.Component {


  render() {
    const { columns, predicateObjectMappings, onColumnSelect, onClearColumn } = this.props;

    const formRows = ["forename", "surname", "nameLink", "genName", "roleName"]
      .map((predicate) => (
        <div key={predicate} className="row">
          <span style={{display: "inline-block", paddingLeft: "12px", width: "92px"}}>
            {camel2label(predicate)}
          </span>
          <ColumnSelect columns={columns}
                        selectedColumn={getObjectForPredicate(predicateObjectMappings, predicate)}
                        onColumnSelect={(value) => onColumnSelect(value, predicate)}
                        onClearColumn={(value) => onClearColumn(value, predicate)}
          />
        </div>)
      );

    return (
      <div>
        {formRows}
      </div>
    );
  }
}

export default NamesForm;
