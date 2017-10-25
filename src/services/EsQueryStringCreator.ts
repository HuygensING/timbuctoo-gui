import { EsFilter, FullTextSearch } from '../reducers/search';

export interface EsQuery {
    bool: EsBool;
}

export interface EsBool {
    must: searchType[];
}

type searchType = EsMatches | EsQueryString;

export interface EsQueryString {
    query_string: {
        query: string;
    };
}

export interface EsMatches {
    bool: {
        should: EsMatch[];
    };
}

export interface EsMatch {
    match: {
        [name: string]: string;
    };
}

/** create a string from the first path and append it with the for ES needed value
 *
 * @param {string[]} paths
 * @returns {string}
 */
export const setFirstPathAsString = (paths: string[]): string => (`${paths[0]}.raw`);

/** retrieve all selected values, create a new 'match' for each of them and add them to the query
 *
 * @param {EsFilter[]} filters
 * @param {EsQuery} query
 */
const addMatchQueries = (filters: EsFilter[], query: EsQuery): void => {
    filters.forEach(filter => {
        const matches: EsMatches = { bool: { should: [] } };
        let hasValues = false;

        filter.values.forEach(value => {
            if (value.selected) {
                hasValues = true;
                const newMatch: EsMatch = { match: { [setFirstPathAsString(filter.paths)]: value.name } };
                matches.bool.should.push(newMatch);
            }
        });

        if (hasValues) {
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
export const createEsQueryString = (filters: EsFilter[], fullText: FullTextSearch): string | null => {
    const query: EsQuery = { bool: { must: [] } };

    if (fullText.collection.length > 0) {
        query.bool.must.push({
            query_string: { query: fullText.collection }
        });
    }

    // todo: Connect fullText Query
    addMatchQueries(filters, query);

    if (query.bool.must.length === 0) {
        return null;
    }

    return JSON.stringify(query);
};