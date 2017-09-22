import React from 'react';
import styled from '../../styled-components';

import { COMPONENTS } from '../../constants/global';
import ComponentLoader from '../../services/ComponentLoader';
import { ComponentType } from '../../typings';
import { Subtitle } from '../layout/StyledCopy';

interface Props {
    label: string;
    values: Array<ComponentType>;
    data: any;
}

const ALLOWED_COMPONENT = [
    COMPONENTS.value,
    COMPONENTS.link
];

const KeyValueWrapper = styled.div`
    margin: 1rem 0;
    padding-bottom: 1rem;
    border-bottom: 1px solid ${props => props.theme.colors.shade.light};
`;

const Key = styled(Subtitle)`
    display: inline-block;
    width: 10%;
    min-width: 100px;
    margin: 0;
    vertical-align: top;
`;
    
const Values = styled.div`
    display: inline-block;
    width: 80%;
    padding-left: 1rem;
    vertical-align: top;
`;

const ContentKeyValue = (props: Props) => {
    const { label, values, data } = props;

    const renderValues = () => {
        return values && values.map( (component: ComponentType, index: number) => {
            if (ALLOWED_COMPONENT.indexOf( component.__typename ) < 0) { return null; }
            return <ComponentLoader key={index} component={component} data={data} />;
        });
    };

    return (
        <KeyValueWrapper>
            <Key>{label}</Key>
            <Values>{renderValues()}</Values>
        </KeyValueWrapper>      
    );
};

export default ContentKeyValue;