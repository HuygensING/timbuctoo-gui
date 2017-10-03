import * as React from 'react';
import styled, { css } from '../../styled-components';

import { ButtonProps, ButtonType, ElementProps } from '../../typings/layout';
import { Link } from './StyledCopy';
import { SFC } from 'react';
import { BUTTON_TYPES } from '../../constants/global';

const BaseButtonStyling = css`
    display: inline-block;
    font: ${props => props.theme.fonts.body};
    margin-top: 0.5rem;
    border: 1px solid ${props => props.theme.colors.shade.medium};
    text-align: center;
    padding: 0.5rem 1rem;
    border-radius: .25rem;
    cursor: pointer;
    
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

const setColor = (props: ElementProps, type: ButtonType) =>
    type === BUTTON_TYPES.inverted ? props.theme.colors.black : props.theme.colors.white;

const setBackgroundColor = (props: ElementProps, type: ButtonType) => {
    switch (type) {
        case BUTTON_TYPES.normal: return props.theme.colors.shade.medium;
        case BUTTON_TYPES.dark: return props.theme.colors.black;
        case BUTTON_TYPES.inverted:
        default: return props.theme.colors.white;
    }
};

const Button: SFC<ButtonProps> = ({type = BUTTON_TYPES.normal, small, to, children}) => {

    const ButtonLink = styled(Link)`
        ${BaseButtonStyling};
        color: ${props => setColor(props, type)};
        background-color: ${props => setBackgroundColor(props, type)};
        ${small ? SmallButtonStyling : ''};
    `;

    return (
        <ButtonLink to={to}>
            {children}
        </ButtonLink>
    );
};

export { BaseButtonStyling, setColor, setBackgroundColor };
export default Button;