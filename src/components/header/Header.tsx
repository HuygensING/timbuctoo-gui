import React from 'react';
import { connect } from 'react-redux';
import AccountMenu from './AccountMenu';
import styled from '../../styled-components';
import { ROUTE_PATHS } from '../../constants/routeNaming';
import { Link } from 'react-router-dom';

const logo = require('../../assets/logo-timbuctoo.svg');

const StyledHeader = styled.header`
    border-top: .5rem solid ${(props) => props.theme.colors.primary.medium};
    width: 100vw;
    padding: .5rem;
    position: relative;
    background: ${(props) => props.theme.colors.shade.dark}
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
    return (
        <StyledHeader>
            <Link to={ROUTE_PATHS.root}><StyledImg src={logo} alt="timbuctoo"/></Link>
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