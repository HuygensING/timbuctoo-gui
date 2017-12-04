import React, { SFC } from 'react';
import ErrorComponent from './Error';

const NotFound: SFC<{}> = () => (
    <ErrorComponent errors={[new Error('Not found (router did not match)')]} status={404} />
);

export default NotFound;
