import React from 'react';
import styled from '../../styled-components';

import { COMPONENTS } from '../../constants/global';
import ComponentLoader from '../../services/ComponentLoader';
import { BREAKPOINT } from '../layout/Grid';
import { Content } from '../layout/StyledCopy';
import { Component } from '../../typings/schema';

interface Props {
    label: string;
    values: Array<Component>;
    data: any;
}

const ALLOWED_COMPONENT = [
    COMPONENTS.value,
    COMPONENTS.link,
    COMPONENTS.image,
    COMPONENTS.keyValue,
    COMPONENTS.divider
];

const KeyValueWrapper = styled.div`
    margin: 1rem 0;
    padding-bottom: 1rem;
`;

const Key = styled(Content)`
    display: inline-block;
    width: 20%;
    margin: 0;
    vertical-align: top;

    @media (max-width: ${BREAKPOINT.MOBILE}) {
        width: 100%;
    }
`;
    
const Values = styled.div`
    display: inline-block;
    width: 80%;
    padding-left: 1rem;
    vertical-align: top;
    
    @media (max-width: ${BREAKPOINT.MOBILE}) {
        width: 100%;
        padding-left: 0;
    }
`;

const ContentKeyValue = (props: Props) => {
    const { label, values, data } = props;

    const renderValues = () => {
        return values && values.map((component: Component, index: number) => {
            if (ALLOWED_COMPONENT.indexOf(component.type) < 0) { return null; }
            return <ComponentLoader key={index} component={component} data={data} />;
        });
    };

    return (
        <KeyValueWrapper>
            <Key tag="h2">{label}:</Key>
            <Values>{renderValues()}</Values>
        </KeyValueWrapper>      
    );
};

export default ContentKeyValue;