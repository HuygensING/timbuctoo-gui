const TYPES = {
    surname: 'SURNAME',
    forename: 'FORENAME',
    role_name: 'ROLE_NAME',
    add_name: 'ADD_NAME',
    name_link: 'NAME_LINK',
    gen_name: 'GEN_NAME',
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

const TimbuctooNamesParser = {

    _MapNames( names: NameObjectProps[] ): Name {
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
    },

    parseName (value: string): Name {
        const components = JSON.parse(value).components;
        return this._MapNames(components);
    },

    getFullNames( items: TypeValue[] ): Name[] {
        if (!items) { return []; }

        const names: Name[] = [];

        items.forEach(item => {
            names.push(
                this.parseName(item.value)
            );
        });

        return names;
    },
    
    getFullName( {items}: {items: TypeValue[]} ): Name {
        return this.parseName(items[0].value);
    },

    getFullNameString(obj: {items: TypeValue[]}): string {
        const {firstName, middleName, lastName} = this.getFullName(obj);
        return `${firstName ? firstName : ''} ${middleName ? middleName : ''} ${lastName ? lastName : ''}`;
    }
};

export default TimbuctooNamesParser;