import React from 'react';
import styled from '../../styled-components';

import { BREAKPOINT } from '../layout/Grid';
import { Content } from '../layout/StyledCopy';
import { Entity } from '../../typings/schema';

interface Props {
    label: string | undefined;
    data: Entity;
    children?: any;
}

const KeyValueWrapper = styled.div`
    margin: 1rem 0;
    padding-bottom: 1rem;
`;

const Key = Content.withComponent('h2').extend`
    display: inline-block;
    width: 20%;
    margin: 0;
    vertical-align: top;
    text-overflow: ellipsis;
    overflow: hidden;

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
    const { label, children } = props;

    return (
        <KeyValueWrapper>
            <Key>
                <span title={label}>{label}</span>:
            </Key>
            <Values>{children}</Values>
        </KeyValueWrapper>
    );
};

export default ContentKeyValue;
