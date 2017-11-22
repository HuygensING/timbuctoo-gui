import React, { SFC } from 'react';
import ConnectedSelect from './ConnectedSelect';
import { Property } from '../../../typings/schema';

interface Props {
    onChange: (newPaths: (string[])[]) => void;
    paths: (string[])[];
}

const VALUE: string = 'value';
const ITEMS: string = 'items';

const ReferencePathSelector: SFC<Props> = ({ paths, onChange }) => {

    const onChangeHandler = (val: string, { isList, isValueType, referencedCollections }: Property, childIdx: number) => {
        const newPaths = paths.slice(0, childIdx + 1);

        // update the previous selected value
        newPaths[childIdx][1] = val;

        // set new value
        newPaths.push([referencedCollections.items[0], isValueType ? VALUE : '']);

        // add 'items' in case of list
        if (isList) {
            newPaths.push(['', ITEMS]);
        }

        onChange(newPaths);
    };

    return (
        <div>
            {
                paths.map(([collectionKey, value], childIdx: number) => (
                    value === VALUE || value === ITEMS
                        ? `.${value}`
                        : (
                            <ConnectedSelect
                                key={childIdx}
                                selected={{ key: value, value: value }}
                                name={`select`}
                                collectionId={collectionKey}
                                onChange={(val, property) => onChangeHandler(val, property, childIdx)}
                            />
                        )
                ))
            }
        </div>
    );
};

export default ReferencePathSelector;