import React, { Component } from 'react';
import styled from '../../styled-components';

import { MenuButtonStyle } from './MenuButtonStyle';
import AccountMenu from './AccountMenu';

interface Props {
    onLogOut: () => void;
}
interface State {
    menuOpen: boolean;
}

const MenuButton = styled.button`${(props) => MenuButtonStyle}`;

class AccountToggle extends Component<Props, State> {
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
        return (
            <section>
                <MenuButton onClick={this.toggleMenu}>Menu</MenuButton>
                {menuOpen && <AccountMenu onLogOut={this.props.onLogOut} />}
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
}

export default AccountToggle;