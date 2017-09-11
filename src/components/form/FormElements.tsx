import React from 'react';
import styled, { withProps, css } from '../../styled-components';
import { BaseFieldProps, Field } from 'redux-form';
import { ButtonStyling } from '../layout/Button';
import { SFC } from 'react';

const StandardStyledFormElements = css`
    background: #fff;
    border-radius: .25rem;
    padding: .5rem 1rem;
    width: 100%;
    font: ${p => p.theme.fonts.body};
    color: ${p => p.theme.colors.shade.dark};
    border: 1px solid ${p => p.theme.colors.shade.medium};
    
    &:focus {
        outline: none;
        border-color: ${p => p.theme.colors.primary.medium};
    }
    
`;

const InputField = withProps<BaseFieldProps>(styled(Field))`
    ${StandardStyledFormElements}
`;

const SelectFieldInput = withProps<BaseFieldProps>(styled(Field))`
    appearance: none;
	line-height: normal;
	position: relative;
	background-position: right 10px top 50%;
	background-repeat: no-repeat;
    ${StandardStyledFormElements}
`;

interface SelectProps {
    name: string;
    options: {key: string, value: string}[];
}

const renderOptionField = ({key, value}, idx): JSX.Element => (<option value={value}>{key}</option>);

const SelectField: SFC<SelectProps> = ({ name, options }): JSX.Element => (
    <SelectFieldInput component={'select'} name={name}>
        {options.map(renderOptionField)}
    </SelectFieldInput>
);

const ResetButton = styled.button`
    font: ${p => p.theme.fonts.body};
    position: absolute;
    right: 0;
    padding: .5rem 1rem;
    z-index: 2;
`;

const SubmitButton = styled.button`
    ${ButtonStyling}
    width: 100%;
    text-align: center;
`;

export { InputField, SelectField, SubmitButton, ResetButton };