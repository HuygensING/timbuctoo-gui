import React, { SFC } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Grid } from '../layout/Grid';
import FullHelmet from '../FullHelmet';
import { Title } from '../layout/StyledCopy';
import styled from '../../styled-components';
import { FormWrapperProps } from '../../typings/Forms';
import DraggableForm from '../form/DraggableForm';
import QUERY_COLLECTION_PROPERTIES from '../../graphql/queries/CollectionProperties';
import { compose } from 'redux';
import metaDataResolver, { MetaDataProps } from '../../services/metaDataResolver';
import renderLoader from '../../services/renderLoader';
import graphToState from '../../services/graphToState';

type FullProps = MetaDataProps & RouteComponentProps<{ dataSet: string; collection: string }> & FormWrapperProps;

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

export default compose<SFC<{}>>(
    withRouter,
    metaDataResolver<FullProps>(QUERY_COLLECTION_PROPERTIES),
    graphToState<FullProps>('GRAPH_TO_FACETCONFIG', 'metadata'),
    renderLoader('metadata')
)(FacetConfig);
