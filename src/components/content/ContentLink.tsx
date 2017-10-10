import React from 'react';
import styled from '../../styled-components';

import { Link } from '../layout/StyledCopy';

const StyledLink = styled(Link)`
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