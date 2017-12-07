import { EsFilter, FullTextSearch } from '../reducers/search';
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

const createRangeProps = (filter: EsFilter): EsRangeProps | null => {
    let startIdx: number | null = null;
    let endIdx: number | null = null;

    // discover the range of values that is needed
    for (const [idx, value] of filter.values.entries()) {
        if (!value.selected) {
            continue;
        }

        if (typeof startIdx !== 'number') {
            startIdx = idx;
        } else {
            endIdx = idx;
        }
    }

    // no selection
    if (startIdx === null) {
        return null;
    }

    const rangeProps: EsRangeProps = {};

    // only start range
    rangeProps.gt = startIdx.toString();

    if (endIdx) {
        rangeProps.lt = endIdx.toString();
    }

    return rangeProps;
};

const createRangeQuery = (filter: EsFilter): EsRange[] => {
    const rangeProps = createRangeProps(filter);
    if (!rangeProps) {
        return [];
    }

    const query: EsRange = { range: {} };

    for (const path of filter.paths) {
        query.range[convertToEsPath(path)] = rangeProps;
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
