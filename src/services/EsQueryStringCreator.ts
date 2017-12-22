import { pathToEsValueString } from './propertyPath';
import { EsFilter, EsValue, FullTextSearch } from '../reducers/search';
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
    gt: string;
    lt: string;
}

export interface EsRange {
    range: {
        [name: string]: EsRangeProps;
    };
}

const createMatchQueries = (filter: EsFilter): EsMatch[] => {
    const queries: EsMatch[] = [];

    for (const value of filter.values) {
        if (!value.selected) {
            continue;
        }

        for (const path of filter.paths) {
            queries.push({ match: { [pathToEsValueString(path)]: value.name } });
        }
    }

    return queries;
};

const calcRangeStep = (values: EsValue[]): number => {
    return values.length > 1 ? Number(values[1].name) - Number(values[0].name) : 1;
};

const getRangeName = (values: EsValue[], idx: number, offset: number = 0): string => {
    idx = idx + offset;
    const step = calcRangeStep(values);

    if (values[idx]) {
        return values[idx].name;
    } else if (idx > values.length - 1) {
        return String(Number(values[values.length - 1].name) + step);
    }

    return String(Number(values[0].name) - step);
};

const createRangeQuery = (filter: EsFilter): EsRange[] => {
    if (!filter.range || filter.range.all) {
        return [];
    }

    const { lt, gt } = filter.range;

    const query: EsRange = { range: {} };

    for (const path of filter.paths) {
        query.range[pathToEsValueString(path)] = {
            lt: getRangeName(filter.values, lt, 1),
            gt: getRangeName(filter.values, gt, -1)
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
