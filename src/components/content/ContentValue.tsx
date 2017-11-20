import React from 'react';
import styled from '../../styled-components';

import { Content } from '../layout/StyledCopy';

const ContentWrapper = styled(Content)`
    margin: 0 0 1rem 0;
`;

const ContentValue = (props: {value: string | undefined}) => {
    if (!props.value) {
        return null;
    }

    return (
        <ContentWrapper>
            {props.value}
        </ContentWrapper>  
    );
};

export default ContentValue;