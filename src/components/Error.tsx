import React from 'react';
import FullHelmet from './FullHelmet';
import { Title } from './layout/StyledCopy';
import { ErrorReducer } from '../reducers/error';
import { Col, Grid } from './layout/Grid';
import translate from '../services/translate';
import { GRAPH_URI } from '../constants/api';

type Props = ErrorReducer;

function Error({ errors, status, query, variables }: Props) {
    const graphiqlUri =
        GRAPH_URI.substr(0, GRAPH_URI.length - '/v5/graphql'.length) +
        '/static/graphiql?query=' +
        encodeURIComponent(query) +
        '&variables=' +
        encodeURIComponent(JSON.stringify(variables));

    if (process.env.NODE_ENV !== 'production') {
        // the if statement makes sure this is only done in development mode
        // tslint:disable-next-line:no-console
        console.debug('Graphql error: ', graphiqlUri);
    }
    return (
        <Grid xs={36} sm={24} xsOffset={6} smOffset={12}>
            <Col xs={36} sm={24}>
                <FullHelmet pageName="Error" />
                {process.env.NODE_ENV !== 'production' ? (
                    errors
                        .map((error, index) => (
                            <div key={index}>
                                <Title align="center">
                                    {status !== 0 && status} {error.message}
                                </Title>
                                <pre>{error.stack}</pre>
                            </div>
                        ))
                        .concat([
                            <a target="_BLANK" key="link" href={graphiqlUri}>
                                Go to graphiql
                            </a>
                        ])
                ) : (
                    <div>
                        <Title align="center">{translate('error')}</Title>
                        <p>
                            {status === 500
                                ? translate('error.500')
                                : status === 404
                                    ? translate('error.404')
                                    : translate(`network_error`)}
                        </p>
                    </div>
                )}
            </Col>
        </Grid>
    );
}

export default Error;
