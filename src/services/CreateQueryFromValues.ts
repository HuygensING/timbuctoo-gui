import _ from 'lodash';
import { COMPONENT_FIELDS } from '../constants/global';

const createValuesObject = (fields: string[]) => {
    const object = {};
    fields.reduce(
        (obj, key: string) => (
            key.length > 0
                ? obj[key] = {}
                : {}
        ),
        object
    );
    return object;
};

const mutateQueryObject = (item, queryObject) => {
    // check every componentfield for values
    for (let key in COMPONENT_FIELDS) {
        if (COMPONENT_FIELDS.hasOwnProperty(key)) {
            const field = item[COMPONENT_FIELDS[key]];

            if (field && field.fields) {
                const obj = createValuesObject(item.value.fields);
                _.merge(queryObject, obj);
            }
        }
    }

    // check if item itself holds multiple items
    if (item.values) {
        item.values.forEach(value => mutateQueryObject(value, queryObject));
    }
};

const createObjectFromFormFields = (items) => {
    const queryObject = {};
    items.forEach(
        item => mutateQueryObject(item, queryObject)
    );
    return queryObject;
};

const createQueryStringFromFormFields = (items) => {
    const queryObject = createObjectFromFormFields(items);

    return createQueryStringFromObject(queryObject);
};

const createQueryStringFromObject = (object: {}) => {
    const filterCharacters: RegExp = /[^":]+/g;
    const filterEmptyObject: RegExp = /({})/g;

    const str: string = JSON.stringify(object);

    if (!str) {
        return '';
    }

    const strMatch = str.match(filterCharacters);
    const query = strMatch ? strMatch.join(' ') : '';
    const queryString = _.replace(query, filterEmptyObject, '{ value }');

    return queryString.substring(1, queryString.length - 1);
};

export { createQueryStringFromFormFields, createQueryStringFromObject };