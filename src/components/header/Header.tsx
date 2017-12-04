import React, { SFC } from 'react';
import { connect, Dispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled, { withProps } from '../../styled-components';
import { ROUTE_PATHS } from '../../constants/routeNaming';
import { LogOutUser, UserReducer } from '../../reducers/user';
import AccountMenu from './AccountMenu';
import { RootState } from '../../reducers/rootReducer';
import { compose } from 'redux';
import { HEADER_HEIGHT } from '../../constants/global';

const logo = require('../../assets/logo-timbuctoo.svg');

const StyledHeader = withProps<{ height: string }>(styled.header)`
    border-top: 0.5rem solid ${props => props.theme.colors.primary.medium};
    width: 100vw;
    padding: 0.5rem;
    position: fixed;
    top: 0;
    height: ${props => props.height};
    background: ${props => props.theme.colors.black};
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

const Header: SFC<Props> = ({ user, onLogOut }) => {
    return (
        <StyledHeader height={HEADER_HEIGHT}>
            <StyledLink to={ROUTE_PATHS.root}>
                <StyledImg src={logo} alt="timbuctoo" />
            </StyledLink>
            <AccountMenu user={user} onLogOut={onLogOut} />
        </StyledHeader>
    );
};

const mapStateToProps = (state: RootState) => ({
    user: state.user
});

const mapDispatchToProps = (dispatch: Dispatch<Props>) => ({
    onLogOut: () => dispatch(LogOutUser())
});

export default compose<SFC<{}>>(connect(mapStateToProps, mapDispatchToProps))(Header);
