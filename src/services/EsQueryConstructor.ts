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
        fields: string[];
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

const addMatchQueries = (filters: EsFilter[], query: EsQuery): void => {
    filters.forEach(filter => {
        const matches: EsMatches = { bool: { should: [] } };
        let hasValues = false;

        filter.values.forEach(value => {
            if (value.selected) {
                hasValues = true;
                const newMatch: EsMatch = { match: { [`${filter.paths[0]}.raw`]: value.name } };
                matches.bool.should.push(newMatch);
            }
        });

        if (hasValues) {
            query.bool.must.push(matches);
        }
    });
};

export const createEsQueryString = (filters: EsFilter[], fullText: FullTextSearch): string | null => {
    const query: EsQuery = { bool: { must: [] } };

    // todo: Connect fullText Query
    addMatchQueries(filters, query);

    if (query.bool.must.length === 0) {
        return null;
    }

    return JSON.stringify(query);
};
