import gql from 'graphql-tag';
import setCollectionArguments from '../../services/CollectionArgumentsCreator';
import { RouteComponentProps } from 'react-router';
import { MetaDataProps } from '../../services/metaDataResolver';
import { pathsToGraphQlQuery, parsePath } from '../../services/propertyPath';

export type Props = RouteComponentProps<{ dataSet: string }> & MetaDataProps;

const QUERY_COLLECTION_VALUES = ({ match, location, metadata }: Props) => {
    if (!metadata.dataSetMetadata || !metadata.dataSetMetadata.collection) {
        return null;
    }

    const { summaryProperties, collectionListId, indexConfig } = metadata.dataSetMetadata.collection;

    const collectionArguments = setCollectionArguments(indexConfig, location);
    const { title, description, image } = summaryProperties;

    const propQuery = pathsToGraphQlQuery(
        [title, description, image].filter(x => x).map(p => parsePath(p!.value)),
        match.params.dataSet,
        '                            '
    );
    const query = `
        query CollectionValues {
        
            dataSets {
                ${match.params.dataSet} {
                    ${collectionListId}${collectionArguments} {
                        nextCursor
                        prevCursor
                        facets {
                            caption
                            options {
                                name
                                count
                            }
                        }
                        items {
                            uri
                            ${propQuery}
                        }
                    }
                }
            }
        }
    `;

    return gql`${query}`;
};

export default QUERY_COLLECTION_VALUES;
