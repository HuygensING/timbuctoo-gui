import React, { SFC } from 'react';
import HiddenField from './fields/HiddenField';
import styled from 'styled-components';
import { FacetOption } from '../../typings/schema';

const Amount = styled.span`
   float: right;
`;

interface Props {
    option: FacetOption;
}

const maxAmount: number = 100;

const MultiselectFormOption: SFC<Props> = ({ option }) => {

    const name = option.name.length > maxAmount
        ? `${option.name.substr(0, maxAmount)}...`
        : option.name;

    return (
        <li key={option.name}>
            <fieldset>
                <HiddenField
                    name={option.name}
                    id={option.name}
                    value={option.name}
                    type={'checkbox'}
                />
                <label htmlFor={option.name}>
                    {name}
                    <Amount>{option.count}</Amount>
                </label>
            </fieldset>
        </li>
    );
};

export default MultiselectFormOption;