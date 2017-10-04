import React, { Component } from 'react';
import { withRouter } from 'react-router';
import connectQuery from '../../../services/ConnectQuery';
import { DataSetMetadata } from '../../../typings/timbuctoo/schema';

import QUERY_COLLECTION_EDIT_VIEW from '../../../graphql/queries/CollectionEditView';

import Select, { OptionProps, SelectProps } from './Select';

interface ApolloProps {
    data: ApolloDataProps;
}

interface ApolloDataProps {
    dataSetMetadata: DataSetMetadata;
}

type FullProps = SelectProps & ApolloProps;

interface State {
    isOpen: boolean;
    selectedOption: OptionProps;
}

interface ReferenceTypesProps {
    [name: string]: string;
}

interface SelectDefaultsProps {
    selectedOption: OptionProps;
}

class SelectField extends Component<FullProps, State> {

    defaults: SelectDefaultsProps;
    referenceTypes: ReferenceTypesProps;

    constructor(props: FullProps) {
        super(props);

        this.defaults = {
            selectedOption: {
                value: '',
                key: ''
            }
        };
        this.referenceTypes = {};

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
                reference: this.referenceTypes[option.value]
            });
        }
    }

    private getOptionsFromQuery({ dataSetMetadata }: ApolloDataProps, options: OptionProps[] = []) {
        if (dataSetMetadata && dataSetMetadata.collection) {
            const collection = dataSetMetadata.collection;
            console.log( this.referenceTypes, this );
            collection.properties.items.forEach((field) => {
                const referenceType = field.referencedCollections && field.referencedCollections.items[0];
                // const valueType = field.valueTypes && field.valueTypes.items[0];
                // if (referenceType) {
                //     console.log( 'referenceType', referenceType );
                // }
                
                // if (valueType) {
                //     console.log( 'valueType', valueType );
                // }


                if (field.name && this.referenceTypes && referenceType) {
                    this.referenceTypes[field.name] = referenceType;
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

export default withRouter(connectQuery(QUERY_COLLECTION_EDIT_VIEW)(SelectField));