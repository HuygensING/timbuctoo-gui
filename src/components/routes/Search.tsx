import React, { Component } from 'react';
import FullHelmet from '../FullHelmet';
import { Title } from '../layout/StyledCopy';

interface Props {
}

interface State {
}

class Search extends Component<Props, State> {
    render () {
        return (
            <section>
                <FullHelmet pageName="search"/>
                <Title>Search</Title>
            </section>
        );
    }
}

export default Search;