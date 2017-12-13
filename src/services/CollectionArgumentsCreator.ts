import queryString from 'querystring';
import { FacetConfig, IndexConfig } from '../typings/schema';
import {
    convertToEsPath,
    EsItem,
    EsMatch,
    EsMatches,
    EsQuery,
    EsQueryString,
    EsRange,
    EsRangeProps,
    SearchType
} from './EsQueryStringCreator';
import { Location } from 'history';
import { FACET_TYPE } from '../constants/forms';

interface Aggs {
    [name: string]: Agg;
}

interface Agg {
    filter: EsQuery | {};
    aggs: {
        range?: {
            date_histogram: {
                field: string;
                interval: string;
                format: string;
            };
        };
        name?: {
            terms?: {
                field: string;
            };
        };
    };
}

interface ElasticSearchParams {
    aggs: Aggs;
    post_filter?: EsQuery;
}

const doubleStringify = (obj: {}): string => JSON.stringify(JSON.stringify(obj));

type ObjQueryProps<T, K extends keyof T> = { [P in K]: { [name: string]: string | EsRangeProps } };

const hasKeyAsField = <T extends ObjQueryProps<T, K>, K = keyof T>(list: Array<T>, iterator: keyof T, field: string) =>
    list.find(item => item[iterator] && !!Object.keys(item[iterator]).find(key => key === field));

/** filter aggregations that match the path out of the search object and return a new instance
 *
 * @param {EsQuery} searchObj
 * @param {string} field
 * @returns {EsQuery}
 */
const setFilteredSearchObj = (searchObj: EsQuery, field: string): EsQuery => {
    const filteredSearchObj: EsQuery = { bool: { must: [] } };

    searchObj.bool.must.forEach((obj: SearchType) => {
        if ((obj as EsQueryString).query_string) {
            filteredSearchObj.bool.must.push(obj);
        } else if (
            (obj as EsMatches).bool &&
            ((obj as EsMatches).bool.should as EsMatch[]) &&
            (obj as EsMatches).bool.should.length > 0
        ) {
            let keyIsField: boolean = false;

            const matches = (obj as EsMatches).bool.should as Array<EsItem>;

            if (!!matches.length) {
                if (
                    hasKeyAsField<EsMatch, 'match'>(matches as EsMatch[], 'match', field) ||
                    hasKeyAsField<EsRange, 'range'>(matches as EsRange[], 'range', field)
                ) {
                    keyIsField = true;
                }
            }

            if (!keyIsField) {
                filteredSearchObj.bool.must.push(obj);
            }
        }
    });

    return filteredSearchObj;
};
const HISTOGRAM_INTERVAL = 'year';
const HISTOGRAM_FORMAT = 'yyyy';

/** create a string with aggregations. In case of a querystring add a filter for each aggregation to optimize the counts of filters to be shown
 *
 * @param {FacetConfig[]} facets
 * @param {EsQuery} searchObj
 * @returns {Aggs}
 */
const createAggsString = (facets: FacetConfig[], searchObj: EsQuery | null): Aggs => {
    const aggregations: Aggs = {};

    for (const [idx, { paths, caption, type }] of facets.entries()) {
        if ((caption || type) && paths) {
            const field = convertToEsPath(paths[0]);
            const filter = searchObj ? setFilteredSearchObj(searchObj, field) : {};

            switch (type) {
                case FACET_TYPE.multiSelect:
                    aggregations[caption || `${type}_${idx}`] = {
                        filter,
                        aggs: { name: { terms: { field } } }
                    };
                    break;
                case FACET_TYPE.dateRange:
                    aggregations[caption || `${type}_${idx}`] = {
                        filter,
                        aggs: {
                            range: {
                                date_histogram: {
                                    field,
                                    interval: HISTOGRAM_INTERVAL,
                                    format: HISTOGRAM_FORMAT
                                }
                            }
                        }
                    };

                    break;
                default:
                    break;
            }
        }
    }

    return aggregations;
};

/** Set the elasticSearch params for the collection. Always returns aggs, in case of a querystring in the url also includes a post_filter
 *
 * @param {IndexConfig} indexConfig
 * @param {string} search
 * @returns {string | null}
 */

const setElasticSearchParams = (indexConfig: IndexConfig, search: string): string | null => {
    const searchObj: EsQuery | null = search ? JSON.parse(search) : null;
    const aggs: Aggs = createAggsString(indexConfig.facet, searchObj);

    const elasticSearchParams: ElasticSearchParams =
        !search || !searchObj ? { aggs } : { aggs, post_filter: searchObj };

    if (!searchObj && !Object.keys(aggs).length) {
        return null;
    }

    return doubleStringify(elasticSearchParams);
};

/** Set arguments meant for collections. At the very least returns a stringified elasticsearch query
 *
 * @param indexConfig
 * @param location
 * @returns {string}
 */
const setCollectionArguments = (indexConfig: IndexConfig, location: Location): string => {
    const { cursor, search } = queryString.parse(location.search.substring(1));
    const searchQuery = setElasticSearchParams(indexConfig, search as string);

    const elasticsearch = searchQuery ? `elasticsearch: ${searchQuery}` : '';
    const cursorString = cursor ? `cursor: ${JSON.stringify(cursor)}` : '';

    if (!searchQuery && !cursor) {
        return '';
    }

    return `(${elasticsearch}${elasticsearch && cursorString ? ', ' : ''}${cursorString})`;
};

export default setCollectionArguments;
