import React, { SFC } from 'react';
import { ROUTE_PATHS, SUB_ROUTES } from '../../constants/routeNaming';
import styled, { css } from 'styled-components';
import { Link } from '../layout/StyledCopy';
import { lighten } from 'polished';

const menuList = [
    {
        path: '',
        name: 'Account'
    },
    {
        path: SUB_ROUTES.favorites,
        name: 'Favorites'
    },
    {
        path: SUB_ROUTES.dataSets,
        name: 'My datasets'
    },
    {
        path: SUB_ROUTES.pullRequests,
        name: 'Pull requests'
    }
];

interface Props {
    onLogOut: () => void;
    isFooter?: boolean;
}

const AccountMenu: SFC<Props> = ({ onLogOut, isFooter }) => {

    const MenuList = styled.ul` 
        list-style: none;
        margin: 0;
        padding: 0;
        background: ${props => isFooter ? 'transparent' : props.theme.colors.shade.medium};

    ${
        !isFooter
        ?  `position: absolute;
            border-radius: .25rem;
            overflow: hidden;
            width: 100%;
            max-width: 20rem;
            z-index: 2;
            right: 1rem;`
        : ''
    }
`;
    const MenuListItem = styled.li``;

    const MenuLinkStyle = css`
    display: inline-block;
    position: relative;
    cursor: pointer;
    width: 100%;
    color: ${p => isFooter ? '#fff' : 'inherit'};
    padding: ${p => isFooter ? '0' : '.5rem 1rem .5rem 3rem'};
    
    &:before {
        transition: background .2s ease;
        box-shadow: 0 0 .25rem rgba(0,0,0,.2);
        content: ${isFooter ? 'none' : '\'\''};
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background: #fff;
        border-radius: 50%;
        border: 2px solid #fff;
        display: block;
        left: 1rem;
        width: 1rem;
        height: 1rem;
    }
    &:hover {
        background-color: ${props => isFooter ? 'transparent' : lighten(.5, props.theme.colors.shade.dark)};
        color: ${ isFooter ? '#fff' : 'inherit' };
        text-decoration: ${ isFooter ? 'underline' : 'none' };

        &:before {
            background: ${props => isFooter ? 'transparent' : props.theme.colors.primary.medium}
        }
    }
`;

    const MenuListItemLink = styled(Link)`${MenuLinkStyle}`;
    const MenuListItemSpan = styled.span`${MenuLinkStyle}`;

    const renderListItem = ({path, name}) => (
        <MenuListItem key={name}>
            <MenuListItemLink to={ROUTE_PATHS.account + path}>{name}</MenuListItemLink>
        </MenuListItem>
    );

    return (
        <MenuList>
            {menuList.map(renderListItem)}
            <MenuListItem>
                <MenuListItemSpan onClick={onLogOut}>Log out</MenuListItemSpan>
            </MenuListItem>
        </MenuList>
    );
};

export default AccountMenu;