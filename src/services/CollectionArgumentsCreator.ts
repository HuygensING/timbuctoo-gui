import queryString from 'querystring';
import { FacetConfig, IndexConfig } from '../typings/schema';
import { EsMatches, EsQuery, setFirstPathAsString } from './EsQueryStringCreator';

interface Aggs {
    [name: string]: Agg;
}

interface Agg {
    filter: EsQuery | {};
    aggs: {
        name: {
            terms: {
                field: string;
            }
        }
    };
}

interface ElasticSearchParams {
    aggs: Aggs;
    post_filter?: EsQuery;
}

const doubleStringify = (obj: {}): string => JSON.stringify(JSON.stringify(obj));

/** filter aggregations that match the path out of the search object and return a new instance
 *
 * @param {EsQuery} searchObj
 * @param {string} field
 * @returns {EsQuery}
 */
const setFilteredSearchObj = (searchObj: EsQuery, field: string): EsQuery => {
    const filteredSearchObj: EsQuery = { bool: { must: [] } };

    searchObj.bool.must.forEach(
        (obj: EsMatches) => {
            if (obj.hasOwnProperty('query_string')) {
                filteredSearchObj.bool.must.push(obj);

            } else if (obj.bool && obj.bool.should && obj.bool.should.length > 0 && obj.bool.should[0].match) {
                const { match } = obj.bool.should[0];
                let keyIsField: boolean = false;

                for (let key in match) {
                    if (match.hasOwnProperty(key)) {
                        if (key === field) {
                            keyIsField = true;
                        }
                    }
                }

                if (!keyIsField) {
                    filteredSearchObj.bool.must.push(obj);
                }
            }
        }
    );

    return filteredSearchObj;
};

/** create a string with aggregations. In case of a querystring add a filter for each aggregation to optimize the counts of filters to be shown
 *
 * @param {FacetConfig[]} facets
 * @param {EsQuery} searchObj
 * @returns {Aggs}
 */
const createAggsString = (facets: FacetConfig[], searchObj: EsQuery | null): Aggs => {
    const aggregations: Aggs = {};

    const entries = facets.entries();
    for (const [idx, { paths, caption, type }] of entries) {

        if (type === 'MultiSelect' && (caption || type) && paths) {
            const field = setFirstPathAsString(paths);
            const filter = searchObj ? setFilteredSearchObj(searchObj, field) : {};

            aggregations[caption || `${type}_${idx}`] = {
                filter,
                aggs: {
                    name: {
                        terms: {
                            field
                        }
                    }
                }
            };
        }
    }

    return aggregations;
};

/** Set the elasticSearch params for the collection. Always returns aggs, in case of a querystring in the url also includes a post_filter
 *
 * @param {IndexConfig} indexConfig
 * @param {string} search
 * @returns {string}
 */
const setElasticSearchParams = (indexConfig: IndexConfig, search: string): string => {
    const searchObj: EsQuery | null = search ? JSON.parse(search) : null;
    const aggs: Aggs = createAggsString(indexConfig.facet, searchObj);

    const elasticSearchParams: ElasticSearchParams = !search || !searchObj
        ? { aggs }
        : { aggs, post_filter: searchObj };

    return doubleStringify(elasticSearchParams);
};

/** Set arguments meant for collections. At the very least returns a stringified elasticsearch query
 *
 * @param indexConfig
 * @param location
 * @returns {string}
 */
const setCollectionArguments = (indexConfig, location): string => {
    const { cursor, search } = queryString.parse(location.search.substring(1));

    const elasticsearch = `elasticsearch: ${setElasticSearchParams(indexConfig, search)}`;
    const cursorString = cursor ? `, cursor: ${doubleStringify(cursor)}` : '';

    return `(${elasticsearch}${cursorString})`;
};

export default setCollectionArguments;