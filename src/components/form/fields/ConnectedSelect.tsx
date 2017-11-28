import React, { SFC } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import QUERY_COLLECTION_EDIT_VIEW, { Props as CollectionEditViewProps } from '../../../graphql/queries/CollectionEditView';
import Select, { OptionProps, SelectProps } from './Select';
import { CollectionMetadata, Property } from '../../../typings/schema';
import { compose } from 'redux';
import { default as metaDataResolver, MetaDataProps } from '../../../services/metaDataResolver';

interface OwnProps extends SelectProps, CollectionEditViewProps {
    onChange: (value: string, property: Property) => void;
}

export type FullProps = OwnProps & RouteComponentProps<{dataSet: string}> & MetaDataProps;

const SelectField: SFC<FullProps> = ({ name, selected, metadata, onChange }) => {

    const collection: CollectionMetadata | null = metadata && metadata.dataSetMetadata && metadata.dataSetMetadata.collection
        ? metadata.dataSetMetadata.collection
        : null;

    const options: OptionProps[] = collection
        ? collection.properties.items.map(
            property => ({ key: property.name, value: property.name })
        )
        : [];

    const onChangeHandler = (option: OptionProps) => {
        const property = collection
            ? collection.properties.items.find(field => field.name === option.value)
            : null;

        if (property && onChange) {
            onChange(option.value, property);
        }
    };

    if (!options.length) {
        return null;
    }

    return (
        <Select
            name={name}
            options={options}
            selected={selected}
            onChange={onChangeHandler}
        />
    );
};

export default compose<SFC<OwnProps>>(
    withRouter,
    metaDataResolver<FullProps>(QUERY_COLLECTION_EDIT_VIEW)
)(SelectField);