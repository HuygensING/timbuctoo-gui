import React from 'react';
import styled from '../../styled-components';

import ComponentLoader from '../../services/ComponentLoader';
import { Component } from '../../typings/timbuctoo/schema';
import { Subtitle } from '../layout/StyledCopy';

const KeyValueWrapper = styled.div`
    margin: 1rem 0;
`;

const Key = styled(Subtitle)`
    display: inline-block;
    width: 25%;
    margin: 0;
    vertical-align: top;
`;
    
const Values = styled.div`
    display: inline-block;
    width: 75%;
    padding-left: 1rem;
    vertical-align: top;
`;

const KeyValue = (props) => {
    const { label, values, data } = props;

    const renderValues = (values) => {
        return values && values.map( (component: Component, index: number) => <ComponentLoader key={index} component={component} data={data} />);
    };

    return (
        <KeyValueWrapper>
            <Key>{label}</Key>
            <Values>{renderValues(values)}</Values>
        </KeyValueWrapper>      
    );
};

export default KeyValue;