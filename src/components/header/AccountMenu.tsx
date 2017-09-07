import React, { Component } from 'react';
import styled, { css } from '../../styled-components';
import { lighten } from 'polished';

import { MenuButtonStyle } from './MenuButtonStyle';
import { Link } from '../layout/StyledCopy';
import { ROUTE_PATHS, SUB_ROUTES } from '../../constants/routeNaming';

interface Props {
    onLogOut: () => void;
}
interface State {
    menuOpen: boolean;
}

const MenuButton = styled.button`${(props) => MenuButtonStyle}`;
const MenuList = styled.ul`
    position: absolute;
    background: ${props => props.theme.colors.shade.medium};
    border-radius: .25rem;
    overflow: hidden;
    width: 100%;
    max-width: 20rem;
    z-index: 2;
    list-style: none;
    margin: 0;
    padding: 0;
    right: 1rem;
`;
const MenuListItem = styled.li``;

const MenuLinkStyle = css`
    display: inline-block;
    position: relative;
    padding: .5rem 1rem .5rem 3rem;
    cursor: pointer;
    width: 100%;
    
    &:hover {
        background-color: ${props => lighten(.5, props.theme.colors.shade.dark)}; 
        
        &:before {
            background: ${props => props.theme.colors.primary.medium}
        }
    }
    
    &:before {
        transition: background .2s ease;
        box-shadow: 0 0 .25rem rgba(0,0,0,.2);
        content: '';
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
`;

const MenuListItemLink = styled(Link)`${MenuLinkStyle}`;
const MenuListItemSpan = styled.span`${MenuLinkStyle}`;

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

class AccountMenu extends Component<Props, State> {
    constructor() {
        super();

        this.state = {
            menuOpen: false
        };

        this.toggleMenu = this.toggleMenu.bind(this);
        this.onLogOut = this.onLogOut.bind(this);
    }

    render () {
        const { menuOpen } = this.state;

        console.log(menuOpen);

        return (
            <section>
                <MenuButton onClick={this.toggleMenu}>Menu</MenuButton>
                {menuOpen && this.renderMenu()}
            </section>
        );
    }

    private toggleMenu () {
        this.setState({
            menuOpen: !this.state.menuOpen
        });
    }

    private onLogOut () {
        this.props.onLogOut();
    }

    private renderListItem = ({path, name}) => (
        <MenuListItem key={name}>
            <MenuListItemLink to={ROUTE_PATHS.account + path}>{name}</MenuListItemLink>
        </MenuListItem>
    );

    private renderMenu () {
        return (
            <MenuList>
                {menuList.map(this.renderListItem)}
                <MenuListItem>
                    <MenuListItemSpan onClick={this.onLogOut}>Log out</MenuListItemSpan>
                </MenuListItem>
            </MenuList>
        );
    }
}

export default AccountMenu;