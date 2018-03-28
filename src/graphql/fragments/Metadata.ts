import gql from 'graphql-tag';
const contactFragment = gql`
    fragment ContactFragment on ContactInfo {
        name {
            value
        }
        email {
            value
        }
    }
`;

const provenanceFragment = gql`
    fragment ProvenanceInfoFragment on DataSetMetadata {
        provenanceInfo {
            title {
                value
            }
            body {
                value
            }
        }
    }
`;

const collectionBase = gql`
    fragment CollectionBase on CollectionMetadata {
        total
        title {
            value
        }
        collectionId
        collectionListId
    }
`;

const collectionPropertiesDensity = gql`
    fragment CollectionPropertiesDensity on CollectionMetadata {
        properties {
            items {
                name
                density
                isList
                shortenedUri
                isInverse
                isValueType
                referencedCollections {
                    items
                }
            }
        }
    }
`;

const collectionPropertiesReference = gql`
    fragment CollectionPropertiesReference on CollectionMetadata {
        properties {
            items {
                name
                shortenedUri
                isList
                isInverse
                isValueType
                referencedCollections {
                    items
                }
            }
        }
    }
`;

interface CollectionPropertiesReference {
    properties: {
        items: Array<{
            name: string;
            shortenedUri: string;
            isList: boolean;
            isInverse: boolean;
            isValueType: boolean;
            referencedCollections: {
                items: string[];
            };
        }>;
    };
}

const collectionIndexConfig = gql`
    fragment CollectionIndexConfig on IndexConfig {
        facet {
            paths
            type
            caption
        }
        fullText {
            caption
            fields {
                path
                boost
            }
        }
    }
`;

const dataSetMetadataFragment = gql`
    fragment DataSetMetadataFragment on DataSetMetadata {
        dataSetId
        title { value }
        description { value }
        imageUrl { value }
        owner {
            ...ContactFragment
        }
        contact {
            ...ContactFragment
        }
        ...ProvenanceInfoFragment
        collectionList {
            items {
                ...CollectionBase
                ...CollectionPropertiesDensity
            }
        }
        provenanceInfo {
            title { value }
            body { value type }
        }
    }
    ${contactFragment}
    ${provenanceFragment}
    ${collectionBase}
    ${collectionPropertiesDensity}
`;

export {
    dataSetMetadataFragment,
    collectionBase,
    collectionPropertiesDensity,
    collectionPropertiesReference,
    CollectionPropertiesReference,
    collectionIndexConfig
};
