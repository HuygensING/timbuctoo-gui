import React from 'react';
import styled from '../styled-components';
import theme from '../theme';

export function splitLabel(label: string | undefined): [string | undefined, string] {
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

const Prefix = styled.span`
    color: ${theme.colors.shade.medium};
`;
const Suffix = styled.span`
    font-weight: 20%;
`;

export function PredicateLabel(props: { predicate: string | undefined }) {
    const [prefix, suffix] = splitLabel(props.predicate);

    return (
        <span title={props.predicate}>
            :<Prefix>{prefix}</Prefix>
            <Suffix>{suffix}</Suffix>
        </span>
    );
}
