// filter out tim_names and set tim_names.items[0].value instead

import TimbuctooNamesParser from './TimbuctooNamesParser';
import { PropertyList } from '../typings/timbuctoo/schema';

interface KeyValue {
    [name: string]: string | null;
}

const getValue = (obj: any): string | null => {
    if (obj) {
        // in case of usual values
        if (obj.hasOwnProperty('value') && typeof obj.value === 'string') {
            return obj.value;
        }

        // in case of names
        if (obj.hasOwnProperty('items') && obj.items.length > 0 && obj.items[0].hasOwnProperty('value')) {
            return TimbuctooNamesParser.getFullNameString(obj);
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

    if (!value) { return ''; }

    for (let i = 0, len = properties.items.length; i < len; i++) {
        if (properties.items[i].name === value) {
            return properties.items[i].isList
                ? `${value} { items { value } }`
                : `${value} { value }`;
        }
    }

    return '';
};

export { getValue, createQueryFromValue, getValuesFromObject };