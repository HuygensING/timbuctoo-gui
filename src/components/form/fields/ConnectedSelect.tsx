import React, { Component } from 'react';
import onClickOutside from 'react-onclickoutside';
import connectQuery from '../../../services/ConnectQuery';
import styled, { withProps } from '../../../styled-components';
import { StandardStyledFormElements } from '../FormElements';
import { DataSetMetadata } from '../../../typings/timbuctoo/schema';

export interface OptionProps {
    key: string;
    value: string;
}

export interface SelectProps {
    name: string;
    selected: OptionProps;
    options: OptionProps[];
    onChange: (e: any) => void;
}

interface ApolloProps {
    data: {
        __type: any;
        dataSetMetadata: DataSetMetadata;
    };
}

type FullProps = SelectProps & ApolloProps;

interface State {
    isOpen: boolean;
    selectedOption: OptionProps;
}

interface StyledOptionsProps {
    isOpen: boolean;
}

interface StyledOptionProps {
    selected: boolean;
}

const SelectHiddenFieldInput = styled.select`
    display: none;
    appearance: none;
	line-height: normal;
	position: relative;
	background-position: right 10px top 50%;
	background-repeat: no-repeat;
    ${StandardStyledFormElements};

    @media (max-width: 767px) {
        display: block;
    }
`;

const Arrow = styled.figure`
    position: absolute;
    display: block;
    top: 50%;
    right: .5rem;

    width: 0.8rem;
    height: 0.8rem;

    margin: auto;
    border-left: 0.4rem solid ${props => props.theme.colors.black};
    border-top: 0.4rem solid transparent;
    border-bottom: 0.4rem solid transparent;
    
    transform: translateY(-50%);
`;

const SelectWrapper = styled.div`
    position: relative;
    display: inline-block;
`;

const StyledSelect = styled.button`
    background: ${props => props.theme.colors.white};
    min-width: 10rem;
    border-radius: .25rem;
    padding: .5rem 2rem .5rem 1rem;
    width: 100%;
    font: ${props => props.theme.fonts.body};
    color: ${props => props.theme.colors.shade.dark};
    border: 1px solid ${props => props.theme.colors.shade.medium};
    
    &:focus {
        outline: none;
        border-color: ${props => props.theme.colors.primary.medium};
    }
    
    @media (max-width: 767px) {
        display: none;
    }
`;

const StyledOptions = withProps<StyledOptionsProps>(styled.ul)`
    position: absolute;
    overflow: hidden;
    opacity: ${props => props.isOpen ? '1' : '0'};
    visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
    top: 0;
    left: 0;
    width: 100%;
    height: ${props => props.isOpen ? 'auto' : '0px'};
    box-shadow: 0 0 10px 4px rgba(0, 0, 0, 0.1);
    border-radius: .25rem;
    background: ${props => props.theme.colors.white};
    z-index: 2;
`;

const StyledOption = withProps<StyledOptionProps>(styled.button)`
    display: block;
    width: 100%;
    padding: 0.5rem 1rem;
    outline: none;
    font: ${props => props.theme.fonts.body};
    background: ${props => props.selected ? props.theme.colors.shade.light : props.theme.colors.white};
    transition: background 0.15s ease-in-out;

    &:hover {
        background: ${props => props.theme.colors.shade.light};
    }
`;

class SelectField extends Component<FullProps, State> {

    input: JSX.Element;

    defaults: {
        selectedOption: {
            value: '',
            key: ''
        }
    };

    constructor(props: FullProps) {
        super(props);

        this.state = {
            isOpen: false,
            selectedOption: props.selected || this.defaults.selectedOption
        };

        this.renderStyledOptionField = this.renderStyledOptionField.bind(this);
        this.onSelectClick = this.onSelectClick.bind(this);
        this.onOptionClick = this.onOptionClick.bind(this);
    }
    
    handleClickOutside() {
        this.setState({
            isOpen: false
        });
    }
    
    renderOptionField({key, value}: OptionProps, idx: number): JSX.Element {
        return (
            <option key={`${key}-${idx}`} value={value}>{key}</option>
        );
    }

    renderStyledOptionField(option: OptionProps, idx: number): JSX.Element {
        const { key } = option;
        return (
            <StyledOption selected={option === this.state.selectedOption} onClick={(e: any) => this.onOptionClick(e, option)} key={`${key}-${idx}`}>{key}</StyledOption>
        );
    }

    onSelectClick(e: any) {
        e.preventDefault();
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    onOptionClick(e: any, option: OptionProps) {
        e.preventDefault();

        // TODO: Try to update the actual select options so we trigger the default onChange handler
        this.props.onChange(option.value);

        this.setState({
            isOpen: false,
            selectedOption: option
        });
    }

    render() {
        const { name, data } = this.props;
        const { isOpen, selectedOption } = this.state;

        const { dataSetMetadata } = data;
        const options: OptionProps[] = [];
        
        if (dataSetMetadata && dataSetMetadata.collections) {
            const collection = dataSetMetadata.collections.items[0];
            collection.properties.items.forEach((field) => {
                const referenceType = field.referenceTypes && field.referenceTypes.items[0];
                const valueType = field.valueTypes && field.valueTypes.items[0];
                if (referenceType) {
                    console.log( 'referenceType', referenceType );
                }
                
                if (valueType) {
                    console.log( 'valueType', valueType );
                }
                options.push({
                    key: field.name || '',
                    value: field.name || ''
                });
            });
        }

        if (!options || options.length === 0) {
            return null;
        }

        return (
            <SelectWrapper>
                <SelectHiddenFieldInput name={name} defaultValue={selectedOption.value}>
                    {options && options.map(this.renderOptionField)}
                </SelectHiddenFieldInput>
                
                <StyledSelect onClick={this.onSelectClick}>
                    {selectedOption.key || name} <Arrow />
                </StyledSelect>
                <StyledOptions isOpen={isOpen}>
                    {options && options.map(this.renderStyledOptionField)}
                </StyledOptions>
            </SelectWrapper>
        );
    }
}

import { gql } from 'react-apollo';
const SELECT_QUERY = ({ typeName, dataSetId, collectionId }) => {
    console.log( 'SELECT_QUERY', typeName, dataSetId, collectionId );
    const query = `
        query SELECT_QUERY {
            dataSetMetadata(dataSetId:"${dataSetId}") {
                collections {
                    items {
                        properties {
                            items {
                                name
                                referenceTypes { items }
                                valueTypes { items }
                            }
                        }
                    }
                }
            }
        }
    `;

    return gql`${query}`;
};

export default connectQuery(SELECT_QUERY)(onClickOutside(SelectField));