import React, { Component } from 'react';
import FullHelmet from '../FullHelmet';

class Home extends Component {
    render() {
        return (
          <section>
              <FullHelmet pageName="home" />
              <h1>Home</h1>
          </section>
        );
    }
}

export default Home;