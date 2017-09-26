import React, { Component } from 'react';
import styled, { withProps } from '../../../styled-components';
import { BaseFieldProps, Field } from 'redux-form';
import { StandardStyledFormElements } from '../FormElements';
import onClickOutside from 'react-onclickoutside';

export interface OptionProps {
    key: string;
    value: string;
}

export interface SelectProps {
    name: string;
    options: OptionProps[];
    onChange: (form: Form) => void;
}

interface Form {
    [name: string]: string;
}

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

const SelectHiddenFieldInput = withProps<BaseFieldProps>(styled(Field))`
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
    right: 1rem;

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
`;

const StyledSelect = styled.button`
    position: relative;
    ${StandardStyledFormElements};
    
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

class SelectField extends Component<SelectProps, State> {

    input: JSX.Element;

    constructor(props: SelectProps) {
        super(props);
        this.state = {
            isOpen: false,
            selectedOption: {
                value: '',
                key: ''
            }
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
        
        // // TODO: Try to update the actual select options so we trigger the default onChange handler
        // this.props.onChange({
        //     [this.props.name]: option.value
        // });

        this.setState({
            isOpen: false,
            selectedOption: option
        });
    }

    render() {
        const { name, options } = this.props;
        const { isOpen } = this.state;

        return (
            <SelectWrapper>
                <SelectHiddenFieldInput component={'select'} name={name} value={this.state.selectedOption.value}>
                    {options.map(this.renderOptionField)}
                </SelectHiddenFieldInput>
                
                <StyledSelect onClick={this.onSelectClick}>
                    {this.state.selectedOption.key || name} <Arrow />
                </StyledSelect>
                <StyledOptions isOpen={isOpen}>
                    {options.map(this.renderStyledOptionField)}
                </StyledOptions>
            </SelectWrapper>
        );
    }
}

export default onClickOutside(SelectField);