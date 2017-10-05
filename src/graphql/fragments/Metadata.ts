import { gql } from 'react-apollo';

const contactFragment = gql`
    fragment ContactFragment on ContactInfo {
        name { value }
        email { value }
    }
`;

const provenanceFragment = gql`
    fragment ProvenanceInfoFragment on DataSetMetadata {
        provenanceInfo {
            title { value }
            body { value }
        }
    }
`;

const collectionBase = gql`
    fragment CollectionBase on CollectionMetadata {
        title { value }
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
            }
        }
    }
`;

const collectionPropertiesReference = gql`
fragment CollectionPropertiesReference on CollectionMetadata {
    properties {
        items {
            name
            isList
            isValueType
            referencedCollections { items }
        }
    }
}
`;

const collectionsFragment = gql`
    fragment CollectionsFragment on DataSetMetadata {
        collectionList {
            items {
                ...CollectionBase
                ...CollectionPropertiesDensity
                summaryProperties {
                    title { value }
                    description { value }
                    image { value }
                }
            }   
        }
    }
    ${collectionBase}
    ${collectionPropertiesDensity}
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
    }
    ${contactFragment}
    ${provenanceFragment}
    ${collectionBase}
    ${collectionPropertiesDensity}
`;

export { dataSetMetadataFragment, collectionsFragment, collectionPropertiesReference };