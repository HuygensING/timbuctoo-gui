import React, { SFC } from 'react';
import { ChildProps, gql } from 'react-apollo';
import { RouteComponentProps, withRouter } from 'react-router';
import { Grid } from '../layout/Grid';
import FullHelmet from '../FullHelmet';
import { Title } from '../layout/StyledCopy';
import styled from '../../styled-components';
import DraggableForm from '../form/DraggableForm';
import { ComponentConfig } from '../../typings/schema';
import QUERY_COLLECTION_PROPERTIES from '../../graphql/queries/CollectionProperties';
import { denormalizeTree, setTree } from '../../reducers/viewconfig';
import { connect } from 'react-redux';
import metaDataResolver, { MetaDataProps } from '../../services/metaDataResolver';
import { lifecycle } from 'recompose';
import { compose } from 'redux';
import renderLoader from '../../services/renderLoader';
import { RootState } from '../../reducers/rootReducer';
import graphql from 'react-apollo/graphql';

interface StateProps {
    denormalizeTree: () => ComponentConfig[];
}

interface DispatchProps {
    setTree: (components: ComponentConfig[]) => void;
}

type FullProps = MetaDataProps & StateProps & DispatchProps & RouteComponentProps<any>;

type GraphProps = ChildProps<FullProps, { dataSet: string; collectionUrl: string; viewConfig: ComponentConfig[] }>;

const Section = styled.div`
    width: 100%;
    padding-bottom: 3rem;
`;

const ViewConfig: SFC<GraphProps> = props => {
    const onSubmit = () => {
        const { dataSetId, collection } = props.metadata.dataSetMetadata!;
        const viewConfig = props.denormalizeTree();

        if (typeof viewConfig === 'string') {
            return alert(viewConfig); // TODO: Make this fancy, I'd suggest to maybe add an optional error to NormalizedComponentConfig, add a scrollTo and style the selectBox accordingly
        }

        return props.mutate!({ variables: { dataSet: dataSetId, collectionUri: collection!.uri, viewConfig } })
            .then(data => alert(`The collection ${collection!.collectionId} has been updated`)) // TODO: This also should be something fancy
            .catch(err => console.error('there was an error sending the query', err));
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

const submitViewConfig = gql`
    mutation submitViewConfig($dataSet: String!, $collectionUri: String!, $viewConfig: [ComponentInput!]!) {
        setViewConfig(dataSet: $dataSet, collectionUri: $collectionUri, viewConfig: $viewConfig) {
            type
        }
    }
`;

const mapStateToProps = (state: RootState) => ({
    denormalizeTree: () => denormalizeTree(state.viewconfig)
});

const mapDispatchToProps = (dispatch, { match }: RouteComponentProps<{ collection: string }>) => ({
    setTree: (components: ComponentConfig[]) => dispatch(setTree(components, match.params.collection))
});

export default compose<SFC<{}>>(
    withRouter,
    metaDataResolver(QUERY_COLLECTION_PROPERTIES),
    renderLoader('metadata'), // TODO: Add a notFound beneath here
    connect(mapStateToProps, mapDispatchToProps),
    graphql(submitViewConfig),
    lifecycle({
        // todo remove this & add graphToState here once real data is returned by graph
        componentWillMount() {
            const metadata = this.props.metadata && this.props.metadata.dataSetMetadata;
            const config =
                metadata && metadata.collection && metadata.collection.viewConfig ? metadata.collection.viewConfig : [];
            this.props.setTree(config);
        }
    })
)(ViewConfig);
