import * as React from 'react';
import styled, { css } from '../../styled-components';

import { ButtonProps } from '../../typings/layout';
import { Link } from './StyledCopy';

const BaseButtonStyling = css`
    display: inline-block;
    font: ${p => p.theme.fonts.body};
    margin-top: 0.5rem;
    border: 1px solid ${props => props.theme.colors.shade.medium};
    color: ${props => props.theme.colors.white};
    text-align: center;
    background-color: ${props => props.theme.colors.shade.medium};
    padding: 0.5rem 1rem;
    border-radius: .25rem;
    
    &:hover {
        color: ${props => props.theme.colors.white};
        border: 1px solid ${props => props.theme.colors.shade.dark};
        background-color: ${props => props.theme.colors.shade.dark};
    }
`;
    
const SmallButtonStyling = css`
    padding: 0 0.5rem;
    border-radius: .15rem;
`;

const Button = (props: ButtonProps) => {
    const ButtonLink = styled(Link)`
        ${BaseButtonStyling};
        ${props.small ? SmallButtonStyling : ''};
    `;

    return (
        <ButtonLink to={props.to}>
            {props.children}
        </ButtonLink>
    );
};

export { BaseButtonStyling };
export default Button;