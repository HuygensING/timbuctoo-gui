import { Permissions } from './permissions';
import { Component, ComponentValue } from './timbuctoo/schema';

export interface KeyValueObject {
    [name: string]: string;
}

export interface Action {
    type: string;
    payload: {
        [name: string]: any;
    };
    error: any;
}

export interface ComponentInfo {
    componentInfo: {
        name: string;
        value: ComponentValue,
        index: number
    };
}

export type ComponentType = Component & { __typename: string };
export type ComponentFormType = Component & { __typename: string } & ComponentInfo;

export interface DataSetProps {
    dataSetId: string;
    title: string;
    description: string;
    imageUrl?: string;
    owner?: any;
    contact?: any;
    provenanceInfo?: any;
    contributors?: any[];
    licence?: any[];
    roles?: Permissions[];
    collections?: any[];
}