import React from 'react';
import styled from '../../styled-components';

import { Content } from '../layout/StyledCopy';

const ContentWrapper = styled(Content)`
    margin: 0 0 1rem 0;
`;

const ContentValue = (props) => {
    if (!props.children) {
        return null;
    }

    return (
        <ContentWrapper>
            {props.children}
        </ContentWrapper>  
    );
};

export default ContentValue;