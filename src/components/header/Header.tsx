import React from 'react';
import { connect } from 'react-redux';
import AccountMenu from './AccountMenu';
import styled from '../../styled-components';
import { ROUTE_PATHS } from '../../constants/routeNaming';
import { Link } from 'react-router-dom';
import LoginLink from './LoginLink';

const logo = require('../../assets/logo-timbuctoo.svg');

const StyledHeader = styled.header`
    border-top: .5rem solid ${(props) => props.theme.colors.primary.medium};
    width: 100vw;
    padding: .5rem;
    position: relative;
    background: ${(props) => props.theme.colors.shade.dark}
`;

const StyledImg = styled.img`
    margin-left: 1rem;
    height: 2.5rem;
    width: auto;
    display: block;
`;

const Header = ({isLoggedIn, roles}) => {
    return (
        <StyledHeader>
            <Link to={ROUTE_PATHS.root}><StyledImg src={logo} alt="timbuctoo"/></Link>
            {
                isLoggedIn
                    ? <AccountMenu/>
                    : <LoginLink />
            }
        </StyledHeader>
    );
};

const mapStateToProps = state => ({
    isLoggedIn: state.user.loggedIn,
    roles: state.user.roles
});

export default connect(mapStateToProps, {})(Header);