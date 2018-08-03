import React, { SFC } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

interface Router {
    history: {
        push: (url: string) => void;
    };
}

function routerClick(
    e: React.MouseEvent<HTMLAnchorElement>,
    router: Router,
    clickHandler?: (e: React.MouseEvent<HTMLAnchorElement>) => void,
    target?: string,
    href?: string
) {
    if (clickHandler !== undefined) {
        clickHandler(e);
    }
    if (
        href !== undefined && // there is an url
        !/^[a-zA-Z0-9+.-]+:/.test(href) && // it's to our own site (it's not a fully qualified uri)
        !e.isDefaultPrevented() && // the event hasn't been blocked yet
        target === undefined && // the link does not expect the browser to open it in some other window/tab
        router &&
        router.history && // there is a client side router handling urls
        e.button === 0 && // it was clicked using the primary mouse button without any modifier keys
        !e.metaKey &&
        !e.altKey &&
        !e.ctrlKey &&
        !e.shiftKey
    ) {
        // in that case we'll do a replaceState instead of having the browser do an HTTP GET to our server
        // note that this is simply a performance improvement. If the browser where to do an HTTP GET we'd get the same
        // result albeit a bit slower.
        e.preventDefault();
        router.history.push(href);
    }
}

export const UnstyledAnchor: SFC<React.AnchorHTMLAttributes<HTMLAnchorElement>> = (
    props,
    context: { router: Router }
) => <a {...props} onClick={e => routerClick(e, context.router, props.onClick, props.target, props.href)} />;
UnstyledAnchor.contextTypes = {
    router: PropTypes.shape({
        history: PropTypes.shape({
            push: PropTypes.func.isRequired
        }).isRequired
    })
};

// withProps<ElementProps & StyledCopyLinkProps & LinkProps>(
export const StyledAnchor = styled(UnstyledAnchor)`
    margin: 0;
    font: ${props => props.theme.fonts.body};
    color: ${props => props.theme.colors.black};
    text-decoration: none;

    &:hover {
        color: ${props => props.theme.colors.shade.dark};
    }
`;
