import { lighten } from 'polished/lib';
import styled, { css, withProps } from '../../styled-components';
import { ButtonProps, ButtonVariant, ElementProps } from '../../typings/layout';
import { BUTTON_TYPES } from '../../constants/global';
import { LinkProps, Link } from 'react-router-dom';

export const setColor = (props: ElementProps, type?: ButtonVariant) => {
    switch (type) {
        case BUTTON_TYPES.normal:
            return props.theme.colors.white;
        case BUTTON_TYPES.dark:
            return props.theme.colors.white;
        case BUTTON_TYPES.inverted:
        default:
            return props.theme.colors.black;
    }
};

export const setBackgroundColor = (props: ElementProps, type?: ButtonVariant) => {
    switch (type) {
        case BUTTON_TYPES.normal:
            return props.theme.colors.shade.medium;
        case BUTTON_TYPES.dark:
            return props.theme.colors.black;
        case BUTTON_TYPES.disabled:
            return lighten(0.1, props.theme.colors.shade.light);
        case BUTTON_TYPES.inverted:
        default:
            return props.theme.colors.white;
    }
};

const BaseButtonStyling = css`
    display: inline-block;
    font: ${props => props.theme.fonts.body};
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

export const ButtonLink = withProps<LinkProps & ButtonProps>(styled(Link))`
    ${BaseButtonStyling};
    color: ${props => setColor(props, props['data-variant'])};
    background-color: ${props => setBackgroundColor(props, props['data-variant'])};
    ${props => props['data-small'] ? SmallButtonStyling : ''};
    opacity: ${props => (props['data-variant'] === BUTTON_TYPES.disabled) ? 0.4 : 1 };
`;

export const Button = withProps<ButtonProps, HTMLButtonElement>(styled.button)`
    ${BaseButtonStyling};
    color: ${props => setColor(props, props['data-variant'])};
    background-color: ${props => setBackgroundColor(props, props['data-variant'])};
    ${props => props['data-small'] ? SmallButtonStyling : ''};
    opacity: ${props => (props['data-variant'] === BUTTON_TYPES.disabled) ? 0.4 : 1 };
`;
