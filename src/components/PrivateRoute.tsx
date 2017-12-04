import React, { SFC } from 'react';
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

const PrivateRoute: SFC<FullProps> = props => {
    const { component, loggedIn, ...rest } = props;
    const Comp = component!;

    return (
        <Route>
            {loggedIn ? (
                <Comp {...rest} />
            ) : (
                <Redirect to={{ pathname: ROUTE_PATHS.root, state: { from: props.location } }} />
            )}
        </Route>
    );
};

export default connect(mapStateToProps)(PrivateRoute);
