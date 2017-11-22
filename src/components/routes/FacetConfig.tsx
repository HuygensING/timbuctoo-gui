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
import { setFacetConfigItems } from '../../reducers/facetconfig';

interface Props {
    setItems: (configs: IFacetConfig[]) => void;
    metadata?: {
        dataSetMetadata: DataSetMetadata;
    };
    loading: boolean;
}

type FullProps = Props & RouteComponentProps<any> & FormWrapperProps;

interface State {
}

const Section = styled.div`
    width: 100%;
    padding-bottom: 3rem;
`;

class FacetConfig extends PureComponent<FullProps, State> {
    componentWillReceiveProps (nextProps: FullProps) {
        const metadata = nextProps.metadata && nextProps.metadata.dataSetMetadata;
        if (metadata && metadata.collection && metadata.collection.indexConfig.facet.length) {
            this.props.setItems(metadata.collection.indexConfig.facet);
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
                        onSend={this.onSubmit}
                    />
                </Section>
            </Grid>
        );
    }

    private onSubmit = (formValues: any[]) => {
        // const query = createQueryStringFromFormFields(formValues);
        // console.log('query', query);
        // console.log(formValues);
        alert('NOTIMPL');
    }
}

const mapDispatchToProps = dispatch => ({
    setItems: (configs: IFacetConfig[]) => dispatch(setFacetConfigItems(configs))
});

export default MetadataResolver(QUERY_COLLECTION_PROPERTIES)(connect(null, mapDispatchToProps)(FacetConfig));