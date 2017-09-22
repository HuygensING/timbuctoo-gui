import React from 'react';

import { Heading } from '../layout/StyledCopy';

const ContentValue = (props) => {
    return (
        <Heading align={'center'}>{props.children}</Heading>  
    );
};

export default ContentValue;