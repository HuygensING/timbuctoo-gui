import { gql } from 'react-apollo';

const valueStringFragment = gql`
    fragment ValueStringFragment on ValueString {
        ...on ValueString {
            type
            valueKey
            urlKey
        }
    }  
`;

const dataTableFragment = gql`
    fragment DataTableFragment on DataTable{
        ...on DataTable {
            hasHeading
            tableColumns {
                columnName
                cells {
                    __typename
                    ...ValueStringFragment
                }
            }
        }
    }  
`;

const keyValueFragment = gql`
    fragment KeyValueFragment on DataKeyValue {
        key
        values {
            __typename
            ...ValueStringFragment
        }
    }  
`;

const componentsFragment = gql`
    fragment ComponentsFragment on Component {
        __typename
        ...ValueStringFragment
        ...DataTableFragment
        ...KeyValueFragment
    }
    ${valueStringFragment}
    ${dataTableFragment}
    ${keyValueFragment}
`;

export { componentsFragment };