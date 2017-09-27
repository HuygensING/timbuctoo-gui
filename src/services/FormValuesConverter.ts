import { COMPONENT_FIELDS } from '../constants/global';
import { FIELD_TITLES } from '../constants/forms';
import { Field, Fieldset } from '../typings/Forms';

const formValuesConverter = (items: any[]): Fieldset[] => {
    const fieldsets: Fieldset[] = [];

    items.forEach((item: any, idx: number) => {
        const fields: Field[] = fieldValuesConverter(item, idx);
        fieldsets.push({fields, type: item.__typename});
    });

    return fieldsets;
};

const fieldValuesConverter = (item: any, idx: number): Field[] => {
    const firstField: Field = {
        name: renderName(item.__typename, idx),
        value: item.__typename,
        title: 'field'
    };

    const fields: Field[] = [firstField];

    // If keys are available in the item, add them to the initialValues and create a field for it
    Object.keys(COMPONENT_FIELDS).forEach(key => {
        if (item[key]) {
            const name: string = renderName(item.__typename, idx, key);
            const newField: Field = {
                name,
                title: FIELD_TITLES[key],
                value: item[key]
            };
            fields.push(newField);
        }
    });

    return fields;
};

const renderName = (typename: string, idx: number, field?: string, ): string => (
    `${idx}_${typename}${field ? '_' + field : ''}`
);

export default formValuesConverter;