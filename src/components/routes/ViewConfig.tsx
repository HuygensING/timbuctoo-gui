import React, { SFC } from 'react';
import { ChildProps } from 'react-apollo';
import gql from 'graphql-tag';
import { withRouter } from 'react-router';
import { Grid } from '../layout/Grid';
import FullHelmet from '../FullHelmet';
import { Title } from '../layout/StyledCopy';
import styled from '../../styled-components';
import DraggableForm from '../form/DraggableForm';
import { ComponentConfig } from '../../typings/schema';
import QUERY_COLLECTION_PROPERTIES, {
    Props as CollectionPropertiesProps
} from '../../graphql/queries/CollectionProperties';
import { denormalizeTree } from '../../reducers/viewconfig';
import { connect } from 'react-redux';
import metaDataResolver, { MetaDataProps } from '../../services/metaDataResolver';
import { compose } from 'redux';
import renderLoader from '../../services/renderLoader';
import { RootState } from '../../reducers/rootReducer';
import graphToState from '../../services/graphToState';
import verifyResponse from '../../services/verifyResponse';
import graphqlWithProps from '../../services/graphqlWithProps';
import { componentsFragment } from '../../graphql/fragments/Components';

interface StateProps {
    denormalizeTree: () => ComponentConfig[];
}

type FullProps = MetaDataProps & StateProps & CollectionPropertiesProps;

type GraphProps = ChildProps<FullProps, { dataSet: string; collectionUrl: string; viewConfig: ComponentConfig[] }>;

const Section = styled.div`
    width: 100%;
    padding-bottom: 3rem;
`;

const ViewConfig: SFC<GraphProps> = props => {
    const onSubmit = async () => {
        const { dataSetId, collection } = props.metadata.dataSetMetadata!;

        try {
            const viewConfig = props.denormalizeTree();
            await props.mutate!({ variables: { dataSet: dataSetId, collectionUri: collection!.uri, viewConfig } });
            alert(`The collection ${collection!.collectionId} has been updated`);
        } catch (e) {
            alert(e); // TODO: Make this fancy, I'd suggest to maybe add an optional error to NormalizedComponentConfig, add a scrollTo and style the selectBox accordingly
        }
    };

    return (
        <Grid smOffset={3} sm={42} xs={46} xsOffset={1}>
            <Section>
                <FullHelmet pageName="View screen" />
                <Title>View screen</Title>
                <DraggableForm id={0} configType="view" onSend={onSubmit} />
            </Section>
        </Grid>
    );
};

const submitViewConfig = () => gql`
    mutation submitViewConfig($dataSet: String!, $collectionUri: String!, $viewConfig: [ComponentInput!]!) {
        setViewConfig(dataSet: $dataSet, collectionUri: $collectionUri, viewConfig: $viewConfig) {
            ...ComponentsFragment
        }
    }
${componentsFragment}`;

const mapStateToProps = (state: RootState) => ({
    denormalizeTree: () => denormalizeTree(state.viewconfig)
});

export default compose<SFC<{}>>(
    withRouter,
    metaDataResolver<FullProps>(QUERY_COLLECTION_PROPERTIES),
    renderLoader('metadata'),
    verifyResponse<FullProps, 'metadata'>('metadata', 'dataSetMetadata.collection'),
    graphqlWithProps(submitViewConfig, {
        queryName: 'EntryProperties',
        path: 'dataSetMetadata.collection.viewConfig',
        mutationName: 'setViewConfig'
    }),
    graphToState<FullProps>('GRAPH_TO_VIEWCONFIG', 'metadata', false),
    connect(mapStateToProps)
)(ViewConfig);
