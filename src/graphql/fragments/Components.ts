import { gql } from 'react-apollo';

const valueComponentFragment = gql`
    fragment ValueComponentFragment on ValueComponent {
        ...on ValueComponent {
            valueKey
        }
    }  
`;

const linkComponentFragment = gql`
    fragment LinkComponentFragment on LinkComponent {
        ...on LinkComponent {
            valueKey
            urlKey
        }
    }
`;

const imageComponentFragment = gql`
    fragment ImageComponentFragment on ImageComponent {
        ...on ImageComponent {
            urlKey
            altKey
        }
    }
`;

const dividerComponentFragment = gql`
    fragment DividerComponentFragment on DividerComponent {
        ...on DividerComponent {
            valueKey
        }
    }
`;

const valueFragments = gql`
    fragment ValueFragments on Component {
        ...ValueComponentFragment
        ...LinkComponentFragment
        ...ImageComponentFragment
        ...DividerComponentFragment
    }
    ${valueComponentFragment}
    ${linkComponentFragment}
    ${imageComponentFragment}
    ${dividerComponentFragment}
`;

const keyValueComponentFragment = gql`
    fragment KeyValueComponentFragment on KeyValueComponent {
        ...on KeyValueComponent {
            key
            values {
                ...ValueFragments
                ...on KeyValueComponent {
                    key
                    values {
                        __typename
                        ...ValueFragments
                    }
                }
            }
        }
    }  
    ${valueFragments}
`;

// const tableComponentFragment = gql`
//     fragment TableComponentFragment on TableComponent{
//         ...on TableComponent {
//             hasHeading
//             tableColumns {
//                 columnName
//                 cells {
//                     ...ValueFragments
//                     ...KeyValueComponentFragment
//                 }
//             }
//         }
//     }  
//     ${valueFragments}
// `;

const componentsFragment = gql`
    fragment ComponentsFragment on Component {
        ...ValueFragments
        ...KeyValueComponentFragment
    }
    ${valueFragments}
    ${keyValueComponentFragment}
`;

/**
 * This needs to be passed down to the ApolloClient for introspection of fragments
 */
const ComponentFragmentSchema = {
    kind: 'UNION',
    name: 'Component',
    possibleTypes: [
        {
            name: 'ValueComponent'
        },
        {
            name: 'LinkComponent'
        },
        {
            name: 'ImageComponent'
        },
        {
            name: 'DividerComponent'
        },
        {
            name: 'TableComponent'
        },
        {
            name: 'KeyValueComponent'
        }
    ]
};

export { componentsFragment, ComponentFragmentSchema };