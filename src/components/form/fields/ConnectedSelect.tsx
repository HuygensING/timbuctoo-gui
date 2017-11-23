import React, { SFC } from 'react';
import { withRouter } from 'react-router';

import QUERY_COLLECTION_EDIT_VIEW from '../../../graphql/queries/CollectionEditView';

import Select, { OptionProps, SelectProps } from './Select';
import MetadataResolver, { ResolvedApolloProps } from '../../MetadataResolver';
import { CollectionMetadata, DataSetMetadata, Property } from '../../../typings/schema';
import { compose } from 'redux';

interface Props {
    collectionId?: string;
    onChange: (value: string, property: Property) => void;
}

type FullProps = Props & SelectProps & ResolvedApolloProps<{ dataSetMetadata: DataSetMetadata }, any, any>;

const SelectField: SFC<FullProps> = ({ name, selected, metadata, onChange }) => {
    const collection: CollectionMetadata | null =
        metadata && metadata.dataSetMetadata && metadata.dataSetMetadata.collection
            ? metadata.dataSetMetadata.collection
            : null;

    const options: OptionProps[] = collection
        ? collection.properties.items.map(property => ({ key: property.name, value: property.name }))
        : [];

    const onChangeHandler = (option: OptionProps) => {
        const property = collection ? collection.properties.items.find(field => field.name === option.value) : null;

        if (property && onChange) {
            onChange(option.value, property);
        }
    };

    if (!options.length) {
        return null;
    }

    return <Select name={name} options={options} selected={selected} onChange={onChangeHandler} />;
};

export default compose(withRouter, MetadataResolver(QUERY_COLLECTION_EDIT_VIEW))(SelectField);
