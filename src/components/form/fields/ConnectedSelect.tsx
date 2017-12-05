import React, { SFC } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import QUERY_COLLECTION_EDIT_VIEW, {
    Props as CollectionEditViewProps
} from '../../../graphql/queries/CollectionEditView';
import Select, { OptionProps, SelectProps } from './Select';
import { CollectionMetadata, Property } from '../../../typings/schema';
import { compose } from 'redux';
import { default as metaDataResolver, MetaDataProps } from '../../../services/metaDataResolver';
import { RDF_TYPE } from '../../../constants/global';
import handleError from '../../../services/handleError';

interface OwnProps extends SelectProps, CollectionEditViewProps {
    onChange: (value: string, property: Property) => void;
    shownAsMultipleItems?: boolean;
}

export type Props = OwnProps & RouteComponentProps<{ dataSet: string }> & MetaDataProps;

const SelectField: SFC<Props> = ({ name, selected, metadata, onChange, shownAsMultipleItems = false }) => {
    const collection: CollectionMetadata | null =
        metadata && metadata.dataSetMetadata && metadata.dataSetMetadata.collection
            ? metadata.dataSetMetadata.collection
            : null;

    const options: OptionProps[] = collection
        ? collection.properties.items
              .filter(property => property.name !== RDF_TYPE)
              .map(property => ({ key: property.name, value: property.name }))
        : [];

    const onChangeHandler = (option: OptionProps) => {
        const property = collection ? collection.properties.items.find(field => field.name === option.value) : null;

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

export default compose<SFC<OwnProps>>(
    withRouter,
    metaDataResolver<Props>(QUERY_COLLECTION_EDIT_VIEW),
    handleError('metadata')
)(SelectField);
