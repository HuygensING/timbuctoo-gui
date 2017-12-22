import React, { SFC } from 'react';
import styled, { css, withProps } from '../../styled-components';
import { EsValue } from '../../reducers/search';
import { Content } from '../layout/StyledCopy';

const checkMark = require('../../assets/icons/checkmark.svg');

const Amount = styled.span`
    float: right;
`;

interface Props {
    option: EsValue;
    onToggle: Function;
}

const checkBoxChecked = css`
    border-color: ${props => props.theme.colors.primary.medium};
    background-image: url(${checkMark});
    background-size: 0.75rem 0.75rem;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-color: ${props => props.theme.colors.primary.medium};
`;

const CheckBox = withProps<{ isSelected?: boolean }>(styled.figure)`
    content: '';
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    display: block;
    width: 1rem;
    height: 1rem;
    border: 1px  solid ${props => props.theme.colors.shade.medium};
    border-radius: .125rem;
    ${props => (props.isSelected ? checkBoxChecked : '')}
`;

const Fieldset = styled.fieldset`
    padding: 0.25rem 0 0.25rem 2rem;
    cursor: pointer;
    position: relative;
`;

const maxAmount: number = 100;

const MultiselectFormOption: SFC<Props> = ({ option, onToggle }) => {
    const name = option.name.length > maxAmount ? `${option.name.substr(0, maxAmount)}...` : option.name;

    return (
        <li key={option.name}>
            <Fieldset onClick={() => onToggle(option.name)}>
                <CheckBox isSelected={option.selected} />
                <Content>
                    {name}
                    <Amount>{option.count}</Amount>
                </Content>
            </Fieldset>
        </li>
    );
};

export default MultiselectFormOption;
