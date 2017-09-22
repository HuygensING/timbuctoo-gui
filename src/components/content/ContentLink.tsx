import React from 'react';
import styled from '../../styled-components';

import { Link } from '../layout/StyledCopy';

const StyledLink = styled(Link)`
    display: block;
    text-decoration: underline;
`;

const ContentLink = (props) => {
    return (
        <StyledLink to={props.to}>{props.children}</StyledLink>  
    );
};

export default ContentLink;