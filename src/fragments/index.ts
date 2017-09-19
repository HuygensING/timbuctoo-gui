import { gql } from 'react-apollo';

const contactFragment = gql`
    fragment ContactFragment on ContactInfo {
        name
        email
    }
`;

const collectionsFragment = gql`
  fragment CollectionsFragment on CollectionMetadataList {
      items {
          name
          collectionId
      }
  } 
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
            ...CollectionsFragment
        }
    }
    ${contactFragment}
    ${collectionsFragment}
`;

export { dataSetMetaDataFragment, collectionsFragment };