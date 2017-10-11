import React, { PureComponent } from 'react';
import styled from '../../styled-components';
import { MenuItemProp } from '../../typings';
import { LOGIN_URL } from '../../constants/api';
import { Subtitle } from '../layout/StyledCopy';
import AvatarButton from './AvatarButton';
import Tooltip, { ALIGN } from '../Tooltip';
import { MENU_ITEMS } from '../../constants/global';
import AccountMenuItem from './AccountMenuItem';
import Avatar, { SIZE } from './Avatar';
import Logout from '../icons/Logout';
import { UserReducer } from '../../reducers/user';

interface Props {
    user: UserReducer;
    onLogOut: () => void;
}

interface State {
    isOpen: boolean;
}

const LoginButton = styled.a`
    margin-top: 0;
    padding: 0.25rem 0.5rem;
    border: 1px solid ${props => props.theme.colors.white};
    border-radius: .15rem;
    font: ${props => props.theme.fonts.body};
    color: ${props => props.theme.colors.white};
    background-color: ${props => props.theme.colors.black};
    
    &:hover {
        color: ${props => props.theme.colors.black};
        background-color: ${props => props.theme.colors.shade.light};
    }
`;

const AccountContainer = styled.div`
    position: absolute;
    top: 0;
    right: 2rem;
    height: 1.5rem;
    bottom: 0;
    margin: auto;
`;

const MenuHeader = styled.div`
    position: relative;
    padding: 1rem;
`;

const AvatarContainer = styled.figure`
    position: absolute;
    top: 0;
    right: 0;
`;

class AccountMenu extends PureComponent<Props, State> {
    state = {
        isOpen: false
    };
    
    renderLoginButton() {
        return <LoginButton href={LOGIN_URL}>Login</LoginButton>;
    }

    renderAvatarButton() {
        const { user } = this.props;
        return <AvatarButton user={user} onClick={this.onAvatarClickHandler}/>;
    }

    renderMenu() {
        const { user, onLogOut } = this.props;
        return (
            <Tooltip align={ALIGN.right} alignOffset={'-0.5rem'} interactable={true}>
                <MenuHeader>
                    <Subtitle>{user.name}</Subtitle>
                    <AvatarContainer>
                        <Avatar size={SIZE.large} src={user.avatar}/>
                    </AvatarContainer>
                </MenuHeader>
                <ul>
                    {
                        MENU_ITEMS.map((item: MenuItemProp, idx: number) => (
                            <AccountMenuItem key={idx} to={item.path} icon={item.icon}>{item.name}</AccountMenuItem>
                        ))
                    }
                    <AccountMenuItem icon={Logout} onClick={onLogOut}>Log out</AccountMenuItem>
                </ul>
            </Tooltip>
        );
    }

    render() {
        const { loggedIn } = this.props.user;
        const { isOpen } = this.state;
        return (
            <AccountContainer>
                {loggedIn ? this.renderAvatarButton() : this.renderLoginButton()}
                {loggedIn && isOpen && this.renderMenu()}
            </AccountContainer>
        );
    }

    private onAvatarClickHandler = (e: any) => {
        const isOpen = !this.state.isOpen;
        this.setState({ isOpen });
    }
}

export default AccountMenu;