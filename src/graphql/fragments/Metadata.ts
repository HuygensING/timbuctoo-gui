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

const collectionProperties = gql`
    fragment CollectionProperties on CollectionMetadata {
        properties {
            items {
                name
                density
            }
        }
    }
`;

const collectionsFragment = gql`
    fragment CollectionsFragment on DataSetMetadata {
        collectionList {
            items {
                ...CollectionBase
                ...CollectionProperties
                summaryProperties {
                    title { value }
                    description { value }
                    image { value }
                }
            }   
        }
    }
    ${collectionBase}
    ${collectionProperties}
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
                ...CollectionProperties
            }
        }
    }
    ${contactFragment}
    ${provenanceFragment}
    ${collectionBase}
    ${collectionProperties}
`;

export { dataSetMetadataFragment, collectionsFragment };