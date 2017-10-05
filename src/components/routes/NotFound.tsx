import React, { PureComponent } from 'react';
import FullHelmet from '../FullHelmet';

interface Props {}
interface State {}

class NotFound extends PureComponent<Props, State> {
    render() {
        return (
            <section>
                <FullHelmet pageName="404" />
                <h1>404, ik denk een foutje</h1>
            </section>
        );
    }
}

export default NotFound;