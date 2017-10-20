import queryString from 'querystring';
import { FacetConfig, IndexConfig } from '../typings/schema';
import { decode } from './UrlStringCreator';

const createAggsString = (facets: FacetConfig[]): {} => {
    const aggs = { aggs: {} };

    facets.forEach(({ paths, caption, type }: FacetConfig, idx: number) => {
        if (type === 'MultiSelect' && (caption || type) && paths) {
            aggs.aggs[caption || `${type}_${idx}`] = {
                terms: {
                    field: `${paths[0]}.raw`
                }
            };
        }
    });
    const aggString = doubleStringify(aggs);
    return aggString.slice(2, -2);
};

const createPostFilterString = (search: string): string => {
    const searchString = search ? decode(search) : null;

    if (searchString && searchString.length > 0) {
        const searchStr = JSON.stringify(searchString);
        return `\\"query\\": {${searchStr.slice(2, -2)}}`;
    }
    return '';
};

const doubleStringify = (obj: {}): string => JSON.stringify(JSON.stringify(obj));

const elasticQueryStringCreator = (indexConfig: IndexConfig, search: string): string => {
    const aggs = createAggsString(indexConfig.facet);
    const postFilter = createPostFilterString(search);
    return `elasticsearch: "{${aggs} ${postFilter.length > 0 ? ',' + postFilter : ''}}"`;
};

const cursorStringCreator = (cursor: string): string => {
    return cursor ? `, cursor: ${JSON.stringify(cursor)}` : '';
};

const setCollectionArguments = (indexConfig, location): string => {
    const { cursor, search } = queryString.parse(location.search.substring(1));

    const elasticsearch = elasticQueryStringCreator(indexConfig, search);
    const cursorString = cursorStringCreator(cursor);

    return `(${elasticsearch}${cursorString})`;
};

export default setCollectionArguments;