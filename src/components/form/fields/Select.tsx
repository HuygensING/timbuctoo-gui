import React, { Component } from 'react';
import styled, { withProps } from '../../../styled-components';
import onClickOutside from 'react-onclickoutside';
import { StandardStyledFormElements } from './Input';

export interface OptionProps {
    key: string;
    value: string;
}

export interface SelectProps {
    name: string;
    selected: OptionProps;
    options?: OptionProps[];
    onChange: (e: any) => void;
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
    margin: 0 10px 10px 0;
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

class SelectField extends Component<SelectProps, State> {

    constructor (props: SelectProps) {
        super(props);

        this.state = {
            isOpen: false,
            selectedOption: props.selected
        };
    }
    
    handleClickOutside () {
        this.setState({
            isOpen: false
        });
    }

    render () {
        const { name, options, selected } = this.props;
        const { isOpen, selectedOption } = this.state;

        return (
            <SelectWrapper>
                <SelectHiddenFieldInput
                    onChange={this.onOptionChange}
                    name={name}
                    defaultValue={selected && selected.value || selectedOption && selectedOption.value}
                >
                    {options && options.map((option: OptionProps, idx: number) => (
                        <option
                            key={`${option.key}-${idx}`}
                            value={option.value}
                        >
                            {option.key}
                        </option>
                    ))}
                </SelectHiddenFieldInput>
                
                <StyledSelect onClick={this.onSelectClick}>
                    {selected && selected.value || selectedOption && selectedOption.key || name} <Arrow />
                </StyledSelect>

                <StyledOptions isOpen={isOpen}>
                    {options && options.map((option: OptionProps, idx: number) => (
                        <StyledOption
                            selected={option.value === selected.value}
                            onClick={(e: any) => this.onOptionClick(e, option)}
                            key={`${option.key}-${idx}`}
                        >
                            {option.key}
                        </StyledOption>
                    ))}
                </StyledOptions>
            </SelectWrapper>
        );
    }

    private onSelectClick = (e: any) => {
        e.preventDefault();
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    private onOptionClick (e: any, option: OptionProps) {
        e.preventDefault();
        this.setNewOption(option);
    }

    private onOptionChange = (e) => {
        e.preventDefault();

        const option = {
            key: e.target.value,
            value: e.target.value
        };

        this.setNewOption(option);
    }

    private setNewOption (option: OptionProps) {
        // TODO: Try to update the actual select options so we trigger the default onChange handler
        this.props.onChange(option);

        this.setState({
            isOpen: false,
            selectedOption: option
        });
    }
}

export default onClickOutside(SelectField);