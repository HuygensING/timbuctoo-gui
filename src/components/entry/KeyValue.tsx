import React from 'react';

import { Subtitle, Content } from '../layout/StyledCopy';

const KeyValue = (props) => {
    const { label, value } = props;

    return (
        <div>
            <Subtitle>{label}</Subtitle>
            <Content>{value}</Content>
        </div>      
    );
};

export default KeyValue;