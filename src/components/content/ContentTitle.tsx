import React from 'react';

import { Heading } from '../layout/StyledCopy';

const ContentValue = (props: {children?: any}) => {
    if (!props.children || props.children.length === 0) {
        return null;
    }
    return (
        <Heading align={'center'}>{props.children}</Heading>  
    );
};

export default ContentValue;