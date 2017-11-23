const TYPES = {
    surname: 'SURNAME',
    forename: 'FORENAME',
    role_name: 'ROLE_NAME',
    add_name: 'ADD_NAME',
    name_link: 'NAME_LINK',
    gen_name: 'GEN_NAME'
};

type NameTypes = 'SURNAME' | 'FORENAME' | 'ROLE_NAME' | 'ADD_NAME' | 'NAME_LINK' | 'GEN_NAME';

interface NameObjectProps {
    type: NameTypes;
    value: string;
}

interface TypeValue {
    type: string;
    value: string;
}

export interface Name {
    firstName: string | null;
    middleName: string | null;
    lastName: string | null;
}

const mapNames = (names: NameObjectProps[]): Name => {
    let name = {
        firstName: null,
        middleName: null,
        lastName: null
    };
    let currentName;
    for (let i = 0, limit = names.length; i < limit; i++) {
        currentName = names[i];
        switch (currentName.type) {
            case TYPES.forename:
                name.firstName = currentName.value;
                break;

            case TYPES.name_link:
                name.middleName = currentName.value;
                break;

            case TYPES.surname:
                name.lastName = currentName.value;
                break;

            default:
                break;
        }
    }
    return name;
};

export const parseName = (value: string): Name => {
    const components = JSON.parse(value).components;
    return mapNames(components);
};

export const getFullNames = (items: TypeValue[]): Name[] => {
    if (!items) {
        return [];
    }

    const names: Name[] = [];

    items.forEach(item => {
        names.push(parseName(item.value));
    });

    return names;
};

export const getFullName = ({ items }: { items: TypeValue[] }): Name => {
    return parseName(items[0].value);
};

export const getFullNameString = (obj: { items: TypeValue[] }): string => {
    const { firstName, middleName, lastName } = getFullName(obj);
    return `${firstName ? firstName : ''} ${middleName ? middleName : ''} ${lastName ? lastName : ''}`;
};
