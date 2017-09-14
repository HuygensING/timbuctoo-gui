import React, { SFC } from 'react';
import styled, { withProps } from '../../../styled-components';
import { BaseFieldProps, Field } from 'redux-form';
import { StandardStyledFormElements } from '../FormElements';

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

const SelectField: SFC<SelectProps> = ({ name, options }): JSX.Element => {
    const renderOptionField = ({key, value}, idx): JSX.Element => (
        <option value={value}>{key}</option>
    );

    return (
        <SelectFieldInput component={'select'} name={name}>
            {options.map(renderOptionField)}
        </SelectFieldInput>
    );
};

export default SelectField;