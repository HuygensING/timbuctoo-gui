import React, { Component } from 'react';
import { withRouter } from 'react-router';

import QUERY_COLLECTION_EDIT_VIEW from '../../../graphql/queries/CollectionEditView';

import Select, { OptionProps, SelectProps } from './Select';
import MetadataResolver, { ResolvedApolloProps } from '../../MetadataResolver';
import { DataSetMetadata } from '../../../typings/schema';

interface Props {
    collectionId?: string;
}

type FullProps = Props & SelectProps & ResolvedApolloProps<{ dataSetMetadata: DataSetMetadata }, any, any>;

interface State {
    isOpen: boolean;
    selectedOption: OptionProps;
}

interface OptionSettingProps {
    [name: string]: {
        reference?: string;
        isList?: boolean;
        isValue?: boolean;
    };
}

class SelectField extends Component<FullProps, State> {
    optionSettings: OptionSettingProps = {};

    render() {
        const { name, selected } = this.props;
        const options: OptionProps[] = this.getOptionsFromQuery(this.props);

        if (!options || options.length === 0) {
            return null;
        }

        return (
            <Select
                name={name}
                options={options}
                selected={selected}
                onChange={this.onChangeHandler}
            />
        );
    }

    private onChangeHandler = (option: OptionProps) => {
        const { onChange } = this.props;

        if (onChange) {
            onChange({
                option: option,
                settings: {
                    ...this.optionSettings[option.value]
                }
            });
        }
    }

    private getOptionsFromQuery = ({ metadata }: FullProps, options: OptionProps[] = []) => {
        if (metadata && metadata.dataSetMetadata && metadata.dataSetMetadata.collection) {
            const collection = metadata.dataSetMetadata.collection;
            collection.properties.items.forEach((field) => {
                // Now references only the first item.
                const reference = field.referencedCollections && field.referencedCollections.items[0];
                if (field.name) {
                    this.optionSettings[field.name] = {
                        reference,
                        isList: field.isList,
                        isValue: field.isValueType
                    };
                }

                options.push({
                    key: field.name || '',
                    value: field.name || ''
                });
            });
        }

        return options;
    }
}

export default withRouter<Props & SelectProps>(
    MetadataResolver<FullProps>(QUERY_COLLECTION_EDIT_VIEW)(SelectField)
);