import gql from 'graphql-tag';

const MUTATION_VIEW_COMPONENTS = () => {
    const mutation = `
        mutation setViewComponents($viewComponentInfo: $viewComponentInfo!) {
            setViewComponents(input: $viewComponentInfo)
        }
    `;

    return gql`${mutation}`;
};

export default MUTATION_VIEW_COMPONENTS;
