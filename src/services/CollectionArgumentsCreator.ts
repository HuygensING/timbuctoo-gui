import queryString from 'querystring';
import { FacetConfig, IndexConfig } from '../typings/schema';
import { decode } from './UrlStringCreator';

const createAggsString = (facets: FacetConfig[]): {} => {
    const aggs = {};

    facets.forEach(({ paths, caption, type }: FacetConfig, idx: number) => {
        if (type === 'MultiSelect' && (caption || type) && paths) {
            aggs[caption || type + idx] = {
                terms: {
                    field: `${paths[0]}.raw`
                }
            };
        }
    });

    return aggs;
};

const createPostFilterString = (search: string): string => {
    const searchString = search ? decode(search) : null;

    if (searchString && searchString.length > 0) {
        return searchString;
    }
    return '';
};

const doubleStringify = (obj: {}): string => JSON.stringify(JSON.stringify(obj));

const elasticQueryStringCreator = (indexConfig: IndexConfig, search: string): string => {
    const obj: { aggs: {}, post_filter?: {} } = {
        aggs: createAggsString(indexConfig.facet)
    };

    const postFilter = createPostFilterString(search);

    if (postFilter.length > 0) {
        obj.post_filter = postFilter;
    }

    return `elasticsearch: ${doubleStringify(obj)}`;
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