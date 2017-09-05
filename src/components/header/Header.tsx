import React from 'react';
import { connect } from 'react-redux';
import AccountMenu from './AccountMenu';
import styled from 'styled-components';
import { ThemeProps } from '../../typings/layout';

const logo = require('../../assets/logo.svg');

const StyledHeader = styled.header`
    width: 100vw;
    height: 3.75rem;
    position: relative;
    background: ${(props: {theme?: ThemeProps, children?: JSX.Element[]}) => props.theme.colors.shade.dark}
`;

const StyledImg = styled.img`
    height: 3.75rem;
    width: auto;
    display: block;
`;

const LoginLink = styled.a`
    position: absolute;
    right: 1rem;
    top: 50%;
    color: #fff;
    text-decoration: none;
    transform: translateY(-50%);
`;

const Header = ({isLoggedIn, roles}) => {
    console.log(roles);
    return (
        <StyledHeader>
            <StyledImg src={logo} alt="timbuctoo"/>
            {
                isLoggedIn
                    ? <AccountMenu />
                    : <LoginLink href="#">Login</LoginLink>
            }
        </StyledHeader>
    );
};

const mapStateToProps = state => ({
    isLoggedIn: state.user.loggedIn,
    roles: state.user.roles
});

export default connect(mapStateToProps, {})(Header);