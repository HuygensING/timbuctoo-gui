import React, { SFC } from 'react';
import FullHelmet from '../FullHelmet';
import { Title } from '../layout/StyledCopy';

interface Props {
    error: Error | null;
}

const Error: SFC<Props> = ({ error }) => (
    <section>
        <FullHelmet pageName="Error" />
        <Title align={'center'}>Whoops!</Title>
        {process.env.NODE_ENV !== 'production' && error && error.stack && <pre>{error.stack}</pre>}
    </section>
);

export default Error;
