import { merge, replace } from 'lodash';
import { ComponentValueField } from '../typings/schema';

// TODO: Should be refactored, this is old component stuff
const COMPONENT_FIELDS = [1];

const createValuesObject = (fields: ComponentValueField[]) => {
    const object = {};
    fields.reduce(
        (obj, { value }: ComponentValueField) => (
            value.length > 0
                ? obj[value] = {}
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
                merge(queryObject, obj);
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

const createQueryStringFromObject = (object: {}) => {
    const filterCharacters: RegExp = /[^":]+/g;
    const filterEmptyObject: RegExp = /({})/g;

    const str: string = JSON.stringify(object);

    if (!str) {
        return '';
    }

    const strMatch = str.match(filterCharacters);
    const query = strMatch ? strMatch.join(' ') : '';
    const queryString = replace(query, filterEmptyObject, '{ value }');

    return queryString.substring(1, queryString.length - 1);
};

const createQueryStringFromFormFields = (items) => {
    const queryObject = createObjectFromFormFields(items);

    return createQueryStringFromObject(queryObject);
};

export { createQueryStringFromFormFields, createQueryStringFromObject };