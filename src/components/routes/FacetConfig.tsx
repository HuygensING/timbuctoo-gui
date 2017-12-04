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
import { NormalizedFacetConfig } from '../../typings/index';

interface StateProps {
    normalizedFacets: NormalizedFacetConfig[];
}

type FullProps = MetaDataProps &
    StateProps &
    RouteComponentProps<{ dataSet: string; collection: string }> &
    FormWrapperProps;

const Section = styled.div`
    width: 100%;
    padding-bottom: 3rem;
`;

const FacetConfig: SFC<FullProps> = props => {
    const onSubmit = () => {
        const facetconfig = denormalizeFacets(props.normalizedFacets);
        console.groupCollapsed('sending facet config:');
        console.log(facetconfig);
        console.groupEnd();
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

const mapStateToProps = (state: RootState) => ({
    normalizedFacets: state.facetconfig
});

export default compose<SFC<{}>>(
    withRouter,
    metaDataResolver<FullProps>(QUERY_COLLECTION_PROPERTIES),
    renderLoader('metadata'),
    connect(mapStateToProps),
    graphToState<FullProps>('GRAPH_TO_FACETCONFIG', 'metadata', false)
)(FacetConfig);
