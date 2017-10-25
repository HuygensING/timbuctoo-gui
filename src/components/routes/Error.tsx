import React, { SFC } from 'react';
import FullHelmet from '../FullHelmet';
import { Content, Title } from '../layout/StyledCopy';

interface Props {
    errorMessage: string | null;
}

const Error: SFC<Props> = ({ errorMessage }) => (
    <section>
        <FullHelmet pageName="Error" />
        <Title align={'center'}>Whoops!</Title>
        <Content align={'center'}>{errorMessage}</Content>
    </section>
);

export default Error;