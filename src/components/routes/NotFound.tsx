import React, { Component } from 'react';
import FullHelmet from '../FullHelmet';

import DropdownForm from '../form/DropdownForm';

interface Props {}
interface State {}

class NotFound extends Component<Props, State> {
    render() {
        return (
            <section>
                <FullHelmet pageName="404" />
                <h1>404, ik denk een foutje</h1>

                <h1>Temp dropdown</h1>
                <DropdownForm title="Options" />
                <DropdownForm title="Options 2" />
                <DropdownForm title="Options 3" />
            </section>
        );
    }
}

export default NotFound;