import React, { SFC } from 'react';
import { connect, Dispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import styled, { withProps } from '../../styled-components';
import { ROUTE_PATHS } from '../../constants/routeNaming';
import { LogOutUser, UserReducer } from '../../reducers/user';
import AccountMenu from './AccountMenu';
import { RootState } from '../../reducers/rootReducer';
import { compose } from 'redux';
import { HEADER_HEIGHT } from '../../constants/global';
import { RouteComponentProps } from 'react-router';
import { Link } from '../layout/StyledCopy';

const logo = require('../../assets/logo-timbuctoo.svg');

const StyledHeader = withProps<{ height: string }>(styled.header)`
    border-top: 0.5rem solid ${props => props.theme.colors.primary.medium};
    display: flex;
    width: 100vw;
    padding: 0.5rem;
    position: fixed;
    top: 0;
    height: ${props => props.height};
    background: ${props => props.theme.colors.black};
    backface-visibility: hidden;
    z-index: 100;
`;

const StyledLink = styled(RouterLink)`
    display: inline-block;
`;

const DataSetLink = Link.extend`
    display: inline-block;
    color: ${props => props.theme.colors.white};
    border: 1px solid ${props => props.theme.colors.shade.medium};
    border-radius: 0.125rem;
    padding: 0.25rem 0.5rem;
    align-self: center;
    margin-left: 0.5rem;
    transition: all 0.2s ease;

    &:hover {
        color: ${props => props.theme.colors.primary.light};
        border-color: ${props => props.theme.colors.primary.light};
    }
`;

const StyledImg = styled.img`
    margin-left: 1rem;
    height: 2.5rem;
    display: inline-block;
`;

interface StateProps {
    user: UserReducer;
    routing: { location: Location } | null;
}

interface DispatchProps {
    onLogOut: () => void;
}

type FullProps = StateProps & DispatchProps & RouteComponentProps<any>;

const regex = new RegExp(`${ROUTE_PATHS.details}|${ROUTE_PATHS.edit}|${ROUTE_PATHS.search}`);
const getDataSetFromRoute = (location: Location | null): { key: string; value: string } | null => {
    if (location && location.pathname) {
        const locationList = location.pathname.split('/');

        for (const [idx, segment] of locationList.entries()) {
            if (segment.search(regex) > -1) {
                const activeDataSet = locationList[idx + 1];
                const activeDataSetList = activeDataSet.split('__');

                return {
                    key: activeDataSetList[1] || `...${activeDataSet.substr(-10)}`,
                    value: activeDataSet
                };
            }
        }
    }
    return null;
};

const Header: SFC<FullProps> = ({ user, onLogOut, routing }) => {
    const dataSetName = getDataSetFromRoute(routing ? routing.location : null);

    return (
        <StyledHeader height={HEADER_HEIGHT}>
            <StyledLink to={ROUTE_PATHS.root}>
                <StyledImg src={logo} alt="timbuctoo" />
            </StyledLink>
            {dataSetName && (
                <DataSetLink to={`/${ROUTE_PATHS.details}/${dataSetName.value}`}>dataset {dataSetName.key}</DataSetLink>
            )}
            <AccountMenu user={user} onLogOut={onLogOut} />
        </StyledHeader>
    );
};

const mapStateToProps = (state: RootState) => ({
    user: state.user,
    routing: state.routing
});

const mapDispatchToProps = (dispatch: Dispatch<FullProps>) => ({
    onLogOut: () => dispatch(LogOutUser())
});

export default compose<SFC<{}>>(connect(mapStateToProps, mapDispatchToProps))(Header);
