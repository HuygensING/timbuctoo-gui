import React from 'react';

import { Heading } from '../layout/StyledCopy';

const ContentValue = (props) => {
    return (
        <Heading>{props.children}</Heading>  
    );
};

export default ContentValue;