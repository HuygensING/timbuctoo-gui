import React, { Component } from 'react';
import FullHelmet from '../FullHelmet';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Hero from '../hero/Hero';

interface Props {
    data?: any;
}

interface State {
}

class Home extends Component<Props, State> {
    render () {
        const { data } = this.props;
        return (
            <section>
                <FullHelmet pageName="home"/>
                <Hero search={true} />
                <pre>{JSON.stringify( data, null, 4)}</pre>
            </section>
        );
    }
}

const query = gql`
    query Places {
        __schema {
            types {
                kind,
                name,
                possibleTypes {
                    name
                    description
                }
            }
        }
    }
`;

export default graphql(query)(Home);