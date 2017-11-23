import React, { SFC } from 'react';
import { Property } from '../../../typings/schema';
import ConnectedSelect from './ConnectedSelect';
import styled, { withProps } from '../../../styled-components';

interface Props {
    onChange: (newPaths: (string[])[]) => void;
    paths: (string[])[];
}

const SelectContainer = styled.div`
    &:not(:first-child) {
      padding-top: 1rem;
      margin-top: .5rem;
      border-top: 1px solid ${props => props.theme.colors.shade.light};
    }
`;

const Value = withProps<{ shownAsMultipleItems: boolean; }>(styled.div)`
    display: inline-block;
    padding: .5rem 1rem .5rem 1rem;
    text-align: center;
    border: 1px solid ${props => props.theme.colors.primary.medium};
    color: ${props => props.theme.colors.primary.medium};
    margin: 0 10px 10px 0;
    border-radius: .25rem;
    ${props => props.shownAsMultipleItems
    ? ` position: relative;
        top: -2px;
        box-shadow: 1px 1px 0 1px ${props.theme.colors.white}, 
                       2px 2px 0 1px ${props.theme.colors.primary.medium}, 
                       4px 4px 0 1px ${props.theme.colors.white}, 
                       5px 5px 0 1px ${props.theme.colors.primary.medium};`
    : ''
    }
`;

const VALUE: string = 'value';
const ITEMS: string = 'items';

const ReferencePathSelector: SFC<Props> = ({ paths, onChange }) => {

    const onChangeHandler = (val: string, { isList, isValueType, referencedCollections }: Property, childIdx: number) => {
        const newPath = paths.slice(0, childIdx + 1);

        // update the previous selected value
        newPath[childIdx][1] = val;

        // add 'items' in case of list
        if (isList) {
            newPath.push([ITEMS.toUpperCase(), ITEMS]);
        }

        // set new value
        const newStep = isValueType
            ? [VALUE.toUpperCase(), VALUE]
            : [referencedCollections.items[0], ''];

        newPath.push(newStep);

        onChange(newPath);
    };

    return (
        <SelectContainer>
            {
                paths.map(([collectionKey, value], childIdx: number) => {
                    if (value === ITEMS) {
                        return null;
                    }

                    const isMultiple = paths[childIdx - 1] && paths[childIdx - 1][1] === ITEMS;

                    if (value === VALUE) {
                        return <Value shownAsMultipleItems={isMultiple}>{value}</Value>;
                    }

                    return (
                        <ConnectedSelect
                            key={childIdx}
                            shownAsMultipleItems={isMultiple}
                            selected={{ key: value, value: value }}
                            name={`select`}
                            collectionId={collectionKey}
                            onChange={(val, property) => onChangeHandler(val, property, childIdx)}
                        />
                    );
                })
            }
        </SelectContainer>
    );
};

export default ReferencePathSelector;