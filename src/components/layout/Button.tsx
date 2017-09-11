import * as React from 'react';
import styled, { css } from '../../styled-components';

import { LinkProps } from '../../typings/layout';
import { Link } from './StyledCopy';

const ButtonStyling = css`
    display: inline-block;
    padding: 0.5rem 1rem;
    border-radius: .25rem;
    font: ${p => p.theme.fonts.body};
    border: 1px solid ${props => props.theme.colors.primary.medium};
    color: ${props => props.theme.colors.shade.light};
    background-color: ${props => props.theme.colors.primary.medium};
`;

const ButtonLink = styled(Link)`
    ${ButtonStyling}
`;

const Button = (props: LinkProps) => {
    return (
        <ButtonLink to={props.to}>
            {props.children}
        </ButtonLink>
    );
};

export { ButtonStyling };
export default Button;