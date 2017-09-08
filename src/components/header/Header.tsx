import React from 'react';
import { connect } from 'react-redux';
import AccountMenu from './AccountMenu';
import styled from '../../styled-components';
import { ROUTE_PATHS } from '../../constants/routeNaming';
import { Link } from 'react-router-dom';
import LoginLink from './LoginLink';
import { LogOutUser } from '../../reducers/user';
import CreateElementWithTag from '../../services/CreateElementWithTag';

const logo = require('../../assets/logo-timbuctoo.svg');

const StyledHeader = styled((props: {height: string}) => CreateElementWithTag(props, 'header'))`
    border-top: .5rem solid ${(props) => props.theme.colors.primary.medium};
    width: 100vw;
    padding: .5rem;
    position: fixed;
    top: 0;
    height: ${props => props.height};
    background: ${(props) => props.theme.colors.shade.dark};
    z-index: 100;
`;

const StyledLink = styled(Link)`
    display: inline-block;
`;

const StyledImg = styled.img`
    margin-left: 1rem;
    height: 2.5rem;
    display: inline-block;
`;

interface Props {
    height: string;
    isLoggedIn: boolean;
    onLogOut: () => void;
}

const Header = ({isLoggedIn, onLogOut, height}: Props) => {
    return (
        <StyledHeader height={height}>
            <StyledLink to={ROUTE_PATHS.root}><StyledImg src={logo} alt="timbuctoo"/></StyledLink>
            {
                isLoggedIn
                    ? <AccountMenu onLogOut={onLogOut} />
                    : <LoginLink />
            }
        </StyledHeader>
    );
};

const mapStateToProps = state => ({
    isLoggedIn: state.user.loggedIn
});

const mapDispatchToProps = dispatch => ({
    onLogOut: () => dispatch(LogOutUser())
});
export default connect(mapStateToProps, mapDispatchToProps)(Header);