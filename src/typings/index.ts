import { Permissions } from './permissions';
import {
    ComponentConfig, ComponentType, FacetConfig, FacetConfigType,
    ValueReference
} from './schema';
import { ComponentClass, SFC } from 'react';

export interface KeyValueObject {
    [name: string]: string;
}

// base type of NormalizedComponent & NormalizedFacetConfig
export interface NormalizedItem {
    type: FacetConfigType | ComponentType;
    id: number;
}

export type NormalizedComponent = NormalizedItem & ComponentConfig & {
    childIds: number[],
    name: string
    valueList?: ValueReference[]
};

export type NormalizedFacetConfig = NormalizedItem & FacetConfig;

export type ConfigurableItem = NormalizedComponent | NormalizedFacetConfig;

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
