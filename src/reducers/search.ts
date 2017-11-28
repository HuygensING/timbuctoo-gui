import { Facet, FacetConfig, FacetOption } from '../typings/schema';
import { Location } from 'history';
import * as queryString from 'querystring';

export interface FullTextSearch {
    dataset: Readonly<string>;
    collection: Readonly<string>;
    filter: Readonly<string>;
}

export type EsFilter = FacetConfig & { values: EsValue[] };
export type EsValue = FacetOption & { selected?: boolean };

export interface SearchReducer {
    fullText: Readonly<FullTextSearch>;
    filters: Readonly<EsFilter[]>;
    callRequested: Readonly<boolean>;
}

const initialState: SearchReducer = {
    fullText: {
        dataset: '',
        collection: '',
        filter: ''
    },
    filters: [],
    callRequested: false
};

// action interface
interface MergeFilterAction {
    type: 'ES_MERGE_FILTERS';
    payload: {
        filters: EsFilter[];
    };
}

interface ToggleFilterAction {
    type: 'ES_TOGGLE_FILTER';
    payload: {
        filters: EsFilter[];
    };
}

interface SubmitSearchAction {
    type: 'SUBMIT_SEARCH';
    payload: {
        type: keyof FullTextSearch;
        value: string;
    };
}

interface RequestCallAction {
    type: 'ES_REQUEST_CALL';
}

type Action = MergeFilterAction | ToggleFilterAction | SubmitSearchAction | RequestCallAction;

// Helpers
const mergeFacets = (configs: FacetConfig[], facets: Facet[]): EsFilter[] =>
    facets.map(facet => {
        const config = configs.find((configItem, idx) => {
            const num = facet.caption.split('_')[1];
            return Number(num) === idx || (!!configItem.caption && facet.caption === configItem.caption);
        });

        return {
            paths: config ? config.paths : [],
            type: config ? config.type : 'MultiSelect',
            caption: facet.caption,
            values: facet.options || []
        };
    });

const setNewSelected = (newFilters: EsFilter[], key: string, valueName: string) => {
    newFilters.forEach((newFilter, filterIdx) => {
        newFilter.paths.forEach(path => {
            if (path === key) {
                newFilter.values.forEach((newValue, valueIdx) => {
                    if (newValue.name === valueName) {
                        const value = { ...newValue, selected: true };
                        let values = newFilter.values.slice();
                        values[valueIdx] = value;
                        newFilters[filterIdx] = { ...newFilter, values };
                    }
                });
            }
        });
    });
};

export const mergeOldSelected = (newFilters: EsFilter[], location: Location) => {
    const { search } = queryString.parse(location.search.substring(1));

    if (search) {
        const searchObj = JSON.parse(search);

        if (searchObj.bool.must.length > 0) {
            searchObj.bool.must.forEach(matches => {
                if (!matches.bool || !matches.bool.should) {
                    return;
                }

                matches.bool.should.forEach(obj => {
                    const key = Object.keys(obj.match)[0];
                    const value = obj.match[key];
                    return setNewSelected(newFilters, key.slice(0, -4), value);
                });
            });
        }
    }
};

const toggleFilterItem = (index: number, value: string, filters: EsFilter[]): EsFilter => {
    const filterItem = filters[index];

    const values = filterItem.values.map(val => {
        if (val.name === value) {
            return {
                ...val,
                selected: !val.selected
            };
        }
        return val;
    });

    return { ...filterItem, values };
};

// reducer
export default (state: SearchReducer = initialState, action: Action): SearchReducer => {
    switch (action.type) {
        case 'ES_MERGE_FILTERS': {
            return {
                ...state,
                filters: action.payload.filters,
                callRequested: false
            };
        }
        case 'ES_TOGGLE_FILTER': {
            return {
                ...state,
                filters: action.payload.filters,
                callRequested: true
            };
        }
        case 'SUBMIT_SEARCH':
            return {
                ...state,
                fullText: {
                    ...state.fullText,
                    [action.payload.type]: action.payload.value
                }
            };
        case 'ES_REQUEST_CALL':
            return {
                ...state,
                callRequested: true
            };
        default:
            return state;
    }
};

// action creators
export const submitSearch = (type: keyof SearchReducer, value: string) => {
    return {
        type: 'SUBMIT_SEARCH',
        payload: { type, value }
    };
};

export const mergeFilters = (facetConfigs: FacetConfig[], facetValues: Facet[], location: Location) => {
    let filters: EsFilter[] = mergeFacets(facetConfigs, facetValues);

    // Iterate through the Elastic search string to add earlier selected states
    mergeOldSelected(filters, location);

    return {
        type: 'ES_MERGE_FILTERS',
        payload: { filters }
    };
};

export const toggleFilter = (index, value: string, oldFilters: EsFilter[]) => {
    const toggledFilter = toggleFilterItem(index, value, oldFilters);

    const filters = oldFilters.slice();
    filters[index] = toggledFilter;

    return {
        type: 'ES_TOGGLE_FILTER',
        payload: { filters }
    };
};

export const requestCall = (): RequestCallAction => ({
    type: 'ES_REQUEST_CALL'
});
