import { Permissions } from './permissions';

export interface Action {
    type: string,
    payload: {
        [name: string]: any
    },
    error: any
}

export interface ContentProps {
    imageUrl?: string;
    caption?: string;
    description?: string;
    graphqlUrl?: string;
    promoted?: boolean;
    permissions?: Permissions[];
}