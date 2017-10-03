import React, { Component } from 'react';
import FullHelmet from '../FullHelmet';

interface Props {}
interface State {}

class NotFound extends Component<Props, State> {
    render() {
        return (
            <section>
                <FullHelmet pageName="404" />
                <h1>404, ik denk een foutje</h1>

                <h1>Temp dropdown</h1>
            </section>
        );
    }
}

export default NotFound;