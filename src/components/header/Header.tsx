import React from 'react';
import { connect } from 'react-redux';
import AccountMenu from './AccountMenu';
import styled from 'styled-components';
import { StyledProps } from '../../typings/layout';

const logo = require('../../assets/logo.svg');

const StyledHeader = styled.header`
    border-top: .5rem solid ${(props: StyledProps) => props.theme.colors.primary.medium};
    width: 100vw;
    padding: .5rem;
    position: relative;
    background: ${(props: StyledProps) => props.theme.colors.shade.dark}
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