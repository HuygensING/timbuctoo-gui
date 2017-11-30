import { lighten } from 'polished/lib';
import styled, { css, withProps } from '../../styled-components';
import { ButtonProps, ButtonVariant, ElementProps } from '../../typings/layout';
import { BUTTON_VARIANT } from '../../constants/global';
import { LinkProps, Link } from 'react-router-dom';

export const setColor = (props: ElementProps, type?: ButtonVariant) => {
    switch (type) {
        case BUTTON_VARIANT.normal:
            return props.theme.colors.white;
        case BUTTON_VARIANT.dark:
            return props.theme.colors.white;
        case BUTTON_VARIANT.inverted:
        default:
            return props.theme.colors.black;
    }
};

export const setBackgroundColor = (props: ElementProps, type?: ButtonVariant) => {
    switch (type) {
        case BUTTON_VARIANT.normal:
            return props.theme.colors.shade.medium;
        case BUTTON_VARIANT.dark:
            return props.theme.colors.black;
        case BUTTON_VARIANT.disabled:
            return lighten(0.1, props.theme.colors.shade.light);
        case BUTTON_VARIANT.inverted:
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
    border-radius: 0.25rem;
    cursor: pointer;

    &:hover {
        color: ${props => props.theme.colors.white};
        border: 1px solid ${props => props.theme.colors.shade.dark};
        background-color: ${props => props.theme.colors.shade.dark};
    }
`;

const SmallButtonStyling = css`
    padding: 0 0.5rem;
    border-radius: 0.15rem;
`;

export const ButtonAdd = withProps<ButtonProps, HTMLButtonElement>(styled.button)`
    cursor: pointer;
    text-align: right;
    float: right;
    padding-right: .25rem;
    font: ${props => props.theme.fonts.body};
    
    &:after {
        content: '+';
        position: relative;
        left: .25rem;
        top: .15rem;
        transition: left .2s ease;
        font ${props => props.theme.fonts.title};
    }
    
    &:hover {
        color: ${props => props.theme.colors.primary.medium};
        
        &:after {
            left: .5rem;
        }
    }
    &:focus {
        outline: 0;
    }
`;

export const ButtonLink = withProps<LinkProps & ButtonProps>(styled(Link))`
    ${BaseButtonStyling};
    color: ${props => setColor(props, props['data-variant'])};
    background-color: ${props => setBackgroundColor(props, props['data-variant'])};
    ${props => (props['data-small'] ? SmallButtonStyling : '')};
    opacity: ${props => (props['data-variant'] === BUTTON_VARIANT.disabled ? 0.4 : 1)};
`;

export const Button = withProps<ButtonProps, HTMLButtonElement>(styled.button)`
    ${BaseButtonStyling};
    color: ${props => setColor(props, props['data-variant'])};
    background-color: ${props => setBackgroundColor(props, props['data-variant'])};
    ${props => (props['data-small'] ? SmallButtonStyling : '')};
    opacity: ${props => (props['data-variant'] === BUTTON_VARIANT.disabled ? 0.4 : 1)};
`;
