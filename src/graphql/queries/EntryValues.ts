import gql from 'graphql-tag';
import { decode } from '../../services/UrlStringCreator';
import { checkTypes, ComponentConfig, DataSetMetadata, Entity, EntityList, Query } from '../../typings/schema';
import { RouteComponentProps } from 'react-router';
import { MetaDataProps } from '../../services/metaDataResolver';
import { parsePath, pathsToGraphQlQuery, ReferencePath } from '../../services/propertyPath';

// `type: never` makes the type checker report an error if the case switch does not handle all types
function checkUnknownComponent(type: never) {}

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
            case 'INTERNAL_LINK':
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
        metadata && metadata.dataSetMetadata && metadata.dataSetMetadata.collection
            ? metadata.dataSetMetadata.collection.viewConfig
            : [];
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
    return gql`
        ${query}
    `;
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
