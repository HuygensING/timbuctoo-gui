import { Permissions } from './permissions';
import { Component, ComponentValue } from './schema';
import { SFC, ComponentClass } from 'react';

export interface KeyValueObject {
    [name: string]: string;
}

export interface ValueItem {
    value: ComponentValue;
    name: string;
}

export type ComponentInfo = {
    name: string;
    index: number
};

export type ComponentFormType = Component & {
    componentInfo: ComponentInfo
};

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

export interface IconProps {
    color?: string;
}

export interface MenuItemProp {
    path: string;
    name: string;
    icon: SFC<IconProps> | ComponentClass<IconProps>;
}
