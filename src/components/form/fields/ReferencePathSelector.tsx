import React, { SFC } from 'react';
import { Property } from '../../../typings/schema';
import ConnectedSelect from './ConnectedSelect';
import styled, { withProps } from '../../../styled-components';
import { ITEMS, VALUE, URI } from '../../../constants/global';
import { ReferencePath } from '../../../services/propertyPath';

interface Props {
    onChange: (newPath: ReferencePath) => void;
    path: ReferencePath;
}

const SelectContainer = styled.div`
    &:not(:first-child) {
        padding-top: 1rem;
        margin-top: 0.5rem;
        border-top: 1px solid ${props => props.theme.colors.shade.light};
    }
`;

const Value = withProps<{ shownAsMultipleItems: boolean }>(styled.div)`
    display: inline-block;
    padding: .5rem 1rem .5rem 1rem;
    text-align: center;
    border: 1px solid ${props => props.theme.colors.primary.medium};
    color: ${props => props.theme.colors.primary.medium};
    margin: 0 10px 10px 0;
    border-radius: .25rem;
    ${props =>
        props.shownAsMultipleItems
            ? ` position: relative;
        top: -2px;
        box-shadow: 1px 1px 0 1px ${props.theme.colors.white}, 
                       2px 2px 0 1px ${props.theme.colors.primary.medium}, 
                       4px 4px 0 1px ${props.theme.colors.white}, 
                       5px 5px 0 1px ${props.theme.colors.primary.medium};`
            : ''}
`;

const ReferencePathSelector: SFC<Props> = ({ path, onChange }) => {
    if (!path) {
        return null;
    }

    const onChangeHandler = (
        val: string | null,
        prop: Property | 'title' | 'image' | 'description' | 'uri',
        childIdx: number
    ) => {
        if (prop === 'title' || prop === 'image' || prop === 'description' || prop === 'uri') {
            const newPath = path.slice(0, childIdx + 1);

            // update the previous selected value
            newPath[childIdx][1] = prop;
            if (prop !== 'uri') {
                newPath.push(['Value', VALUE]);
            }
            onChange(newPath);
        } else {
            const { isList, isValueType, referencedCollections } = prop;
            const newPath = path.slice(0, childIdx + 1);

            // update the previous selected value
            newPath[childIdx][1] = val;

            // add 'items' in case of list
            if (isList) {
                newPath.push([ITEMS, ITEMS]);
            }

            // set new value
            const newSegment: [string, string | null] = isValueType
                ? ['Value', VALUE]
                : [referencedCollections.items[0], null]; // TODO: merge multiple types

            newPath.push(newSegment);

            onChange(newPath);
        }
    };

    return (
        <SelectContainer>
            {path.map(([collectionKey, value], childIdx: number) => {
                if (value === ITEMS) {
                    return null;
                }

                const isMultiple = path[childIdx - 1] && path[childIdx - 1][1] === ITEMS;

                if (value === VALUE) {
                    return (
                        <Value key={childIdx} shownAsMultipleItems={isMultiple}>
                            {value}
                        </Value>
                    );
                } else {
                    return (
                        <ConnectedSelect
                            key={childIdx}
                            shownAsMultipleItems={isMultiple}
                            selected={{ key: value, value: value }}
                            isFinal={value === URI}
                            name={`select`}
                            collectionIds={[collectionKey]}
                            onChange={(val, property) => onChangeHandler(val, property, childIdx)}
                        />
                    );
                }
            })}
        </SelectContainer>
    );
};

export default ReferencePathSelector;
