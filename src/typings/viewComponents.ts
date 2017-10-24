import { ComponentType } from './schema';

export type ComponentTypes = {
    [key: string]: ComponentType
};

export interface ComponentFieldType {
    valueKey: string;
    urlKey: string;
    altKey: string;
    key: string;
    title: string;
}
