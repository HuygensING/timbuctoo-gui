import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';

import connectQuery from '../../services/ConnectQuery';
import QUERY_ENTRY_PROPERTIES from '../../graphql/queries/EntryProperties';

import EntryBody from '../entry/EntryBody';

interface Props {
}

interface State {
}

class Entry extends Component<Props & RouteComponentProps<any>, State> {

    render () {
        const { dataSet, entry } = this.props.match.params;

        if (!dataSet || !entry) { return null; }

        console.log( dataSet, entry );

        return (
            <EntryBody
                entry={entry}
            />
        );
    }
}

export default connectQuery(QUERY_ENTRY_PROPERTIES)(Entry);