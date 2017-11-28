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
import { connect } from 'react-redux';
import { setFacetConfigItems } from '../../reducers/facetconfig';
import { compose } from 'redux';
import metaDataResolver, { MetaDataProps } from '../../services/metaDataResolver';
import { lifecycle } from 'recompose';
import renderLoader from '../../services/renderLoader';

interface DispatchProps {
    setItems: (configs: IFacetConfig[]) => void;
}

type FullProps = MetaDataProps &
    DispatchProps &
    RouteComponentProps<{ dataSet: string; collection: string }> &
    FormWrapperProps;

const Section = styled.div`
    width: 100%;
    padding-bottom: 3rem;
`;

const FacetConfig: SFC<FullProps> = (props: FullProps) => {
    // const { collection } = this.props.metadata.dataSetMetadata;
    return (
        <Grid smOffset={3} sm={42} xs={46} xsOffset={1}>
            <Section>
                <FullHelmet pageName="View screen" />
                <Title>View screen</Title>
                <DraggableForm configType="facet" onSend={() => alert('NOTIMPL!')} />
            </Section>
        </Grid>
    );
};

const mapDispatchToProps = dispatch => ({
    setItems: (configs: IFacetConfig[]) => dispatch(setFacetConfigItems(configs))
});

export default compose<SFC<{}>>(
    connect(null, mapDispatchToProps),
    withRouter,
    metaDataResolver<FullProps>(QUERY_COLLECTION_PROPERTIES),
    lifecycle({
        componentWillReceiveProps(nextProps: FullProps) {
            const metadata = nextProps.metadata && nextProps.metadata.dataSetMetadata;
            if (metadata && metadata.collection && metadata.collection.indexConfig.facet.length) {
                this.props.setItems(metadata.collection.indexConfig.facet);
            }
        }
    }),
    renderLoader('metadata')
)(FacetConfig);
