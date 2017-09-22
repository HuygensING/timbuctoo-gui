import React from 'react';

import { Content } from '../layout/StyledCopy';

const ContentValue = (props) => {
    return (
        <Content>{props.children}</Content>  
    );
};

export default ContentValue;