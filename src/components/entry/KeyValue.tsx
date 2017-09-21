import React from 'react';

import ComponentLoader from '../../services/ComponentLoader';
import { Component } from '../../typings/timbuctoo/schema';
import { Subtitle } from '../layout/StyledCopy';
// import { Col } from '../layout/Grid';

const KeyValue = (props) => {
    const { label, values, data } = props;

    const renderValues = (values) => {
        return values && values.map( (component: Component, index: number) => <ComponentLoader key={index} component={component} data={data} />);
    };

    return (
        <div>
            
            <Subtitle>{label}</Subtitle>
            <div>
                Values:
                {renderValues(values)}
            </div>
        </div>      
    );
};

export default KeyValue;