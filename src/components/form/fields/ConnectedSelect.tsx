import React, { Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { DataSetMetadata } from '../../../typings/schema';

import QUERY_COLLECTION_EDIT_VIEW from '../../../graphql/queries/CollectionEditView';

import Select, { OptionProps, SelectProps } from './Select';
import MetadataResolver from '../../MetadataResolver';

interface ApolloProps {
    data: ApolloDataProps;
}

interface ApolloDataProps {
    dataSetMetadata: DataSetMetadata;
}

interface Props {
    collectionId?: string;
}

type FullProps = Props & SelectProps & ApolloProps & RouteComponentProps<any>;

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

interface SelectDefaultsProps {
    selectedOption: OptionProps;
}

class SelectField extends Component<FullProps, State> {

    defaults: SelectDefaultsProps;
    optionSettings: OptionSettingProps;

    constructor(props: FullProps) {
        super(props);

        this.defaults = {
            selectedOption: {
                value: '',
                key: ''
            }
        };
        this.optionSettings = {};

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.getOptionsFromQuery = this.getOptionsFromQuery.bind(this);
    }

    render() {
        const { name, data, selected } = this.props;
        const options: OptionProps[] = this.getOptionsFromQuery(data);

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

    private onChangeHandler(option: OptionProps) {
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

    private getOptionsFromQuery(data: ApolloDataProps, options: OptionProps[] = []) {
        if (data && data.dataSetMetadata && data.dataSetMetadata.collection) {
            const collection = data.dataSetMetadata.collection;
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
