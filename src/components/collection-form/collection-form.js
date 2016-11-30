import React from "react";
import PropertyForm from "./property-form";
import AddProperty from "./add-property";
import AddRelation from "./add-relation";

class CollectionForm extends React.Component {

  render() {
    const { onAddPredicateObjectMap, onRemovePredicateObjectMap,
      onAddCustomProperty, onRemoveCustomProperty, onTargetDatasetSelect } = this.props;

    const {
      archetypeFields,
      availableArchetypes,
      columns,
      ignoredColumns,
      availableCollectionColumnsPerArchetype,
      targetableVres
    } = this.props;

    const { predicateObjectMappings, customProperties } = this.props;

    const archeTypePropFields = archetypeFields.filter((af) => af.type !== "relation");

    const propertyForms = archeTypePropFields
      .map((af, i) => (
        <PropertyForm key={i} name={af.name} type={af.type} custom={false}
                      columns={columns} ignoredColumns={ignoredColumns}
                      predicateObjectMap={predicateObjectMappings.find((pom) => pom.predicate === af.name)}
                      predicateObjectMappings={predicateObjectMappings}
                      onAddPredicateObjectMap={onAddPredicateObjectMap}
                      onRemovePredicateObjectMap={onRemovePredicateObjectMap} />
      ));

    const customPropertyForms = customProperties
      .map((customProp, i) => (
        <PropertyForm key={i} name={customProp.propertyName} type={customProp.propertyType} custom={true} customIndex={i}
                      columns={columns} ignoredColumns={ignoredColumns}
                      predicateObjectMap={predicateObjectMappings.find((pom) => pom.predicate === customProp.propertyName)}
                      predicateObjectMappings={predicateObjectMappings}
                      onAddPredicateObjectMap={onAddPredicateObjectMap}
                      onRemovePredicateObjectMap={onRemovePredicateObjectMap}
                      onRemoveCustomProperty={onRemoveCustomProperty}
                      availableCollectionColumnsPerArchetype={availableCollectionColumnsPerArchetype}
                      relationTypeInfo={archetypeFields.find((af) => af.name === customProp.propertyName)}
                      targetableVres={targetableVres}
                      onTargetDatasetSelect={onTargetDatasetSelect}
        />
      ));
    return (
      <div className="container basic-margin">
        {propertyForms}
        {customPropertyForms}
        <AddProperty onAddCustomProperty={onAddCustomProperty} />
        <AddRelation
          archetypeFields={archetypeFields}
          availableArchetypes={availableArchetypes}
          onAddCustomProperty={onAddCustomProperty} />
      </div>
    );
  }
}

export default CollectionForm;