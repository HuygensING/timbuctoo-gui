import React, { PureComponent } from 'react';
import FullHelmet from '../FullHelmet';

interface Props {
    entry: string;
}

interface State {

}

class EntryBody extends PureComponent<Props, State> {
    render() {
        const { entry } = this.props;
        return (
            <section>
                <FullHelmet pageName={`Entry - ${entry}`} />
            </section>
        );
    }
}

export default EntryBody;