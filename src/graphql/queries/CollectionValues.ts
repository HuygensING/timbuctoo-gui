import gql from 'graphql-tag';
import setCollectionArguments from '../../services/CollectionArgumentsCreator';
import { RouteComponentProps } from 'react-router';
import { MetaDataProps } from '../../services/metaDataResolver';
import { pathsToGraphQlQuery, parsePath, ReferencePath } from '../../services/propertyPath';
import { ITEMS } from '../../constants/global';

export type Props = RouteComponentProps<{ dataSet: string }> & MetaDataProps;

const QUERY_COLLECTION_VALUES = ({ match, location, metadata }: Props) => {
    if (!metadata.dataSetMetadata || !metadata.dataSetMetadata.collection) {
        return null;
    }

    const {
        summaryProperties,
        collectionListId,
        indexConfig,
        collectionId,
        properties
    } = metadata.dataSetMetadata.collection;

    let defaultTitle: ReferencePath | undefined = undefined;
    if (properties.items.some(x => x.name === 'rdfs_label')) {
        defaultTitle = [[collectionId, 'rdfs_label'], ['Value', 'value']];
    } else if (properties.items.some(x => x.name === 'rdfs_labelList')) {
        defaultTitle = [[collectionId, 'rdfs_labelList'], [ITEMS, 'items'], ['Value', 'value']];
    }

    const collectionArguments = setCollectionArguments(indexConfig, location);
    const { title, description, image } = summaryProperties;

    const propQuery = pathsToGraphQlQuery(
        [description, image]
            .filter(x => x)
            .map(p => parsePath(p!.value))
            .concat(title != null ? parsePath(title!.value) : defaultTitle !== undefined ? [defaultTitle] : []),
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
