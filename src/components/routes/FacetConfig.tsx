import React, { PureComponent } from 'react';
import { RouteComponentProps } from 'react-router';

import { Grid } from '../layout/Grid';
import FullHelmet from '../FullHelmet';
import { Title } from '../layout/StyledCopy';

import styled from '../../styled-components';

import { FormWrapperProps } from '../../typings/Forms';
import DraggableForm from '../form/DraggableForm';
import { DataSetMetadata, FacetConfig as IFacetConfig } from '../../typings/schema';
import Loading from '../Loading';
import MetadataResolver from '../MetadataResolver';
import QUERY_COLLECTION_PROPERTIES from '../../graphql/queries/CollectionProperties';
import { connect } from 'react-redux';
import { composeFacets, setFacetConfigItems } from '../../reducers/facetconfig';
import { RootState } from '../../reducers/rootReducer';
import { NormalizedFacetConfig } from '../../typings/index';

interface OwnProps {
    metadata?: {
        dataSetMetadata: DataSetMetadata;
    };
    loading: boolean;
}

interface StateProps {
    normalizedFacets: NormalizedFacetConfig[];
}

interface DispatchProps {
    setItems: (configs: IFacetConfig[], collectionId: string) => void;
}

type Props = OwnProps & StateProps & DispatchProps & RouteComponentProps<{ collection: string }> & FormWrapperProps;

interface State {
}

const Section = styled.div`
    width: 100%;
    padding-bottom: 3rem;
`;

class FacetConfig extends PureComponent<Props, State> {
    componentWillReceiveProps (nextProps: Props) {
        const metadata = nextProps.metadata && nextProps.metadata.dataSetMetadata;
        if (metadata && metadata.collection && metadata.collection.indexConfig.facet.length) {
            this.props.setItems(metadata.collection.indexConfig.facet, this.props.match.params.collection);
        }
    }

    render () {
        // TODO: add when Components are available

        if (this.props.loading) {
            return <Loading/>;
        }
        // const { collection } = this.props.metadata.dataSetMetadata;
        return (
            <Grid smOffset={3} sm={42} xs={46} xsOffset={1}>
                <Section>
                    <FullHelmet pageName="View screen"/>
                    <Title>View screen</Title>
                    <DraggableForm
                        configType="facet"
                        id={0}
                        onSend={this.onSubmit}
                    />
                </Section>
            </Grid>
        );
    }

    private onSubmit = () => {
        const facetconfig = composeFacets(this.props.normalizedFacets);
        console.groupCollapsed('sending facet config:');
        console.log(facetconfig);
        console.groupEnd();
    }
}

const mapStateToProps = (state: RootState) => ({
    normalizedFacets: state.facetconfig
});

const mapDispatchToProps = dispatch => ({
    setItems: (configs: IFacetConfig[], collectionId: string) => dispatch(setFacetConfigItems(configs, collectionId))
});

export default MetadataResolver(QUERY_COLLECTION_PROPERTIES)(connect(mapStateToProps, mapDispatchToProps)(FacetConfig));
