import { Permissions } from './permissions';
import { Component } from './timbuctoo/schema';

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
        index: number
    };
}

export type ComponentFormType = Component & ComponentInfo;

export type valueField = {
    field: string;
};

export type valueFields = {
    fields: string[];
};

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