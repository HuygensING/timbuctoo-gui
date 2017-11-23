import React, { PureComponent } from 'react';
import { RouteComponentProps } from 'react-router';

import { Grid } from '../layout/Grid';
import FullHelmet from '../FullHelmet';
import { Title } from '../layout/StyledCopy';

import styled from '../../styled-components';

import { FormWrapperProps } from '../../typings/Forms';
import DraggableForm from '../form/DraggableForm';
import { ComponentConfig, DataSetMetadata } from '../../typings/schema';
import Loading from '../Loading';
import MetadataResolver, { ResolvedApolloProps } from '../MetadataResolver';
import QUERY_COLLECTION_PROPERTIES from '../../graphql/queries/CollectionProperties';
import { setTree } from '../../reducers/viewconfig';
import { connect } from 'react-redux';

interface DispatchProps {
    setTree: (components: ComponentConfig[]) => void;
}

type FullProps = DispatchProps & ResolvedApolloProps<{ dataSetMetadata: DataSetMetadata }, any, any> & RouteComponentProps<{ collection: string }> & FormWrapperProps;

interface State {
}

const Section = styled.div`
    width: 100%;
    padding-bottom: 3rem;
`;

const exampleData: ComponentConfig[] = [
    {
        type: 'TITLE',
        formatter: [],
        subComponents: [
            {
                type: 'LITERAL',
                formatter: [],
                value: 'Dit is mijn titel'
            }
        ]
    },
    {
        type: 'PATH',
        formatter: [],
        value: ''
    },
    {
        type: 'KEYVALUE',
        formatter: [],
        value: 'from',
        subComponents: [
            {
                type: 'KEYVALUE',
                formatter: [],
                value: 'from',
                subComponents: [
                    {
                        type: 'KEYVALUE',
                        formatter: [],
                        value: 'from',
                        subComponents: [
                            {
                                type: 'PATH',
                                formatter: [],
                                value: ''
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        type: 'KEYVALUE',
        formatter: [],
        subComponents: [
            {
                type: 'PATH',
                formatter: [],
                value: ''
            }
        ]
    }
];

class ViewScreen extends PureComponent<FullProps, State> {
    componentWillMount () {
        this.props.setTree(exampleData);
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
                        id={0}
                        configType="view"
                        onSend={this.onSubmit}
                    />
                </Section>
            </Grid>
        );
    }

    private onSubmit = () => {
        // const query = createQueryStringFromFormFields(formValues);
        // console.log('query', query);
        // console.log(formValues);
        alert('NOTIMPL');
    }
}

const mapDispatchToProps = (dispatch, { match }: RouteComponentProps<{ collection: string }>) => ({
    setTree: (components: ComponentConfig[]) => dispatch(setTree(components, match.params.collection))
});

export default MetadataResolver(QUERY_COLLECTION_PROPERTIES)(
    connect(null, mapDispatchToProps)(ViewScreen)
);
