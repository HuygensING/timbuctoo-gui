import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { ROUTE_PATHS } from '../constants/routeNaming';
import { RouteProps } from 'react-router';
import { RootState } from '../reducers/rootReducer';

const mapStateToProps = (state: RootState) => ({
    loggedIn: state.user.loggedIn
});

interface StateProps {
    loggedIn: boolean;
}

type FullProps = StateProps & RouteProps;

const PrivateRoute = ({ component, loggedIn, ...rest }: FullProps) => {
    const Comp = component!;

    const renderRoute = (props: RouteProps) =>
        loggedIn ? (
            <Comp {...props} />
        ) : (
            <Redirect to={{ pathname: ROUTE_PATHS.root, state: { from: props.location } }} />
        );

    return <Route render={renderRoute} {...rest} />;
};

export default connect(mapStateToProps)(PrivateRoute);
