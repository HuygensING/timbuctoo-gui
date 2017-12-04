import React, { SFC } from 'react';
import FullHelmet from '../FullHelmet';
import { Title } from '../layout/StyledCopy';
import { Errors } from '../../reducers/error';
import { Col, Grid } from '../layout/Grid';

interface Props {
    errors: Errors;
}

const Error: SFC<Props> = ({ errors }) => (
    <Grid xs={36} sm={24} xsOffset={6} smOffset={12}>
        <Col xs={36} sm={24}>
            <FullHelmet pageName="Error" />
            {process.env.NODE_ENV !== 'production' &&
                errors.map((error, index) => (
                    <div key={index}>
                        <Title align="center">{error.message}</Title>
                        <pre>{error.stack}</pre>
                    </div>
                ))}
        </Col>
    </Grid>
);

export default Error;
