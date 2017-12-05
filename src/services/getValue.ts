// filter out tim_names and set tim_names.items[0].value instead

import { PropertyList } from '../typings/schema';
import { getFullNameString } from './TimbuctooNamesParser';
import { Value, FormatterConfig } from '../typings/schema';

interface KeyValue {
    [name: string]: string | null;
}

function checkAllTypesAreHandler(formatterName: never) {
    console.error(formatterName + ' is not handled!');
}

function findFirst<T>(input: T[], filter: (item: T) => boolean): T | undefined {
    for (const item of input) {
        if (filter(item)) {
            return item;
        }
    }
    return undefined;
}

export function valueToString(value: Value, formatters: FormatterConfig): string {
    const formatter = findFirst(formatters, f => f.type === value.type);
    const formatterName = formatter ? formatter.name : 'STRING';

    switch (formatterName) {
        case 'PERSON_NAMES':
            try {
                return JSON.parse(value.value)
                    .components.map((x: { value: string }) => x.value)
                    .join(' ');
            } catch (e) {
                console.error(e);
            }
            return value.value;
        case 'STRING':
            return value.value;
        default:
            checkAllTypesAreHandler(formatterName);
            return value.value;
    }
}

const getValue = (obj: any): string | null => {
    if (obj) {
        // in case of usual values
        if (obj.hasOwnProperty('value') && typeof obj.value === 'string') {
            return obj.value;
        }

        // in case of names
        if (obj.hasOwnProperty('items') && obj.items.length > 0 && obj.items[0].hasOwnProperty('value')) {
            return getFullNameString(obj);
        }
    }

    return null;
};

const getValuesFromObject = (valueObj: any): KeyValue => {
    const obj: KeyValue = {};

    for (let key in valueObj) {
        if (valueObj.hasOwnProperty(key)) {
            const value = getValue(valueObj[key]);

            if (value) {
                obj[key] = value;
            }
        }
    }
    return obj;
};

const createQueryFromValue = (valueObj: any, properties: PropertyList) => {
    const value = getValue(valueObj);

    if (!value) {
        return '';
    }

    for (let i = 0, len = properties.items.length; i < len; i++) {
        if (properties.items[i].name === value) {
            return properties.items[i].isList ? `${value} { items { value } }` : `${value} { value }`;
        }
    }

    return '';
};

export { getValue, createQueryFromValue, getValuesFromObject };
