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

    const formRows = ["Given name(s) or initial(s)", "Family name(s)", "Family name prefix(es) (e.g. ‘de’, ‘van der’, certain noble titles)", "Name suffix(es) (e.g. ‘jr.’, ‘sr.’, ‘Ph.D’)", "Name prefix(es) (e.g. ‘dr.’, ‘prof.’, royal and certain noble titles)","Patronym", "Pseudonym"]
      .map((predicate) => (
        <div key={predicate} className="row">
          <span style={{display: "inline-block", paddingLeft: "12px", width: "450px"}}>
            {predicate}
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
