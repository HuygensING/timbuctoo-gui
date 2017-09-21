import React, { PureComponent } from 'react';
import { match } from 'react-router';
import FullHelmet from '../FullHelmet';

import { Col, FullSection } from '../layout/Grid';

import { DataSets } from '../../typings/timbuctoo/schema';
import { getCollection } from '../../services/GetDataSet';
import connectQuery from '../../services/ConnectQuery';
import QUERY_ENTRY_VALUES from '../../graphql/queries/EntryValues';

import { Component } from '../../typings/timbuctoo/schema';

import ComponentLoader from '../../services/ComponentLoader';
import Loading from '../Loading';

interface Props {
    components: Component[];
    match: match<any>;
}

interface ApolloProps {
    data: {
        dataSets: DataSets;
    };
}

type FullProps = Props & ApolloProps;

interface State {}

class EntryBody extends PureComponent<FullProps, State> {
    render() {
        const { match, components } = this.props;

        const currentCollection = getCollection(this.props, match.params.collection);
        
        if (!currentCollection) { return <Loading/>; }

        return (
            <section>
                <FullHelmet pageName={`Entry - ${match.params.entry}`} />
                <FullSection>
                    <Col>
                        {components && components.map( (component: Component, index: number) => <ComponentLoader key={index} component={component} data={currentCollection} />)}
                    </Col>
                </FullSection>
            </section>
        );
    }
}

export default connectQuery(QUERY_ENTRY_VALUES)(EntryBody);