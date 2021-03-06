import { Permissions } from './permissions';
import { ComponentConfig, FacetConfig, FacetConfigType } from './schema';
import { ComponentClass, SFC } from 'react';
import { MutationFunc, QueryProps } from 'react-apollo';
import { ReferencePath } from '../services/propertyPath';

export interface KeyValueObject {
    [name: string]: string;
}

// base type of NormalizedComponentConfig & NormalizedFacetConfig
export interface NormalizedItem {
    id: number;
}

export type NormalizedComponentConfig = NormalizedItem &
    ComponentConfig & {
        childIds: number[];
        name: string;
        referencePath?: ReferencePath;
        __typename?: string;
    };

export type NormalizedFacetConfig = NormalizedItem &
    FacetConfig & {
        type: FacetConfigType;
        referencePaths: ReferencePath[];
    };

export type ConfigurableItem = NormalizedComponentConfig | NormalizedFacetConfig;

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

// variation of react-apollo's ChildProps, with the props not marked as optional
export type ChildProps<P, R> = P & {
    data: QueryProps & Partial<R>;
    mutate?: MutationFunc<R>;
};

export interface IconProps {
    color?: string;
}

export interface MenuItemProp {
    path: string;
    name: string;
    icon: SFC<IconProps> | ComponentClass<IconProps>;
}
