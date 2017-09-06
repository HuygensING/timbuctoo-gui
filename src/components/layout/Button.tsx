import * as React from 'react';
import styled from '../../styled-components';

import { LinkProps } from '../../typings/layout';
import { Link } from './StyledCopy';

const ButtonLink = styled(Link)`
    display: inline-block;
    padding: 0.5rem 1rem;
    color: ${props => props.theme.colors.shade.light};
    background-color: ${props => props.theme.colors.primary.medium};
`;

const Button = (props: LinkProps) => {
    return (
        <ButtonLink to={props.to}>
            {props.children}
        </ButtonLink>
    );
};

export default Button;