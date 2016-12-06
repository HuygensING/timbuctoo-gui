import React from "react";
import SelectField from "../fields/select-field";
import ColumnSelect from "./column-select";

class AddRelation extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      newRelation: null,
      selectedSourceColumn: null,
      selectedTargetColumn: null
    };
  }


  render() {
    const { newRelation, selectedSourceColumn, selectedTargetColumn } = this.state;
    const { onAddCustomProperty, archetypeFields, availableArchetypes, columns, availableCollectionColumnsPerArchetype } = this.props;

    const relationTypeOptions = archetypeFields
      .filter((prop) => prop.type === "relation")
      .filter((prop) => availableArchetypes.indexOf(prop.relation.targetCollection) > -1)
      .map((prop) => <span key={prop.name} value={prop.name}>{prop.name}</span>);

    const relationTypeInfo = newRelation
      ? archetypeFields.find((af) => af.name === newRelation)
      : null;

    const targetCollectionColumns = relationTypeInfo
      ? availableCollectionColumnsPerArchetype[relationTypeInfo.relation.targetCollection]
          .map((targetCollectionCols) => targetCollectionCols.columns.map((column) => `${targetCollectionCols.collectionName}!${column}`))
          .reduce((a, b) => a.concat(b)) : null;

    const targetColumnSelect = targetCollectionColumns
      ? <ColumnSelect columns={targetCollectionColumns} selectedColumn={selectedTargetColumn}
          valuePrefix="(target) "
          placeholder="Select a target column..."
          onClearColumn={() => this.setState({selectedTargetColumn: null})}
          onColumnSelect={(column) => this.setState({selectedTargetColumn: column})} />
      : null;

    return (
      <div className="row small-margin">
        <div className="col-sm-2 pad-6-12">
          <strong>Add a relation</strong>
        </div>
        <div className="col-sm-3">
          <ColumnSelect columns={columns} selectedColumn={selectedSourceColumn}
                        valuePrefix="(source) "
                        placeholder="Select a source column..."
                        onClearColumn={() => this.setState({selectedSourceColumn: null})}
                        onColumnSelect={(column) => this.setState({selectedSourceColumn: column})} />
        </div>
        <div className="col-sm-3">
            <SelectField
              value={newRelation}
              onChange={(value) => this.setState({newRelation: value})}
              onClear={() => this.setState({newRelation: null})}>
              <span type="placeholder">Choose a relation type...</span>
              {relationTypeOptions}
            </SelectField>
        </div>
        <div className="col-sm-3">
          {targetColumnSelect}
        </div>

        <div className="col-sm-1">

          <button className="pull-right btn btn-default" disabled={!(newRelation && selectedSourceColumn && selectedTargetColumn)}
                  onClick={() => {
                    this.setState({newRelation: null});
                    onAddCustomProperty(newRelation, "relation", selectedSourceColumn, selectedTargetColumn);
                  }}>
            Add relation
          </button>
        </div>
      </div>
    )
  }
}

export default AddRelation;
