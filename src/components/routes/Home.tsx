import React, { Component } from 'react';
import FullHelmet from '../FullHelmet';

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
                <Hero search={true} />
            </section>
        );
    }
}

export default Home;