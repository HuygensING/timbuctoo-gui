import { ValueItem } from '../../../typings/index';
import React, { PureComponent } from 'react';
import ConnectedSelect from './ConnectedSelect';
import { ComponentValueField } from '../../../typings/schema';
import { OptionProps } from './Select';

type Props = {
    valueItem: ValueItem,
    collection?: string,
    onSelectChangeHandler: (option: OptionProps, settings: any, fieldName: string, childIndex: number) => void
};

class KeyValue extends PureComponent<Props> {
    componentWillMount () {
        const { valueItem, collection } = this.props;

        // If fields does exist but is empty, add a default field with current collection as reference
        if (valueItem.value.fields && valueItem.value.fields.length === 0) {
            valueItem.value.fields.push({
                value: '',
                reference: collection
            });
        }
    }

    render () {
        const { valueItem } = this.props;
        if (!valueItem.value.fields) {
            return null;
        }

        return (
            <span>
                {valueItem.value.fields.map(({ value, reference }: ComponentValueField, childIdx: number) => (
                        <ConnectedSelect
                            key={childIdx}
                            name={'select'}
                            selected={{ key: value, value: value }}
                            collectionId={reference}
                            onChange={({ option, settings }) => this.props.onSelectChangeHandler(option, settings, valueItem.name, childIdx)}
                        />
                    )
                )}
            </span>
        );
    }
}

export default KeyValue;
