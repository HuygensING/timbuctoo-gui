import { EsFilter, FullTextSearch } from '../reducers/search';
import { pathToEsValueString } from './propertyPath';

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

/** retrieve all selected values, create a new 'match' for each of them and add them to the query
 *
 * @param {EsFilter[]} filters
 * @param {EsQuery} query
 */
const addMatchQueries = (filters: Readonly<EsFilter[]>, query: EsQuery): void => {
    filters.forEach(filter => {
        const matches: EsMatches = { bool: { should: [] } };
        let hasValues = false;

        filter.values.forEach(value => {
            if (value.selected) {
                hasValues = true;
                const newMatch: EsMatch = { match: { [pathToEsValueString(filter.paths[0])]: value.name } };
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
export const createEsQueryString = (filters: Readonly<EsFilter[]>, fullText: FullTextSearch): string | null => {
    const query: EsQuery = { bool: { must: [] } };

    if (fullText.collection.length > 0) {
        query.bool.must.push({
            query_string: { query: fullText.collection }
        });
    }

    addMatchQueries(filters, query);

    if (query.bool.must.length === 0) {
        return null;
    }

    return JSON.stringify(query);
};
