import gql from 'graphql-tag';
import { decode } from '../../services/UrlStringCreator';
import {
    checkTypes,
    CollectionMetadata,
    ComponentConfig,
    DataSetMetadata,
    Entity,
    EntityList,
    LinkComponentConfig,
    Property,
    Query,
    SummaryProperties,
    TitleComponentConfig
} from '../../typings/schema';
import { RouteComponentProps } from 'react-router';
import { MetaDataProps } from '../../services/metaDataResolver';
import { PATH_SEGMENT_SPLIT, PATH_SPLIT, splitPath } from '../../services/walkPath';
import { COMPONENTS, ITEMS, URI, VALUE } from '../../constants/global';
import { EMPTY_COMPONENT } from '../../constants/emptyViewComponents';

// `type: never` makes the type checker report an error if the case switch does not handle all types
function checkUnknownComponent(type: never) {
    console.error(`Type ${(type as ComponentConfig).type} is not handled!`);
}

function getTitleProp(
    typeId: string,
    otherCollections: Array<{ collectionId: string; summaryProperties: { title?: { value: string } } }>
): string {
    for (const collection of otherCollections) {
        if (collection.collectionId === typeId) {
            const title = collection.summaryProperties.title;

            if (title) {
                return PATH_SPLIT + title.value;
            }

            return PATH_SPLIT + URI;
        }
    }

    return PATH_SPLIT + URI;
}

const createPropertyConfig = (
    { name, isList, isValueType, referencedCollections, isInverse, shortenedUri }: Property,
    otherCollections: Array<CollectionMetadata>
): ComponentConfig => {
    const uriSegment = PATH_SPLIT + PATH_SEGMENT_SPLIT + URI;

    const path = PATH_SEGMENT_SPLIT + name + (isList ? PATH_SPLIT + PATH_SEGMENT_SPLIT + ITEMS : '');

    let value: ComponentConfig;

    if (isValueType) {
        value = { ...EMPTY_COMPONENT[COMPONENTS.path], value: path };
    } else {
        value = {
            ...EMPTY_COMPONENT[COMPONENTS.link],
            subComponents: [
                { ...EMPTY_COMPONENT[COMPONENTS.path], value: path + uriSegment },
                {
                    ...EMPTY_COMPONENT[COMPONENTS.path],
                    value:
                        path +
                        (referencedCollections.items.length === 1
                            ? getTitleProp(referencedCollections.items[0], otherCollections)
                            : uriSegment)
                }
            ]
        } as LinkComponentConfig;
    }

    return {
        ...EMPTY_COMPONENT[COMPONENTS.keyValue],
        value: (isInverse ? '®' : '') + shortenedUri,
        subComponents: [value]
    } as ComponentConfig;
};

export function makeDefaultViewConfig(
    properties: Array<Property>,
    summaryProperties: SummaryProperties,
    otherCollections: Array<CollectionMetadata>
): Array<ComponentConfig> {
    const title: ComponentConfig[] = summaryProperties.title
        ? [
              {
                  ...EMPTY_COMPONENT[COMPONENTS.title],
                  subComponents: [{ ...EMPTY_COMPONENT[COMPONENTS.path], value: summaryProperties.title.value }]
              } as TitleComponentConfig
          ]
        : [];

    const defaultConfig: ComponentConfig[] = properties
        .filter(property => !property.isList)
        .map(property => createPropertyConfig(property, otherCollections));

    return [...title, ...defaultConfig];
}

type KeyValueRecursive = { [key: string]: KeyValueRecursive | {} | boolean };

function componentPathsToMap(paths: string[], dataSetId: string): KeyValueRecursive {
    const result: KeyValueRecursive = {};
    for (const path of paths) {
        let cur: KeyValueRecursive = result;

        const segments = splitPath(path) as string[][];

        if (!segments.length) {
            return result;
        }

        // remove value prop if has one
        if (segments[segments.length - 1][1] === VALUE) {
            segments.pop();
        }

        for (const [idx, [collection, segment]] of segments.entries()) {
            if (!segment) {
                continue;
            }

            const curSegment = idx + 1 === segments.length ? true : {};

            if (!collection || segment === ITEMS) {
                if (!cur.hasOwnProperty(segment)) {
                    cur[segment] = curSegment as KeyValueRecursive;
                }

                cur = cur[segment] as KeyValueRecursive;
            } else {
                const collectionFragment = `...on ${dataSetId}_${collection}`;

                cur[collectionFragment] = {
                    ...(cur[collectionFragment] as KeyValueRecursive),
                    [segment]: curSegment
                };

                cur = (cur[collectionFragment] as KeyValueRecursive)[segment] as KeyValueRecursive;
            }
        }
    }
    return result;
}

function getPaths(components: ComponentConfig[], result: string[]): string[] {
    for (const component of components) {
        switch (component.type) {
            case 'DIVIDER':
                getPaths(component.subComponents || [], result);
                break;
            case 'TITLE':
                getPaths(component.subComponents || [], result);
                break;
            case 'LITERAL':
                break;
            case 'PATH':
                if (component.value !== undefined) {
                    result.push(component.value);
                }
                break;
            case 'IMAGE':
                if (component.subComponents !== undefined) {
                    getPaths(component.subComponents, result);
                }
                break;
            case 'LINK':
                if (component.subComponents !== undefined) {
                    getPaths(component.subComponents, result);
                }
                break;
            case 'KEYVALUE':
                if (component.subComponents !== undefined) {
                    getPaths(component.subComponents, result);
                }
                break;
            default:
                checkUnknownComponent(component);
                return result;
        }
    }
    return result;
}

interface RecursiveType {
    [name: string]: RecursiveType | boolean | string;
}

function mapToQuery(map: RecursiveType, prefix: string): string {
    const result: string[] = [];
    for (const key in map) {
        if (typeof map[key] === 'boolean') {
            if (key === URI) {
                result.push(key);
            } else {
                result.push(key + ` { ${VALUE} type }`);
            }
        } else {
            const subQuery = mapToQuery(map[key] as RecursiveType, prefix + '  ') + '\n';
            result.push(key + ' {\n' + subQuery + prefix + '}');
        }
    }
    return result.map(line => prefix + line).join('\n');
}

export type Props = RouteComponentProps<{
    dataSet: keyof DataSetMetadata;
    collection: string;
    entry: string;
}> &
    MetaDataProps;

export const QUERY_ENTRY_VALUES = ({ match, metadata }: Props) => {
    const values =
        (metadata &&
            metadata.dataSetMetadata &&
            metadata.dataSetMetadata.collection &&
            (metadata.dataSetMetadata.collection.viewConfig.length > 0
                ? (metadata.dataSetMetadata.collection.viewConfig as Array<ComponentConfig>)
                : makeDefaultViewConfig(
                      metadata.dataSetMetadata.collection.properties.items,
                      metadata.dataSetMetadata.collection.summaryProperties,
                      metadata.dataSetMetadata.collectionList.items
                  ))) ||
        [];
    const query = `
        query EntryValues {
            dataSets {
                ${match.params.dataSet} {
                    ${match.params.collection.replace(match.params.dataSet, '')}(uri: "${decode(match.params.entry)}") {
                        __typename # Needs atleast one value to return
${mapToQuery(componentPathsToMap(getPaths(values, []), match.params.dataSet), '                        ')}
                    }
                }
            }
        }
    `;
    return gql`${query}`;
};

checkTypes<QueryValuesToCheck, Query>();

// This is the interface to check against the Query definition
interface QueryValuesToCheck {
    dataSets: {
        [dataSetId: string]:
            | {
                  [collectionId: string]: Entity | EntityList | DataSetMetadata | undefined;
              }
            | undefined;
    };
}

// But we know (because we're passing a uri: argument to graphql) that any valid executing query will have either an Entity or undefined
export interface QueryValues {
    dataSets: {
        [dataSetId: string]:
            | {
                  [collectionId: string]: Entity | undefined;
              }
            | undefined;
    };
}
