import { Permissions } from './permissions';
import { ComponentValue } from './schema';
import { ComponentClass, SFC } from 'react';
import { NormalizedComponent } from '../reducers/viewconfig';

export interface KeyValueObject {
    [name: string]: string;
}

export interface ValueItem {
    value: ComponentValue;
    name: string;
}

export type ComponentFormType = NormalizedComponent & {
    name: string;
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
