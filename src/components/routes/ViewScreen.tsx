import React, { PureComponent } from 'react';
import { RouteComponentProps } from 'react-router';

import { Grid } from '../layout/Grid';
import FullHelmet from '../FullHelmet';
import { Title } from '../layout/StyledCopy';

import styled from '../../styled-components';

import { FormWrapperProps } from '../../typings/Forms';
// import DraggableForm from '../form/DraggableForm';
import { DataSetMetadata } from '../../typings/schema';
import Loading from '../Loading';
import { createQueryStringFromFormFields } from '../../services/CreateQueryFromValues';
import MetadataResolver from '../MetadataResolver';
import QUERY_COLLECTION_PROPERTIES from '../../graphql/queries/CollectionProperties';

interface Props {
    metadata: {
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

class ViewScreen extends PureComponent<FullProps, State> {

    constructor (props: FullProps) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
    }

    render () {
        // TODO: add when Components are available

        if (this.props.loading) { return <Loading />; }
        // const { collection } = this.props.metadata.dataSetMetadata;
        return (
            <Grid smOffset={3} sm={42} xs={46} xsOffset={1}>
                <Section>
                    <FullHelmet pageName="View screen"/>
                    <Title>View screen</Title>
                    {/*<DraggableForm*/}
                        {/*items={fakeItems}*/}
                        {/*onSend={this.onSubmit}*/}
                    {/*/>*/}
                </Section>
            </Grid>
        );
    }

    private onSubmit (formValues: any[]) {
        const query = createQueryStringFromFormFields(formValues);
        console.log('query', query);
        console.log(formValues);
    }
}

export default MetadataResolver(QUERY_COLLECTION_PROPERTIES)(ViewScreen);
