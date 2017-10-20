import React, { Component, ComponentClass } from 'react';
import Client from '../services/ApolloClient';
import { RouteComponentProps } from 'react-router';
import { DataSetMetadata } from '../typings/schema';

interface State {
    metadata: any;
    data: any;
    onRefetch: () => void;
}

interface DataProps {
    metadata: {
        dataSetMetadata: DataSetMetadata;
    };
    data: {
        dataSets: any;
    };
    onRefetch: () => void;
    loading: boolean;
}

export type ResolvedApolloProps = DataProps & RouteComponentProps<any>;

export default function MetadataResolver<P>(metadataQuery: Function, dataQuery?: Function, resolverOptions?: { forceFetch: boolean; }) {
    return (WrappedComponent: ComponentClass<P>) => {
        return class MetaDataQueryResolver extends Component<P & RouteComponentProps<any>, State> {
            defaultState: State;
            onlyMetadata: boolean = !dataQuery;
            loading: boolean = true;
            noQuery: boolean;

            static selectQuery (props: Readonly<P & RouteComponentProps<any>>, state: State, isMetadataQuery: boolean) {
                if (isMetadataQuery && typeof metadataQuery === 'function') {
                    return metadataQuery({ ...state, match: props.match, location: props.location, history: props.history });

                } else if (typeof dataQuery === 'function') {
                    return dataQuery({ ...state, match: props.match, location: props.location, history: props.history });
                }

                return null;
            }

            constructor () {
                super();

                this.state = this.defaultState = {
                    metadata: null,
                    data: null,
                    onRefetch: this.onRefetch
                };
            }

            componentDidMount () {
                if (!this.noQuery) {
                    this.queryGraph(this.props, this.state, true);
                }
            }

            componentWillUpdate (nextProps: Readonly<P & RouteComponentProps<any>>, nextState: State) {
                if (this.noQuery) {
                    return;
                }

                const isRouteChange = this.props.match.params !== nextProps.match.params || this.props.location.search !== nextProps.location.search;
                const metadataChanged = !this.onlyMetadata && this.state.metadata !== nextState.metadata;

                if (isRouteChange || metadataChanged) {
                    this.loading = true;
                    this.queryGraph(nextProps, nextState, isRouteChange, resolverOptions && resolverOptions.forceFetch);
                }
            }

            onRefetch = () => {
                const forceFetch = true;
                this.queryGraph(this.props, this.state, true, forceFetch);
            }

            render () {
                const loadingProps = { loading: this.loading };
                return <WrappedComponent {...this.props} {...this.state} {...loadingProps} />;
            }

            private queryGraph (props: Readonly<P & RouteComponentProps<any>>, state: State, isMetadataQuery: boolean, forceFetch: boolean = false) {

                if (!isMetadataQuery && this.onlyMetadata) {
                    return null;
                }

                return this.doQuery(props, state, isMetadataQuery, forceFetch);
            }

            private doQuery (props: Readonly<P & RouteComponentProps<any>>, state: State, isMetadataQuery: boolean, forceFetch: boolean) {
                const query = MetaDataQueryResolver.selectQuery(props, state, isMetadataQuery);

                if (!query) {
                    return;
                }

                Client.query({ fetchPolicy: forceFetch ? 'network-only' : 'cache-first' , query })
                    .then((res) => this.setQuery(res, isMetadataQuery, state));
            }

            private setQuery (res: any, isMetadataQuery: boolean, state: State) {
                return isMetadataQuery
                    ? this.setMetadata(res.data)
                    : this.setData(res.data);
            }

            private setMetadata (metadata: any) {
                if (this.onlyMetadata) {
                    this.loading = false;
                }
                this.setState({
                    metadata
                });
            }

            private setData (data: any) {
                this.loading = false;
                this.setState({
                    data
                });
            }
        };
    };
}