import React, { PureComponent } from 'react';
import { RouteComponentProps } from 'react-router';

import { Grid } from '../layout/Grid';
import FullHelmet from '../FullHelmet';
import { Title } from '../layout/StyledCopy';

import styled from '../../styled-components';

import { FormWrapperProps } from '../../typings/Forms';
import DraggableForm from '../form/DraggableForm';
import { Component, DataSetMetadata } from '../../typings/schema';
import Loading from '../Loading';
import MetadataResolver, { ResolvedApolloProps } from '../MetadataResolver';
import QUERY_COLLECTION_PROPERTIES from '../../graphql/queries/CollectionProperties';
import { COMPONENTS } from '../../constants/global';
import { setTree } from '../../reducers/viewconfig';
import { connect } from 'react-redux';

interface Props {
    setTree: (components: Component[]) => void;
}

type FullProps = Props & ResolvedApolloProps<{ dataSetMetadata: DataSetMetadata }, any, any> & RouteComponentProps<any> & FormWrapperProps;

interface State {
}

const Section = styled.div`
    width: 100%;
    padding-bottom: 3rem;
`;

const exampleData: Component[] = [
    {
        type: COMPONENTS.title,
        value: {
            fields: []
        }
    },
    {
        type: COMPONENTS.keyValue,
        key: {
            field: 'from'
        },
        values: [
            {
                type: COMPONENTS.keyValue,
                key: {
                    field: 'from'
                },
                values: [
                    {
                        type: COMPONENTS.keyValue,
                        key: {
                            field: 'from'
                        },
                        values: [
                            {
                                type: COMPONENTS.value,
                                value: {
                                    fields: [{
                                        value: 'tim_hasResident',
                                        reference: 'clusius_Persons'
                                    }, {
                                        value: 'tim_gender',
                                    }]
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        type: COMPONENTS.keyValue,
        key: {
            field: 'to'
        },
        values: [
            {
                type: COMPONENTS.value,
                value: {
                    fields: [{
                        value: 'tim_hasResident',
                        reference: 'clusius_Persons'
                    }, {
                        value: 'tim_hasBirthPlace',
                        reference: 'clusius_Places'
                    }, {
                        value: 'tim_country',
                    }]
                }
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

    private onSubmit = (formValues: any[]) => {
        // const query = createQueryStringFromFormFields(formValues);
        // console.log('query', query);
        // console.log(formValues);
        alert('NOTIMPL');
    }
}

const mapDispatchToProps = dispatch => ({
    setTree: (components: Component[]) => dispatch(setTree(components))
});

export default MetadataResolver(QUERY_COLLECTION_PROPERTIES)(connect(null, mapDispatchToProps)(ViewScreen));
