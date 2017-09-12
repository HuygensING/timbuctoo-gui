// import { NameTypes, TimNames } from '../typings/timApi';

const TYPES = {
    surname: 'SURNAME',
    forename: 'FORENAME',
    role_name: 'ROLE_NAME',
    add_name: 'ADD_NAME',
    name_link: 'NAME_LINK',
    gen_name: 'GEN_NAME',
};

type NameTypes = typeof TYPES.surname | typeof TYPES.forename | typeof TYPES.role_name | typeof TYPES.add_name | typeof TYPES.name_link | typeof TYPES.gen_name;

interface TimNames {
    items: NameProps[];
}

interface NameProps {
    type?: string;
    value: string;
}

interface NameObjectProps {
    type: NameTypes;
    value: string;
}

interface Name {
    firstName?: string;
    middleName?: string;
    lastName?: string;
}

const TimbuctooNamesParser = {

    _MapNames( names: NameObjectProps[] ) {
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

    getFullNames( items: NameProps[], limit?: Number ): void | Name[] {
        if (!items) { return; }

        limit = limit || items.length;
        let names = new Array();
        let name = {};
        for (let i = 0; i < limit; i++) {
            name = this._MapNames( JSON.parse(items[i].value).components );
            names.push(name);
        }

        return names;
    },
    
    getFullName( {items}: TimNames ): void | Name {
        const fullNames = this.getFullNames( items, 1 );
        return fullNames && fullNames[0];
    }
    
};

export default TimbuctooNamesParser;