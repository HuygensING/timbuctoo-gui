import React, { SFC } from 'react';
import FullHelmet from '../FullHelmet';
import { Content, Title } from '../layout/StyledCopy';

interface Props {
    error: Error | null;
}

const Error: SFC<Props> = ({ error }) => (
    <section>
        <FullHelmet pageName="Error" />
        <Title align={'center'}>Whoops!</Title>
        {error && error.message && <Content align={'center'}>{error.message}</Content>}
    </section>
);

export default Error;