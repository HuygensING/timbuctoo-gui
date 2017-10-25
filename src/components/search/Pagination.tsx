import React, { SFC } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import styled from '../../styled-components';
import Caret from '../icons/Caret';
import { BREAKPOINT } from '../layout/Grid';
import { ButtonLink as ButtonLinkBase } from '../layout/Button';

interface Props {
    nextCursor?: string;
    prevCursor?: string;
}

const Container = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const Button = ButtonLinkBase.extend`
    margin: .25rem;
    
    @media (max-width: ${BREAKPOINT.MOBILE}) {
        flex: 2;
    }
`;

const Pagination: SFC<Props & RouteComponentProps<any>> = ({ nextCursor, prevCursor, location: { pathname } }) => (
    <Container>
        <Button data-small={true} to={{ pathname, search: `cursor=${prevCursor}` }} disabled={!prevCursor} replace={true}>
            <Caret rotate={true} />
        </Button>
        <Button data-small={true} to={{ pathname, search: `cursor=${nextCursor}` }} disabled={!nextCursor} replace={true}>
            <Caret />
        </Button>
    </Container>
);

export default withRouter(Pagination);
