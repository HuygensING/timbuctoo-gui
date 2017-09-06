import * as React from 'react';
import styled from '../../styled-components';

import theme from '../../theme';

import { LinkProps } from '../../typings/layout';

import { Link } from './StyledCopy';

const ButtonLink = styled(Link)`
    display: inline-block;
    padding: 0.5rem 1rem;
    color: ${theme.colors.shade.light};
    background-color: ${theme.colors.primary.medium};
`;

const Button = (props: LinkProps) => {
    return (
        <ButtonLink to={props.to}>
            {props.children}
        </ButtonLink>
    );
};

export default Button;