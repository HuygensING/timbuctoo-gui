import React from 'react';
import styled from '../../styled-components';
import theme from '../../theme';

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

function splitLabel(label: string | undefined): [string | undefined, string] {
    if (label === undefined) {
        return [undefined, ''];
    }
    let i = label.length;
    while (i > 0) {
        i--;
        if (label[i] === ':' || label[i] === '#' || label[i] === '?' || label[i] === '/') {
            return [label.substring(0, i + 1), label.substr(i + 1)];
        }
    }
    return [undefined, label];
}

const Key = Content.withComponent('h2').extend`
    display: inline-block;
    width: 30%;
    margin: 0;
    vertical-align: top;
    display: inline-block;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    direction: rtl;
    text-align: right;

    @media (max-width: ${BREAKPOINT.MOBILE}) {
        width: 100%;
    }
`;

const Values = styled.div`
    display: inline-block;
    width: 70%;
    padding-left: 1rem;
    vertical-align: top;

    @media (max-width: ${BREAKPOINT.MOBILE}) {
        width: 100%;
        padding-left: 0;
    }
`;

const Prefix = styled.span`
    color: ${theme.colors.shade.medium};
`;
const Suffix = styled.span`
    font-weight: 20%;
`;

const ContentKeyValue = (props: Props) => {
    const { label, children } = props;
    const [prefix, suffix] = splitLabel(label);
    return (
        <KeyValueWrapper>
            <Key>
                <span title={label}>
                    : <Prefix>{prefix}</Prefix>
                    <Suffix>{suffix}</Suffix>
                </span>
            </Key>
            <Values>{children}</Values>
        </KeyValueWrapper>
    );
};

export default ContentKeyValue;
