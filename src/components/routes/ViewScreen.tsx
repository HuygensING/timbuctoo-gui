import React, { PureComponent } from 'react';
import { RouteComponentProps } from 'react-router';
import { arrayMove } from 'react-sortable-hoc';

import { Grid } from '../layout/Grid';
import FullHelmet from '../FullHelmet';
import { Title } from '../layout/StyledCopy';
import FormWrapper from '../form/FormWrapper';
import Loading from '../Loading';
import SortableList from '../SortableList';
import DraggableAccordeon from '../DraggableAccordeon';

import styled from '../../styled-components';
import connectQuery from '../../services/ConnectQuery';
import { getDataSet } from '../../services/GetDataSet';

import QUERY_ENTRY_PROPERTIES from '../../graphql/queries/EntryProperties';

// import { CollectionMetadata } from '../../typings/timbuctoo/schema';
import { ComponentType } from '../../typings/index';

interface ApolloProps {
    data: any;
}

type FullProps = ApolloProps & RouteComponentProps<any>;

interface State {
    items: ComponentType[];
    openedIndex: number | null;
}

const Section = styled.div`
  width: 100%;
`;

class ViewScreen extends PureComponent<FullProps, State> {
    dataSetAvailable: boolean;
    collectionsAvailable: boolean;

    constructor (props: FullProps) {
        super(props);

        this.dataSetAvailable = false;
        this.collectionsAvailable = false;

        this.state = {
            items: [],
            openedIndex: null
        };

        this.openCloseFn = this.openCloseFn.bind(this);
        this.onSortEnd = this.onSortEnd.bind(this);
    }

    componentWillReceiveProps (newProps: FullProps) {
        const knowsDataSet = this.props.data && this.props.data.dataSets || newProps.data && newProps.data.dataSets;
        const dataSetDoesNotMatch = this.props.data.dataSets !== newProps.data.dataSets;

        if (knowsDataSet && dataSetDoesNotMatch) {
            this.onNewDataLoaded(newProps);
        }

    }

    onSortEnd ({oldIndex, newIndex}: { oldIndex: number, newIndex: number }) {
        this.setState(
            {
                items: arrayMove(this.state.items, oldIndex, newIndex)
            }
        );
    }

    openCloseFn (idx: number) {
        console.log(idx);
        this.setState({openedIndex: idx});
    }

    render () {
        const {items, openedIndex} = this.state;

        if (!this.dataSetAvailable) {
            return <Loading/>;
        }
        if (!this.collectionsAvailable) {
            return <Title>No collections available :'(</Title>;
        }

        return (
            <Grid smOffset={3} sm={42} xs={46} xsOffset={1}>
                <Section>
                    <FullHelmet pageName="View screen"/>
                    <Title>View screen</Title>
                    <FormWrapper>
                        <SortableList
                            openCloseFn={this.openCloseFn}
                            items={items}
                            openedIndex={openedIndex}
                            Component={DraggableAccordeon}

                            onSortEnd={this.onSortEnd}
                            useDragHandle={false}
                            axis={'y'}
                        />
                    </FormWrapper>
                </Section>
            </Grid>
        );
    }

    private setCollectionIfAvailable (collectionList: any[]) {
        if (collectionList.length === 0) {
            this.collectionsAvailable = false;
        } else {
            this.collectionsAvailable = true;

            const {items} = collectionList[0].components;
            this.setState({items});
        }
    }

    private onNewDataLoaded (props: FullProps) {
        const dataSet = getDataSet(props);

        if (!dataSet) {
            this.dataSetAvailable = false;
        } else {
            this.dataSetAvailable = true;

            const collectionList = dataSet.metadata.collections.items;
            this.setCollectionIfAvailable(collectionList);
        }
    }
}

export default connectQuery(QUERY_ENTRY_PROPERTIES)(ViewScreen);