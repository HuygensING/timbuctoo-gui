import React from "react";
import PropertyForm from "./property-form";
import AddProperty from "./add-property";

class CollectionForm extends React.Component {

  render() {
    const { onAddPredicateObjectMap, onRemovePredicateObjectMap, onAddCustomProperty } = this.props;

    const { archetypeFields, availableArchetypes, columns, ignoredColumns } = this.props;

    const { predicateObjectMappings } = this.props;

    const archeTypePropFields = archetypeFields.filter((af) => af.type !== "relation");

    /*console.log(predicateObjectMappings);*/

    const propertyForms = archeTypePropFields
      .map((af, i) => (
        <PropertyForm key={i} name={af.name} type={af.type} custom={false}
                      columns={columns} ignoredColumns={ignoredColumns}
                      predicateObjectMap={predicateObjectMappings.find((pom) => pom.predicate === af.name)}
                      predicateObjectMappings={predicateObjectMappings}
                      onAddPredicateObjectMap={onAddPredicateObjectMap}
                      onRemovePredicateObjectMap={onRemovePredicateObjectMap} />
      ));

    return (
      <div className="container basic-margin">
        {propertyForms}
        <AddProperty
          archetypeFields={archetypeFields}
          availableArchetypes={availableArchetypes}
          onAddCustomProperty={(name, type) => onAddCustomProperty(name, type)} />
      </div>
    );
  }
}

export default CollectionForm;