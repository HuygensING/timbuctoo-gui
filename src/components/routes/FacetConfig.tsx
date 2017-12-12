import React, { SFC } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Grid } from '../layout/Grid';
import FullHelmet from '../FullHelmet';
import { Title } from '../layout/StyledCopy';
import styled from '../../styled-components';
import { FormWrapperProps } from '../../typings/Forms';
import DraggableForm from '../form/DraggableForm';
import QUERY_COLLECTION_PROPERTIES from '../../graphql/queries/CollectionProperties';
import { connect } from 'react-redux';
import { denormalizeFacets } from '../../reducers/facetconfig';
import { compose } from 'redux';
import metaDataResolver, { MetaDataProps } from '../../services/metaDataResolver';
import renderLoader from '../../services/renderLoader';
import graphToState from '../../services/graphToState';
import { RootState } from '../../reducers/rootReducer';
import { NormalizedFacetConfig } from '../../typings';
import verifyResponse from '../../services/verifyResponse';
import { ChildProps } from 'react-apollo';
import { FacetConfig } from '../../typings/schema';
import gql from 'graphql-tag';
import { collectionIndexConfig } from '../../graphql/fragments/Metadata';
import graphqlWithProps from '../../services/graphqlWithProps';

interface StateProps {
    normalizedFacets: NormalizedFacetConfig[];
}

type FullProps = MetaDataProps &
    StateProps &
    RouteComponentProps<{ dataSet: string; collection: string }> &
    FormWrapperProps;

interface GraphIndexConfig {
    facet: FacetConfig[];
    fullText?: {
        caption: '';
        fields: { path: string }[];
    };
}

type GraphProps = ChildProps<FullProps, { dataSet: string; collectionUrl: string; indexConfig: GraphIndexConfig }>;

const Section = styled.div`
    width: 100%;
    padding-bottom: 3rem;
`;

const FacetConfig: SFC<GraphProps> = props => {
    const onSubmit = async () => {
        const { dataSetId, collection } = props.metadata.dataSetMetadata!;

        try {
            const facet = denormalizeFacets(props.normalizedFacets);
            const indexConfig: GraphIndexConfig = {
                facet,
                fullText: {
                    caption: '',
                    fields: []
                } // TODO: Implement a full text configurable option for the facets
            };

            await props.mutate!({ variables: { dataSet: dataSetId, collectionUri: collection!.uri, indexConfig } });
            alert(`The facet configuration for collection ${collection!.collectionId} has been updated`);
        } catch (e) {
            alert(e); // TODO: Make this fancy, I'd suggest to maybe add an optional error to NormalizedFacetConfig, add a scrollTo and style the selectBox accordingly
        }
    };

    return (
        <Grid smOffset={3} sm={42} xs={46} xsOffset={1}>
            <Section>
                <FullHelmet pageName="Facet config" />
                <Title>Facet configuration screen</Title>
                <DraggableForm configType="facet" id={0} onSend={onSubmit} />
            </Section>
        </Grid>
    );
};

const submitFacetConfig = () => gql`
    mutation submitFacetConfig($dataSet: ID!, $collectionUri: String!, $indexConfig: IndexConfigInput!) {
        setIndexConfig(dataSet: $dataSet, collectionUri: $collectionUri, indexConfig: $indexConfig) {
            ...CollectionIndexConfig
        }
    }
${collectionIndexConfig}`;

const mapStateToProps = (state: RootState) => ({
    normalizedFacets: state.facetconfig
});

export default compose<SFC<{}>>(
    withRouter,
    metaDataResolver<FullProps>(QUERY_COLLECTION_PROPERTIES),
    renderLoader('metadata'),
    verifyResponse<FullProps, 'metadata'>('metadata', 'dataSetMetadata.collection'),
    graphqlWithProps(submitFacetConfig, {
        queryName: 'CollectionProperties',
        path: 'dataSetMetadata.collection.indexConfig',
        mutationName: 'setIndexConfig'
    }),
    connect(mapStateToProps),
    graphToState<FullProps>('GRAPH_TO_FACETCONFIG', 'metadata', false)
)(FacetConfig);
