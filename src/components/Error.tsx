import React, { SFC } from 'react';
import FullHelmet from './FullHelmet';
import { Title } from './layout/StyledCopy';
import { ErrorReducer } from '../reducers/error';
import { Col, Grid } from './layout/Grid';
import translate from '../services/translate';

type Props = ErrorReducer;

const Error: SFC<Props> = ({ errors, status }) => (
    <Grid xs={36} sm={24} xsOffset={6} smOffset={12}>
        <Col xs={36} sm={24}>
            <FullHelmet pageName="Error" />
            {process.env.NODE_ENV !== 'production' ? (
                errors.map((error, index) => (
                    <div key={index}>
                        <Title align="center">
                            {status !== 0 && status} {error.message}
                        </Title>
                        <pre>{error.stack}</pre>
                    </div>
                ))
            ) : (
                <div>
                    <Title align="center">{translate('error')}</Title>
                    <p>
                        {status === 500
                            ? translate('error.500')
                            : status === 404 ? translate('error.404') : translate(`network_error`)}
                    </p>
                </div>
            )}
        </Col>
    </Grid>
);

export default Error;
