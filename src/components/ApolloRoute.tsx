import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteInfo } from '../constants/routeStructure';
import { withRouter } from 'react-router';
import Client from '../services/ApolloClient';

interface Props {
    route: RouteInfo;
    routePath: string;
    isPrivate?: boolean;
    match?: any;
}

interface StateProps {
    loggedIn?: boolean;
}

type FullProps = Props & StateProps;

interface State {
    metadata: any;
    data: any;
    loading: boolean;
}

const ApolloRoute = (WrappedComponent: any) => {
    class ApolloRouteClass extends Component<Props, State> {
        defaultState: State;
        onlyMetadata: boolean;
        noQuery: boolean;

        static selectQuery (p: FullProps, state: State, isMetadataQuery: boolean) {
            const {route} = p;

            const query = isMetadataQuery ? 'queryMetadata' : 'queryData';

            const queryFn = route[query];

            if (queryFn && typeof queryFn === 'function') {
                return queryFn({...p, ...state});
            }

            return null;
        }

        constructor (p: FullProps) {
            super(p);

            this.state = this.defaultState = {
                metadata: null,
                data: null,
                loading: true
            };

            this.onlyMetadata = !p.route.queryData;
            this.noQuery = this.onlyMetadata && !p.route.queryMetadata;
        }

        componentWillMount () {
            if (!this.noQuery) {
                this.queryGraph(this.props, this.state, true);
            }
        }

        componentWillUpdate (nextProps: FullProps, nextState: State) {
            if (this.noQuery) {
                return;
            }

            const isRouteChange = this.props.match.params !== nextProps.match.params;
            const metadataChanged = this.state.metadata !== nextState.metadata && !this.onlyMetadata;

            if (isRouteChange || metadataChanged) {
                this.queryGraph(nextProps, nextState, isRouteChange);
            }
        }

        render () {
            return <WrappedComponent {...this.props} {...this.state}/>;
        }

        // privates
        private queryGraph (p: FullProps, state: State, isMetadataQuery: boolean) {
            const {isPrivate, loggedIn} = p;

            if (isPrivate && !loggedIn) {
                return null;
            }

            if (!isMetadataQuery && this.onlyMetadata) {
                return null;
            }

            return this.doQuery(p, state, isMetadataQuery);
        }

        private doQuery (p: FullProps, state: State, isMetadataQuery: boolean) {
            const query = ApolloRouteClass.selectQuery(p, state, isMetadataQuery);

            if (!query) {
                return;
            }

            Client.query({query})
                .then((res) => this.setQuery(res, isMetadataQuery, state));
        }

        private setQuery ({data}: any, isMetadataQuery: boolean, state: State) {
            const newState = {
                loading: !(!isMetadataQuery || this.onlyMetadata),
                metadata: isMetadataQuery ? data : state.metadata,
                data: isMetadataQuery ? null : data
            };

            this.setState(newState);
        }
    }

    const mapStateToProps = state => ({
        loggedIn: state.user.loggedIn
    });

    return withRouter(
        connect(mapStateToProps)(ApolloRouteClass)
    );
};

export default ApolloRoute;