import { Facet, FacetConfig, FacetOption } from '../typings/schema';
import { Location } from 'history';
import * as queryString from 'querystring';
import { convertToEsPath, EsMatch, EsMatches, EsRange, EsRangeProps } from '../services/EsQueryStringCreator';
import { FACET_TYPE } from '../constants/forms';
import { get, range as lodashRange } from 'lodash';
import { MAX_AMOUNT_RANGE_BUCKETS } from '../constants/global';

export interface FullTextSearch {
    dataset: Readonly<string>;
    collection: Readonly<string>;
    filter: Readonly<string>;
}

export type EsFilter = FacetConfig & { values: EsValue[]; range?: EsRangeNumbers };
export type EsValue = FacetOption & { selected?: boolean };

export interface EsRangeNumbers {
    lt: number;
    gt: number;
}

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
export const closestValue = (input: number, arr: Array<number | string>): number => {
    let value: number = 0;
    let lastDelta: number;

    arr.some((step: number | string, index: number) => {
        const delta = Math.abs(input - Number(step));
        if (delta >= lastDelta) {
            return true;
        }
        value = index;
        lastDelta = delta;
        return false;
    });

    return value;
};

export const minifyValues = (values: EsValue[]): EsValue[] => {
    const first = Number(values[0].name);
    const last = Number(values[values.length - 1].name);
    const step = Math.floor((last - first) / (MAX_AMOUNT_RANGE_BUCKETS - 2));

    const nArr = [...lodashRange(first, last, step), last];
    const minified = nArr.map(name => ({ name: String(name), count: 0 }));

    for (const value of values) {
        let closestIdx = nArr.findIndex(num => {
            return num > Number(value.name);
        });

        if (closestIdx < 0) {
            closestIdx = nArr.length - 1;
        }

        minified[closestIdx].count += value.count;
    }

    return minified;
};

const mergeFacets = (configs: FacetConfig[], facets: Facet[]): EsFilter[] =>
    facets.map(facet => {
        const config = configs.find((configItem, idx) => {
            const num = facet.caption.split('_')[1];
            return Number(num) === idx || (!!configItem.caption && facet.caption === configItem.caption);
        });

        const obj: EsFilter = {
            paths: config ? config.paths : [],
            type: config ? config.type : FACET_TYPE.multiSelect,
            caption: facet.caption,
            values: facet.options || []
        };

        if (obj.type === FACET_TYPE.dateRange) {
            if (obj.values.length > MAX_AMOUNT_RANGE_BUCKETS) {
                try {
                    obj.values = minifyValues(obj.values);
                } catch (e) {
                    if (process.env.NODE_ENV === 'development') {
                        console.warn(e);
                    }
                }
            }
            obj.range = { gt: 0, lt: obj.values.length > 1 ? obj.values.length - 1 : 1 };
        }
        return obj;
    });

const setSelectedFilter = (filter: EsFilter, name: string): EsFilter => {
    let newFilter: EsFilter = { ...filter };

    for (const [idx, value] of filter.values.entries()) {
        if (value.name === name) {
            const newVal = { ...value, selected: true };
            let values = newFilter.values.slice();
            values[idx] = newVal;

            newFilter = {
                ...filter,
                values
            };
        }
    }

    return newFilter;
};

const findRangeIndexes = (values: EsValue[], range: EsRangeProps): EsRangeNumbers => {
    const obj = {
        lt: values.length - 1,
        gt: 0
    };

    for (const [idx, { name }] of values.entries()) {
        if (name <= range!.gt) {
            obj.gt = idx === 0 ? idx : idx + 1;
        }
        if (name >= range.lt) {
            obj.lt = idx !== 0 ? (idx > values.length - 1 ? values.length - 1 : idx - 1) : 0;
        }
    }

    return obj;
};

const findPathInFilters = (filters: EsFilter[], pathToFind: string): number | null => {
    for (const [idx, filter] of filters.entries()) {
        for (const path of filter.paths) {
            const trimmedPath = convertToEsPath(path);

            if (trimmedPath === pathToFind) {
                return idx;
            }
        }
    }

    return null;
};

export const mergeOldSelected = (newFilters: EsFilter[], location: Location): void => {
    const { search } = queryString.parse(location.search.substring(1));

    if (search) {
        const searchObj = JSON.parse(search as string);

        if (searchObj.bool.must.length > 0) {
            searchObj.bool.must.forEach((matches: EsMatches) => {
                if (!matches.bool || !matches.bool.should) {
                    return;
                }

                matches.bool.should.forEach(obj => {
                    type MatchOption = 'match' | 'range';
                    const options: Array<MatchOption> = ['match', 'range'];

                    for (const option of options) {
                        const match = get(obj, option);
                        if (match) {
                            const keys = Object.keys(match);

                            if (!keys) {
                                continue;
                            }

                            const selectedIdx = findPathInFilters(newFilters, keys[0]);

                            if (selectedIdx === null) {
                                continue;
                            }

                            switch (option) {
                                case 'match': {
                                    newFilters[selectedIdx] = setSelectedFilter(
                                        newFilters[selectedIdx],
                                        (obj as EsMatch)[option][keys[0]]
                                    );
                                    break;
                                }
                                case 'range': {
                                    newFilters[selectedIdx].range = findRangeIndexes(
                                        newFilters[selectedIdx].values,
                                        (obj as EsRange)[option][keys[0]]
                                    );
                                    break;
                                }
                                default:
                            }
                        }
                    }
                });
            });
        }
    }
};

const toggleRangeItem = (index: number, range: EsRangeNumbers, filters: EsFilter[]): EsFilter => {
    const filterItem = filters[index];
    return { ...filterItem, range };
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

export const toggleRange = (index: number, range: EsRangeNumbers, oldFilters: EsFilter[]) => {
    const toggledFilter = toggleRangeItem(index, range, oldFilters);

    const filters = oldFilters.slice();
    filters[index] = toggledFilter;

    return {
        type: 'ES_TOGGLE_FILTER',
        payload: { filters }
    };
};

export const toggleFilter = (index: number, value: string, oldFilters: EsFilter[]) => {
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
