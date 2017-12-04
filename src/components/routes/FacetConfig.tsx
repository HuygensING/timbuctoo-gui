import React, { SFC } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Grid } from '../layout/Grid';
import FullHelmet from '../FullHelmet';
import { Title } from '../layout/StyledCopy';
import styled from '../../styled-components';
import { FormWrapperProps } from '../../typings/Forms';
import DraggableForm from '../form/DraggableForm';
import { FacetConfig as IFacetConfig } from '../../typings/schema';
import QUERY_COLLECTION_PROPERTIES from '../../graphql/queries/CollectionProperties';
import { connect, Dispatch } from 'react-redux';
import { compose } from 'redux';
import { MetaDataProps, default as metaDataResolver } from '../../services/metaDataResolver';
import { lifecycle } from 'recompose';
import renderLoader from '../../services/renderLoader';
import { denormalizeFacets, setFacetConfigItems } from '../../reducers/facetconfig';
import { RootState } from '../../reducers/rootReducer';
import { NormalizedFacetConfig } from '../../typings/index';

interface DispatchProps {
    setItems: (configs: IFacetConfig[]) => void;
}

interface StateProps {
    normalizedFacets: NormalizedFacetConfig[];
}

type FullProps = MetaDataProps &
    DispatchProps &
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

const mapDispatchToProps = (dispatch: Dispatch<FullProps>) => ({
    setItems: (configs: IFacetConfig[], collectionId: string) => dispatch(setFacetConfigItems(configs, collectionId))
});

export default compose<SFC<{}>>(
    withRouter,
    metaDataResolver<FullProps>(QUERY_COLLECTION_PROPERTIES),
    renderLoader('metadata'),
    connect(mapStateToProps, mapDispatchToProps),
    lifecycle<FullProps, {}>({
        componentWillMount() {
            const metadata = this.props.metadata! && this.props.metadata.dataSetMetadata!;
            const facets =
                metadata.collection && metadata.collection.indexConfig.facet.length
                    ? metadata.collection.indexConfig.facet
                    : [];
            this.props.setItems(facets);
        }
    })
)(FacetConfig);
