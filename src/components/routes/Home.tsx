import React, { Component } from 'react';
import FullHelmet from '../FullHelmet';
import {Title} from '../layout/StyledCopy';

interface Props {}
interface State {}

class Home extends Component<Props, State> {
    render() {
        return (
          <section>
              <FullHelmet pageName="home" />
              <Title>Home</Title>
          </section>
        );
    }
}

export default Home;