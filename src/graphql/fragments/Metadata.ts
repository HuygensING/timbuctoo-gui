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

const collectionsFragment = gql`
    fragment CollectionsFragment on DataSetMetadata {
        collections {
            items {
                ...CollectionBase
                summaryProperties {
                    title
                    description
                    image
                }
            }   
        }
    }
    ${collectionBase}
`;

const dataSetMetadataFragment = gql`
    fragment DataSetMetadataFragment on DataSetMetadata {
        datasetId
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
            }
        }
    }
    ${contactFragment}
    ${provenanceFragment}
    ${collectionBase}
`;

export { dataSetMetadataFragment, collectionsFragment };