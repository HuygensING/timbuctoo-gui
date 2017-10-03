import { gql } from 'react-apollo';

const fieldsFragment = gql`
    fragment Fields on ComponentValue {
        field
        fields
    }
`;

const componentsFragment = gql`
    fragment ComponentsFragment on Component {
        type
        value   { ...Fields }
        key     { ...Fields }
        title   { ...Fields }
        url     { ...Fields }
        alt     { ...Fields }
        tree
        values {
            type
            value   { ...Fields }
            key     { ...Fields }
            title   { ...Fields }
            url     { ...Fields }
            alt     { ...Fields }
            tree
            values {
                type
                value   { ...Fields }
                key     { ...Fields }
                title   { ...Fields }
                url     { ...Fields }
                alt     { ...Fields }
                tree
            }
        }
    }
    ${fieldsFragment}
`;

export { componentsFragment };