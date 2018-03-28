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
    TitleComponentConfig
} from '../../typings/schema';
import { RouteComponentProps } from 'react-router';
import { MetaDataProps } from '../../services/metaDataResolver';
import { parsePath, serializePath, pathsToGraphQlQuery, ReferencePath } from '../../services/propertyPath';
import { COMPONENTS, ITEMS, URI } from '../../constants/global';
import { EMPTY_COMPONENT } from '../../constants/emptyViewComponents';

// `type: never` makes the type checker report an error if the case switch does not handle all types
function checkUnknownComponent(type: never) {
    console.error(`Type ${(type as ComponentConfig).type} is not handled!`);
}

const createPropertyConfig = (
    collectionId: string,
    { name, isList, isValueType, referencedCollections, isInverse, shortenedUri }: Property,
    otherCollections: Array<CollectionMetadata>
): ComponentConfig => {
    const uriSegment: ReferencePath = [['Entity', URI]];

    const path: ReferencePath = [[collectionId, name] as [string, string]].concat(isList ? [[ITEMS, ITEMS]] : []);

    let value: ComponentConfig;

    if (isValueType) {
        value = { ...EMPTY_COMPONENT[COMPONENTS.path], value: serializePath(path.concat([['Value', 'value']])) };
    } else {
        value = {
            ...EMPTY_COMPONENT[COMPONENTS.link],
            subComponents: [
                { ...EMPTY_COMPONENT[COMPONENTS.path], value: serializePath(path.concat(uriSegment)) },
                {
                    ...EMPTY_COMPONENT[COMPONENTS.path],
                    value: serializePath(path.concat([['Entity', 'title'], ['Value', 'value']]))
                }
            ]
        } as LinkComponentConfig;
    }

    return {
        ...EMPTY_COMPONENT[COMPONENTS.keyValue],
        value: (isInverse ? '⬅︎ ' : '') + shortenedUri,
        subComponents: [value]
    } as ComponentConfig;
};

export function makeDefaultViewConfig(
    properties: Array<Property>,
    collectionId: string,
    otherCollections: Array<CollectionMetadata>
): Array<ComponentConfig> {
    const title: TitleComponentConfig = {
        ...EMPTY_COMPONENT[COMPONENTS.title],
        subComponents: [
            { ...EMPTY_COMPONENT[COMPONENTS.path], value: serializePath([['Entity', 'title'], ['Value', 'value']]) }
        ]
    } as TitleComponentConfig;

    const defaultConfig: ComponentConfig[] = properties.map(property =>
        createPropertyConfig(collectionId, property, otherCollections)
    );

    return [title, ...defaultConfig];
}

function getPaths(components: ComponentConfig[], result: ReferencePath[]): ReferencePath[] {
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
                    result.push(parsePath(component.value));
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

export type Props = RouteComponentProps<{
    dataSet: keyof DataSetMetadata;
    collection: string;
    entry: string;
}> &
    MetaDataProps;

export function QUERY_ENTRY_VALUES({ match, metadata }: Props) {
    const values =
        (metadata &&
            metadata.dataSetMetadata &&
            metadata.dataSetMetadata.collection &&
            (metadata.dataSetMetadata.collection.viewConfig.length > 0
                ? (metadata.dataSetMetadata.collection.viewConfig as Array<ComponentConfig>)
                : makeDefaultViewConfig(
                      metadata.dataSetMetadata.collection.properties.items,
                      metadata.dataSetMetadata.collection.collectionId,
                      metadata.dataSetMetadata.collectionList.items
                  ))) ||
        [];
    const query = `
        query EntryValues {
            dataSets {
                ${match.params.dataSet} {
                    ${match.params.collection.replace(match.params.dataSet, '')}(uri: "${decode(match.params.entry)}") {
                        __typename # Needs atleast one value to return
                        ${pathsToGraphQlQuery(getPaths(values, []), match.params.dataSet, '                        ')}
                    }
                }
            }
        }
    `;
    return gql`${query}`;
}

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
