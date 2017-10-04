import React, { PureComponent } from 'react';
import { RouteComponentProps } from 'react-router';

import { Grid } from '../layout/Grid';
import FullHelmet from '../FullHelmet';
import { Title } from '../layout/StyledCopy';
// import Loading from '../Loading';

import styled from '../../styled-components';
import connectQuery from '../../services/ConnectQuery';

import QUERY_ENTRY_PROPERTIES from '../../graphql/queries/EntryProperties';

import { FormWrapperProps } from '../../typings/Forms';
import DraggableForm from '../form/DraggableForm';
import { COMPONENTS } from '../../constants/global';
import { CollectionMetadata } from '../../typings/timbuctoo/schema';
import Loading from '../Loading';
import { createQueryStringFromFormFields } from '../../services/CreateQueryFromValues';

interface ApolloProps {
    data: {
        dataSetMetadata: any;
    };
}

type FullProps = ApolloProps & RouteComponentProps<any> & FormWrapperProps;

interface State {
}

const Section = styled.div`
    width: 100%;
    padding-bottom: 3rem;
`;

const fakeItems: any[] = [
    {
        type: COMPONENTS.title,
        value: {
            fields: [{
                value: 'tim_hasLocation',
                referenceType: 'clusius_Residence'
            }, {
                value: 'tim_name',
                referenceType: null
            }]
        }
    },
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
                        referenceType: 'clusius_Persons'
                    }, {
                        value: 'tim_gender',
                        referenceType: null
                    }]
                }
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
                        referenceType: 'clusius_Persons'
                    }, {
                        value: 'tim_hasBirthPlace',
                        referenceType: 'clusius_Places'
                    }, {
                        value: 'tim_country',
                        referenceType: null
                    }]
                }
            }
        ]
    }
];

class ViewScreen extends PureComponent<FullProps, State> {
    collectionsAvailable: boolean;
    collection: CollectionMetadata | null;

    constructor (props: FullProps) {
        super(props);

        this.collectionsAvailable = false;
        this.collection = null;

        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps (newProps: FullProps) {
        const knowsMetadata = this.props.data && this.props.data.dataSetMetadata || newProps.data && newProps.data.dataSetMetadata;
        const metadataDoesNotMatch = this.props.data.dataSetMetadata !== newProps.data.dataSetMetadata;

        if (knowsMetadata && metadataDoesNotMatch) {
            this.onNewDataLoaded(newProps);
        }
    }

    render () {
        // TODO: add when Components are available
        if (!this.collection) { return <Loading />; }
        // if (!this.collectionsAvailable) {
        //     return <Loading />;
        // }

        // if (this.items.length === 0) {
        //     return <Title>No collections available : '(</Title>;
        // }

        // replace fakeItems with this.collection.components.items;
        
        return (
            <Grid smOffset={3} sm={42} xs={46} xsOffset={1}>
                <Section>
                    <FullHelmet pageName="View screen"/>
                    <Title>View screen</Title>
                    <DraggableForm
                        items={fakeItems}
                        onSend={this.onSubmit}
                    />
                </Section>
            </Grid>
        );
    }

    private onSubmit (formValues: any[]) {
        const query = createQueryStringFromFormFields(formValues);
        console.log(query);
    }

    private onNewDataLoaded (props: FullProps) {
        if (props.data && props.data.dataSetMetadata && props.data.dataSetMetadata.collections && props.data.dataSetMetadata.collections.items) {
            this.collectionsAvailable = true;
            this.collection = props.data.dataSetMetadata.collections.items[0];
        } else {
            this.collectionsAvailable = false;
        }
    }
}

export default connectQuery(QUERY_ENTRY_PROPERTIES)(ViewScreen);