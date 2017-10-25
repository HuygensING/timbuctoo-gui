import React, { SFC } from 'react';
import FullHelmet from '../FullHelmet';
import { Content, Title } from '../layout/StyledCopy';
import translate from '../../services/translate';

interface Props {}

const NotFound: SFC<Props> = () => (
    <section>
        <FullHelmet pageName="404" />
        <Title align={'center'}>404</Title>
        <Content align={'center'}>{translate('404.not_found')}</Content>
    </section>
);

export default NotFound;