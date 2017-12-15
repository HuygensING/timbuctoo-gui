import React, { SFC } from 'react';
import { Property } from '../../../typings/schema';
import ConnectedSelect from './ConnectedSelect';
import styled, { withProps } from '../../../styled-components';
import { ITEMS, VALUE } from '../../../constants/global';
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
        { isList, isValueType, referencedCollections }: Property,
        childIdx: number
    ) => {
        const newPath = path.slice(0, childIdx + 1); // TODO: In case of union types, how do I know which ones to expect? <= created ticket for this

        // update the previous selected value
        newPath[childIdx][1] = val;

        // add 'items' in case of list
        if (isList) {
            newPath.push([ITEMS, ITEMS]);
        }

        // set new value
        const newSegment: [string, string | null] = isValueType
            ? ['Value', VALUE]
            : [referencedCollections.items[0], null];

        newPath.push(newSegment);

        onChange(newPath);
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
                }

                return (
                    <ConnectedSelect
                        key={childIdx}
                        shownAsMultipleItems={isMultiple}
                        selected={{ key: value, value: value }}
                        name={`select`}
                        collectionIds={[collectionKey]}
                        onChange={(val, property) => onChangeHandler(val, property, childIdx)}
                    />
                );
            })}
        </SelectContainer>
    );
};

export default ReferencePathSelector;
