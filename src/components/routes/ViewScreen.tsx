import React, { PureComponent } from 'react';
import { RouteComponentProps } from 'react-router';

import { Grid } from '../layout/Grid';
import FullHelmet from '../FullHelmet';
import { Title } from '../layout/StyledCopy';
// import Loading from '../Loading';

import styled from '../../styled-components';
import connectQuery from '../../services/ConnectQuery';

import QUERY_ENTRY_PROPERTIES from '../../graphql/queries/EntryProperties';

import { ComponentType } from '../../typings/index';
import { FormWrapperProps } from '../../typings/Forms';
import DraggableForm from '../form/DraggableForm';
import { COMPONENTS } from '../../constants/global';

interface ApolloProps {
    data: {
        metadata: any;
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
        __typename: COMPONENTS.title,
        value: {
            isKey: true,
            fields: ['tim_hasLocation', 'skos_altLabel', 'items', 'value']
        }
    },
    {
        __typename: COMPONENTS.keyValue,
        key: {
            isKey: false,
            fields: ['from']
        },
        values: [
            {
                __typename: COMPONENTS.value,
                value: {
                    isKey: true,
                    fields: ['tim_beginDate.value']
                }
            }
        ]
    },
    {
        __typename: COMPONENTS.keyValue,
        key: {
            isKey: false,
            fields: ['to']
        },
        values: [
            {
                __typename: COMPONENTS.value,
                value: {
                    isKey: true,
                    fields: ['tim_endDate.value']
                }
            }
        ]
    }
];

class ViewScreen extends PureComponent<FullProps, State> {
    collectionsAvailable: boolean;
    items: ComponentType[];

    constructor (props: FullProps) {
        super(props);

        this.collectionsAvailable = false;
        this.items = [];

        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps (newProps: FullProps) {
        const knowsMetadata = this.props.data && this.props.data.metadata || newProps.data && newProps.data.metadata;
        const metadataDoesNotMatch = this.props.data.metadata !== newProps.data.metadata;

        if (knowsMetadata && metadataDoesNotMatch) {
            this.onNewDataLoaded(newProps);
        }
    }

    render () {
        // TODO: add when Components are available
        // if (!this.collectionsAvailable) {
        //     return <Loading />;
        // }

        // if (this.items.length === 0) {
        //     return <Title>No collections available :'(</Title>;
        // }

        console.log(fakeItems);

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

    private onSubmit (e: any) {
        console.log(e);
    }

    private onNewDataLoaded (props: FullProps) {
        if (props.data && props.data.metadata && props.data.metadata.collections && props.data.metadata.collections.items) {
            this.collectionsAvailable = true;
            this.items = props.data.metadata.collections.items[0].components.items;
        } else {
            this.collectionsAvailable = false;
        }
    }
}

export default connectQuery(QUERY_ENTRY_PROPERTIES)(ViewScreen);