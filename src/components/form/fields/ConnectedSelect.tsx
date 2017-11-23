import React, { SFC } from 'react';
import { withRouter } from 'react-router';

import QUERY_COLLECTION_EDIT_VIEW from '../../../graphql/queries/CollectionEditView';

import Select, { OptionProps, SelectProps } from './Select';
import MetadataResolver, { ResolvedApolloProps } from '../../MetadataResolver';
import { CollectionMetadata, DataSetMetadata, Property } from '../../../typings/schema';
import { compose } from 'redux';

interface OwnProps {
    collectionId?: string;
    onChange: (value: string, property: Property) => void;
    shownAsMultipleItems?: boolean;
}

type Props = OwnProps & SelectProps & ResolvedApolloProps<{ dataSetMetadata: DataSetMetadata }, any, any>;

const SelectField: SFC<Props> = ({ name, selected, metadata, onChange, shownAsMultipleItems = false }) => {
    const collection: CollectionMetadata | null = metadata && metadata.dataSetMetadata && metadata.dataSetMetadata.collection
        ? metadata.dataSetMetadata.collection
        : null;

    const hiddenOptions = ['rdf_type'];

    const filterOptions = (property: Property) => (
        hiddenOptions.find(optionName => optionName !== property.name)
    );

    const options: OptionProps[] = collection
        ? collection.properties.items
            .filter(filterOptions)
            .map(property => ({ key: property.name, value: property.name }))
        : [];

    const onChangeHandler = (option: OptionProps) => {
        const property = collection
            ? collection.properties.items.find(field => field.name === option.value)
            : null;

        if (property && onChange) {
            onChange(option.value, property);
        }
    };

    return (
        <Select
            name={name}
            options={options}
            selected={selected}
            shownAsMultipleItems={shownAsMultipleItems}
            onChange={onChangeHandler}
            disabled={!options.length}
        />
    );
};

export default compose<SFC<OwnProps & SelectProps>>(
    withRouter,
    MetadataResolver(QUERY_COLLECTION_EDIT_VIEW)
)(SelectField);