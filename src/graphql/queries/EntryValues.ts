import { gql } from 'react-apollo';
import { decode } from '../../services/UrlStringCreator';
import { checkTypes, ComponentConfig, DataSetMetadata, Entity, EntityList, Query } from '../../typings/schema';
import { RouteComponentProps } from 'react-router';
import { MetaDataProps } from '../../services/metaDataResolver';

// `type: never` makes the type checker report an error if the case switch does not handle all types
function checkUnknownComponent(type: never) {
    console.error(`Type ${(type as ComponentConfig).type} is not handled!`);
}

function getTitleProp(
    typeId: string,
    otherCollections: Array<{ collectionId: string; summaryProperties: { title?: { value: string } } }>
): string {
    for (let i = 0; i < otherCollections.length; i++) {
        if (otherCollections[i].collectionId === typeId) {
            const title = otherCollections[i].summaryProperties.title;
            if (title) {
                return '.' + title.value;
            } else {
                return '.uri';
            }
        }
    }
    return '.uri';
}

export function makeDefaultViewConfig(
    properties: Array<{
        isList: boolean;
        shortenedUri: string;
        isInverse: boolean;
        isValueType: boolean;
        name: string;
        referencedCollections: { items: string[] };
    }>,
    summaryProperties: { title?: { value: string } },
    otherCollections: Array<{ collectionId: string; summaryProperties: { title?: { value: string } } }>
): Array<ComponentConfig> {
    const title: ComponentConfig[] = summaryProperties.title
        ? [
              {
                  type: 'TITLE',
                  formatter: [],
                  subComponents: [{ type: 'PATH', formatter: [], value: summaryProperties.title.value }]
              }
          ]
        : [];
    return title.concat(
        properties
            .filter(x => !x.isList) // FIXME: support union types
            .map(x => {
                const path = x.name + (x.isList ? '.items' : '');
                let value: ComponentConfig;
                if (x.isValueType) {
                    value = {
                        type: 'PATH',
                        value: path,
                        formatter: []
                    };
                } else {
                    value = {
                        type: 'LINK',
                        formatter: [],
                        subComponents: [
                            {
                                type: 'PATH',
                                formatter: [],
                                value: path + '.uri'
                            },
                            {
                                type: 'PATH',
                                formatter: [],
                                value:
                                    path +
                                    (x.referencedCollections.items.length === 1
                                        ? getTitleProp(x.referencedCollections.items[0], otherCollections)
                                        : '.uri')
                            }
                        ]
                    };
                }
                return {
                    type: 'KEYVALUE',
                    value: (x.isInverse ? '®' : '') + x.shortenedUri,
                    formatter: [],
                    subComponents: [value]
                } as ComponentConfig;
            })
    );
}

function componentPathsToMap(paths: string[]): {} {
    const result = {};
    for (const path of paths) {
        let cur = result;
        let segments = path.split('.');

        while (segments.length > 1) {
            const segment = segments.shift()!.split(':')[1];

            if (!segment) {
                continue;
            }

            if (!cur.hasOwnProperty(segment)) {
                cur[segment] = segments.length > 1 ? {} : true;
            }
            cur = cur[segment];
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

function mapToQuery(map: {}, prefix: string): string {
    const result: string[] = [];
    for (const key in map) {
        if (typeof map[key] === 'boolean') {
            if (key === 'uri') {
                result.push(key);
            } else {
                result.push(key + ' { value type }');
            }
        } else {
            const subQuery = mapToQuery(map[key], prefix + '  ') + '\n';
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
${mapToQuery(componentPathsToMap(getPaths(values, [])), '                        ')}
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
