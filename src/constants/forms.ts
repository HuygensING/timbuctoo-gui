import { COMPONENTS } from './global';
import { ComponentType, FacetConfigType } from '../typings/schema';

export const SELECT_COMPONENT_TYPES: { key: ComponentType; value: string }[] = [
    {
        value: 'Title',
        key: COMPONENTS.title
    },
    {
        value: 'Path',
        key: COMPONENTS.path
    },
    {
        value: 'Literal',
        key: COMPONENTS.literal
    },
    {
        value: 'Image',
        key: COMPONENTS.image
    },
    {
        value: 'Link',
        key: COMPONENTS.link
    },
    {
        value: 'Link inside this dataset',
        key: COMPONENTS.internalLink
    },
    {
        value: 'Key-Value',
        key: COMPONENTS.keyValue
    },
    {
        value: 'Divider',
        key: COMPONENTS.divider
    }
];

export const FACET_TYPE = {
    multiSelect: 'MultiSelect' as FacetConfigType,
    dateRange: 'DateRange' as FacetConfigType,
    hierarchical: 'Hierarchical' as FacetConfigType
};

export const SELECT_FACET_TYPES: { key: string; value: FacetConfigType }[] = [
    {
        key: 'Multi-select',
        value: FACET_TYPE.multiSelect
    },
    {
        key: 'Date range',
        value: FACET_TYPE.dateRange
    },
    {
        key: 'Hierarchical',
        value: FACET_TYPE.hierarchical
    }
];
