import React, { SFC } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import styled from '../../styled-components';
import Caret from '../icons/Caret';
import { BREAKPOINT } from '../layout/Grid';
import { ButtonLink as ButtonLinkBase } from '../layout/Button';
import * as queryString from 'querystring';
import { encode } from '../../services/UrlStringCreator';

interface Props {
    nextCursor?: string;
    prevCursor?: string;
}

const Container = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const Button = ButtonLinkBase.extend`
    margin: 0.25rem;

    @media (max-width: ${BREAKPOINT.MOBILE}) {
        flex: 2;
    }
`;

const Pagination: SFC<Props & RouteComponentProps<any>> = ({ nextCursor, prevCursor, location: { pathname } }) => {
    const { search } = queryString.parse(location.search.substring(1));
    const searchParam = search ? `search=${encode(search)}&` : '';

    return (
        <Container>
            <Button
                data-small={true}
                to={{ pathname, search: `${searchParam}cursor=${prevCursor}` }}
                disabled={!prevCursor}
                replace={true}
            >
                <Caret rotate={true} />
            </Button>
            <Button
                data-small={true}
                to={{ pathname, search: `${searchParam}cursor=${nextCursor}` }}
                disabled={!nextCursor}
                replace={true}
            >
                <Caret />
            </Button>
        </Container>
    );
};

export default withRouter(Pagination);
