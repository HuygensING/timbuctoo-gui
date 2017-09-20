import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';

import { DataSets } from '../../typings/timbuctoo/schema';
import connectQuery from '../../services/ConnectQuery';
import QUERY_ENTRY_PROPERTIES from '../../graphql/queries/EntryProperties';

import { getDataSet } from '../../services/GetDataSet';
import EntryBody from '../entry/EntryBody';
import Loading from '../Loading';

interface Props {
}

interface ApolloProps {
    data: {
        dataSets: DataSets;
    };
}

type FullProps = Props & ApolloProps & RouteComponentProps<any>;

interface State {}

class Entry extends Component<FullProps, State> {

    render () {
        const dataSet = getDataSet(this.props);
        if ( !dataSet ) { return <Loading />; }

        console.log( this.props );

        return (
            <EntryBody
                entry={'entry'}
            />
        );
    }
}

export default connectQuery(QUERY_ENTRY_PROPERTIES)(Entry);