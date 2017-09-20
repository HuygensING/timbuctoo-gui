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
                }
            }
        }
    }  
`;

const keyValueFragment = gql`
    fragment KeyValueFragment on DataKeyValue {
        ...on DataKeyValue {
            key
            values {
                __typename
            }
        }
    }  
`;

const valuesFragment = gql`
    fragment Valuesfragment on Value {
        __typename
        ...ValueStringFragment
        ...DataTableFragment
        ...keyValueFragment
    }
    ${valueStringFragment}
    ${dataTableFragment}
    ${keyValueFragment}
`;

export { valuesFragment };