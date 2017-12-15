// filter out tim_names and set tim_names.items[0].value instead

import { Value, FormatterConfig } from '../typings/schema';

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
        if (obj.hasOwnProperty('value') && typeof obj.value === 'string') {
            return obj.value;
        }
    }

    return null;
};

export { getValue };
