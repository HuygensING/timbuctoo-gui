import React, { SFC } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from '../../styled-components';
import { ROUTE_PATHS } from '../../constants/routeNaming';
import { LogOutUser } from '../../reducers/user';
import { UserReducer } from '../../typings/store';
import CreateElementWithTag from '../../services/CreateElementWithTag';
import AccountMenu from './AccountMenu';
// import LoginLink from './LoginLink';
// import AccountToggle from './AccountToggle';

const logo = require('../../assets/logo-timbuctoo.svg');

const StyledHeader = styled((props: {height: string}) => CreateElementWithTag(props, 'header'))`
    border-top: .5rem solid ${(props) => props.theme.colors.primary.medium};
    width: 100vw;
    padding: .5rem;
    position: fixed;
    top: 0;
    height: ${props => props.height};
    background: ${(props) => props.theme.colors.black};
    backface-visibility: hidden;
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
    user: UserReducer;
    onLogOut: () => void;
}

const Header: SFC<Props> = ({user, onLogOut, height}) => {
    return (
        <StyledHeader height={height}>
            <StyledLink to={ROUTE_PATHS.root}><StyledImg src={logo} alt="timbuctoo"/></StyledLink>
            <AccountMenu user={user} onLogOut={onLogOut} />
        </StyledHeader>
    );
};

const mapStateToProps = state => ({
    user: state.user
});

const mapDispatchToProps = dispatch => ({
    onLogOut: () => dispatch(LogOutUser())
});
export default connect(mapStateToProps, mapDispatchToProps)(Header);