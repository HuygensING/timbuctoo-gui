import React, { Component, ComponentClass } from 'react';
import Client from '../services/ApolloClient';
import { match } from 'react-router';

interface State {
    metadata: any;
    data: any;
    loading: boolean;
}

interface RouteProps {
    match: match<any>;
}

export default function MetadataResolver<P>(metadataQuery: Function, dataQuery?: Function) {
    return (WrappedComponent: ComponentClass<P>) => {
        return class MetaDataQueryResolver extends Component<P & RouteProps, State> {
            defaultState: State;
            onlyMetadata: boolean;
            noQuery: boolean;

            static selectQuery (props: Readonly<P & RouteProps>, state: State, isMetadataQuery: boolean) {
                if (isMetadataQuery && typeof metadataQuery === 'function') {
                    return metadataQuery({...state, match: props.match});

                } else if (typeof dataQuery === 'function') {
                    return dataQuery({...state, match: props.match});
                }

                return null;
            }

            constructor () {
                super();

                this.state = this.defaultState = {
                    metadata: null,
                    data: null,
                    loading: true
                };

                this.onlyMetadata = !dataQuery;
            }

            componentDidMount () {
                if (!this.noQuery) {
                    this.queryGraph(this.props, this.state, true);
                }
            }

            componentWillUpdate (nextProps: Readonly<P & RouteProps>, nextState: State) {
                if (this.noQuery) {
                    return;
                }

                const isRouteChange = this.props.match.params !== nextProps.match.params;
                const metadataChanged = !this.onlyMetadata && this.state.metadata !== nextState.metadata;

                if (isRouteChange || metadataChanged) {
                    this.queryGraph(nextProps, nextState, isRouteChange);
                }
            }

            render () {
                return <WrappedComponent {...this.props} {...this.state}/>;
            }

            // privates
            private queryGraph (props: Readonly<P & RouteProps>, state: State, isMetadataQuery: boolean) {

                if (!isMetadataQuery && this.onlyMetadata) {
                    return null;
                }

                return this.doQuery(props, state, isMetadataQuery);
            }

            private doQuery (props: Readonly<P & RouteProps>, state: State, isMetadataQuery: boolean) {
                const query = MetaDataQueryResolver.selectQuery(props, state, isMetadataQuery);

                if (!query) {
                    return;
                }

                Client.query({query})
                    .then((res) => this.setQuery(res, isMetadataQuery, state));
            }

            private setQuery ({data}: any, isMetadataQuery: boolean, state: State) {
                return isMetadataQuery
                    ? this.setMetadata(data, state)
                    : this.setData(data);
            }

            private setMetadata (metadata: any, state: State) {

                if (this.onlyMetadata && state.loading !== false) {
                    this.setState({
                        loading: false,
                        metadata
                    });
                }
                this.setState({
                    metadata
                });
            }

            private setData (data: any) {
                this.setState({
                    loading: false,
                    data
                });
            }
        };
    };
}