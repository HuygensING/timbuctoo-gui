import { gql } from 'react-apollo';

const contactFragment = gql`
    fragment ContactFragment on ContactInfo {
        name
        email
    }
`;

const provenanceFragment = gql`
    fragment ProvenanceInfoFragment on DataSetMetadata {
        provenanceInfo {
            title
            body   
        }
    }
`;

const collectionBase = gql`
    fragment CollectionBase on CollectionMetadata {
        title
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
        collections {
            items {
                ...CollectionBase
                ...CollectionProperties
                summaryProperties {
                    title
                    description
                    image
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
        title
        description
        imageUrl
        owner {
            ...ContactFragment
        }
        contact {
            ...ContactFragment
        }
        ...ProvenanceInfoFragment
        collections {
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