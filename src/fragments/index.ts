import { gql } from 'react-apollo';

export default {
    fragments: {
        dataSetMetaData: gql`fragment CommentsPageComment on DataSetMetadata {
            datasetId
            title
            description
            imageUrl
            owner {
                name
                email
            }
            contact {
                name
                email
            }
            provenanceInfo {
                title
                body
            }
        }`
    }
};