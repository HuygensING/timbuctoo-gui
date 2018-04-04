import React, { SFC } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import QUERY_COLLECTION_EDIT_VIEW, {
    Props as CollectionEditViewProps
} from '../../../graphql/queries/CollectionEditView';
import Select, { OptionProps, SelectProps } from './Select';
import { CollectionMetadata, Property } from '../../../typings/schema';
import { compose } from 'redux';
import { default as metaDataResolver, MetaDataProps } from '../../../services/metaDataResolver';
import verifyResponse from '../../../services/verifyResponse';
import { branch, renderNothing } from 'recompose';

interface OwnProps extends SelectProps, CollectionEditViewProps {
    onChange: (value: string | null, property: Property | 'uri') => void;
    shownAsMultipleItems?: boolean;
}

export type Props = OwnProps & RouteComponentProps<{ dataSet: string }> & MetaDataProps;

const SelectField: SFC<Props> = ({ name, selected, metadata, onChange, shownAsMultipleItems = false }) => {
    const collection: CollectionMetadata | null =
        metadata && metadata.dataSetMetadata && metadata.dataSetMetadata.collection
            ? metadata.dataSetMetadata.collection
            : null;

    const options: OptionProps[] = (collection
        ? collection.properties.items
              .map(property => ({
                  key: property.name,
                  value: (property.isInverse ? '⬅︎ ' : '') + property.shortenedUri
              }))
              .sort((a, b) => (a.value < b.value ? -1 : 1))
        : []
    ).concat([
        { key: 'title', value: '«The title of this entity»' },
        { key: 'image', value: '«The image of this entity»' },
        { key: 'description', value: '«The description of this entity»' },
        { key: 'uri', value: '«The uri of this entity»' }
    ]);

    const onChangeHandler = (option: OptionProps) => {
        const property = collection ? collection.properties.items.find(field => field.name === option.key) : null;

        if ((option.key === 'uri' || property) && onChange) {
            onChange(option.key, property || 'uri');
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
    branch((props: Props) => props.metadata.loading, renderNothing),
    verifyResponse<Props, 'metadata'>('metadata', 'dataSetMetadata')
)(SelectField);
