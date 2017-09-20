import { gql } from 'react-apollo';

const contactFragment = gql`
    fragment ContactFragment on ContactInfo {
        name
        email
    }
`;

const collectionBase = gql`
    fragment CollectionBase on CollectionMetadata {
        title
        collectionId
    }
`;

const collectionsFragment = gql`
  fragment CollectionsFragment on CollectionMetadataList {
      items {
          ...CollectionBase
          summaryProperties {
              title
              description
              image
          }
      }
  }
  ${collectionBase}
`;

const dataSetMetaDataFragment = gql`
    fragment DataSetMetaDataFragment on DataSetMetadata {
        datasetId
        title
        description
        imageUrl
        owner {
            name
            email
        }
        contact {
            ...ContactFragment
        }
        provenanceInfo {
            title
            body
        }
        collections {
            items {
                ...CollectionBase
            }
        }
    }
    ${contactFragment}
    ${collectionBase}
`;

export { dataSetMetaDataFragment, collectionsFragment };