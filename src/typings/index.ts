import { Permissions } from './permissions';

export interface KeyValueObject {
    [name: string]: string;
}

export interface Action {
    type: string,
    payload: {
        [name: string]: any
    },
    error: any
}

export interface DataSetProps {
    datasetId: string;
    title: string;
    description: string;
    imageUrl?: string;
    owner?: any
    contact?: any
    provenanceInfo?: any
    contributors?: any[];
    licence?: any[];
    roles?: Permissions[];
    collections?: any[];
}