import React, { Component } from 'react';
import FullHelmet from '../FullHelmet';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Hero from '../hero/Hero';

interface Props {
}

interface State {
}

class Home extends Component<Props, State> {
    render () {
        return (
            <section>
                <FullHelmet pageName="home"/>
                <Hero search={true}/>
            </section>
        );
    }
}

const query = gql`
    query {
        __schema {
            types {
                kind
            }
        }
    }
`;

export default graphql(query)(Home);