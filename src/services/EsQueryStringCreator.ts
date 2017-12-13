import { EsFilter, EsValue, FullTextSearch } from '../reducers/search';
import { PATH_SPLIT, splitPath } from './walkPath';
import { FACET_TYPE } from '../constants/forms';

export interface EsQuery {
    bool: EsBool;
}

export interface EsBool {
    must: SearchType[];
}

export type SearchType = EsMatches | EsQueryString;

export interface EsQueryString {
    query_string: {
        query: string;
    };
}

export type EsItem = EsMatch | EsRange;

export interface EsMatches {
    bool: {
        should: EsItem[];
    };
}

export interface EsMatch {
    match: {
        [name: string]: string;
    };
}

export interface EsRangeProps {
    gt?: string;
    lt?: string;
}

export interface EsRange {
    range: {
        [name: string]: EsRangeProps;
    };
}

const RAW = 'raw';
/** Create path that only holds values for elasticsearch querying
 *
 * @param {string} path
 * @constructor
 */
export const convertToEsPath = (path: string): string => `${splitPath(path, true).join(PATH_SPLIT)}.${RAW}`;

const createMatchQueries = (filter: EsFilter): EsMatch[] => {
    const queries: EsMatch[] = [];

    for (const value of filter.values) {
        if (!value.selected) {
            continue;
        }

        for (const path of filter.paths) {
            queries.push({ match: { [convertToEsPath(path)]: value.name } });
        }
    }

    return queries;
};

const setRangeAmount = (values: EsValue[], idx: number): string => {
    if (values[idx]) {
        return values[idx].name;
    }

    try {
        const singleLastCount = Number(values[values.length - 2].name);
        const lastCount = Number(values[values.length - 1].name);
        return String(lastCount + (lastCount - singleLastCount));
    } catch {
        return values[values.length - 1].name;
    }
};

const createRangeQuery = (filter: EsFilter): EsRange[] => {
    if (!filter.range) {
        return [];
    }

    const { lt, gt } = filter.range;
    const query: EsRange = { range: {} };

    for (const path of filter.paths) {
        query.range[convertToEsPath(path)] = {
            lt: setRangeAmount(filter.values, lt + 1),
            gt: filter.values[gt].name
        };
    }

    return [query];
};

const createQueriesForFilter = (filter: EsFilter): Array<EsMatch | EsRange> => {
    switch (filter.type) {
        case FACET_TYPE.multiSelect:
            return createMatchQueries(filter);
        case FACET_TYPE.dateRange:
            return createRangeQuery(filter);
        case FACET_TYPE.hierarchical:
        default:
            return [];
    }
};

/** retrieve all selected values, create a new 'match' for each of them and add them to the query
 *
 * @param {EsFilter[]} filters
 * @param {EsQuery} query
 */
const addQueries = (filters: Readonly<EsFilter[]>, query: EsQuery): void => {
    filters.forEach(filter => {
        const queries = createQueriesForFilter(filter);

        if (!!queries.length) {
            const matches: EsMatches = { bool: { should: queries } };
            query.bool.must.push(matches);
        }
    });
};

/** Create an Elastic search query string to be set in the url.
 *
 * @param {EsFilter[]} filters
 * @param {FullTextSearch} fullText
 * @returns {string}
 */
export const createEsQueryString = (filters: Readonly<EsFilter[]>, fullText: FullTextSearch): string | null => {
    const query: EsQuery = { bool: { must: [] } };

    if (fullText.collection.length > 0) {
        query.bool.must.push({
            query_string: { query: fullText.collection }
        });
    }

    addQueries(filters, query);

    if (query.bool.must.length === 0) {
        return null;
    }

    return JSON.stringify(query);
};
