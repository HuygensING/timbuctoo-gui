import React from "react";
import PropertyForm from "./property-form";


class CollectionForm extends React.Component {

  render() {
    const { onAddPredicateObjectMap, onRemovePredicateObjectMap } = this.props;

    const { archetypeFields, columns, ignoredColumns } = this.props;

    const { predicateObjectMappings } = this.props;

    const archeTypePropFields = archetypeFields.filter((af) => af.type !== "relation");

    console.log(predicateObjectMappings);

    const propertyForms = archeTypePropFields
      .map((af, i) => (
        <PropertyForm key={i} name={af.name} type={af.type} custom={false}
                      columns={columns} ignoredColumns={ignoredColumns}
                      predicateObjectMap={predicateObjectMappings.find((pom) => pom.predicate === af.name)}
                      onAddPredicateObjectMap={onAddPredicateObjectMap}
                      onRemovePredicateObjectMap={onRemovePredicateObjectMap} />
      ));

    return (
      <div className="container basic-margin">
        {propertyForms}
      </div>
    );
  }
}

export default CollectionForm;