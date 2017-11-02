import React from 'react';
import styled, { withProps } from '../../styled-components';

import { Link } from '../layout/StyledCopy';
import { LinkProps } from 'react-router-dom';

const StyledLink = withProps<LinkProps>(styled(Link))`
    display: block;
    text-decoration: underline;
`;

const ContentLink = ({ to, children }) => {
    if (!to || !children) { return null; }

    return (
        <StyledLink to={to}>{children}</StyledLink>
    );
};

export default ContentLink;