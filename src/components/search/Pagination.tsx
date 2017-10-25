import React, { SFC } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { RouteComponentProps, withRouter } from 'react-router';
import styled, { withProps } from '../../styled-components';
import Caret from '../icons/Caret';
import { BREAKPOINT } from '../layout/Grid';
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

interface ButtonProps {
    disabled?: boolean;
}

const Button = withProps<ButtonProps & LinkProps>(styled(Link))`
    padding: 0.25rem 0.5rem;
    border: 1px solid ${props => props.theme.colors.black};
    border-radius: .15rem;
    font: ${props => props.theme.fonts.body};
    color: ${props => props.theme.colors.black};
    pointer-events: ${props => props.disabled ? 'none' : 'auto'};
    opacity: ${props => props.disabled ? 0.4 : 1};
    margin: .25rem;
    text-align: center;
    
    &:hover {
        color: ${props => props.theme.colors.black};
        background-color: ${props => props.theme.colors.shade.light};
    }
    
    @media (max-width: ${BREAKPOINT.MOBILE}) {
        flex: 2;
    }
`;

const Pagination: SFC<Props & RouteComponentProps<any>> = ({ nextCursor, prevCursor, location: { pathname } }) => {
    const { search } = queryString.parse(location.search.substring(1));
    const searchParam = search ? `search=${encode(search)}&` : '';

    return (
        <Container>
            <Button to={{ pathname, search: `${searchParam}cursor=${prevCursor}` }} disabled={!prevCursor}>
                <Caret rotate={true}/>
            </Button>
            <Button to={{ pathname, search: `${searchParam}cursor=${nextCursor}` }} disabled={!nextCursor}>
                <Caret/>
            </Button>
        </Container>
    );
};

export default withRouter(Pagination);