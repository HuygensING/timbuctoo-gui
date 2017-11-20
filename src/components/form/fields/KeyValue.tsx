import React, { SFC } from 'react';
import ConnectedSelect from './ConnectedSelect';
import { ComponentValueField } from '../../../typings/schema';
import { OptionProps } from './Select';
import { ValueItem } from '../../../typings/index';

interface Props {
    valueItem: ValueItem;
    collection?: string;
    onSelectChangeHandler: (option: OptionProps, settings: any, fieldName: string, childIndex: number) => void;
}

const KeyValue: SFC<Props> = ({ valueItem: { value, name }, collection, onSelectChangeHandler }) => {

    if (!value.fields) {
        return null;
    }

    const fields = value.fields.length === 0 && !!collection
        ? [{ value: '', reference: collection }]
        : value.fields;

    return (
        <span>
            {fields.map((field: ComponentValueField, childIdx: number) => (
                    <ConnectedSelect
                        key={childIdx}
                        name={'select'}
                        selected={{ key: field.value, value: field.value }}
                        collectionId={field.reference}
                        onChange={({ option, settings }) => (
                            onSelectChangeHandler(option, settings, name, childIdx)
                        )}
                    />
                )
            )}
        </span>
    );
};

export default KeyValue;
