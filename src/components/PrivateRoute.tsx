import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { ROUTE_PATHS } from '../constants/routeNaming';

const mapStateToProps = (state) => ({
    loggedIn: state.user.loggedIn
});

const PrivateRoute = ({ component: Component, ...rest }) => {
    const renderRoute = props => (
        rest.loggedIn
            ? <Component {...props}/>
            : <Redirect to={{ pathname: ROUTE_PATHS.root, state: {from: props.location}}}/>
    );

    return <Route render={renderRoute} {...rest} />;
};

export default connect(mapStateToProps)(PrivateRoute);
