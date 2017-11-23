import React, { Component, ComponentClass, StatelessComponent } from 'react';
import Client from '../services/ApolloClient';
import { RouteComponentProps } from 'react-router';
import Error from '../components/routes/Error';
import NotFound from './routes/NotFound';

type State = ErrorState & DataState;

interface DataState {
    metadata: any;
    data: any;
    onRefetch: () => void;
}

interface ErrorState {
    error: Error | null;
    found: boolean;
}

export interface DataProps<TMetadata, TData> {
    metadata: TMetadata;
    data: TData;
    onRefetch: () => void;
    loading: boolean;
}

export type ResolvedApolloProps<T, U, V> = DataProps<T, U> & RouteComponentProps<V>;

export default function MetadataResolver<P>(
    metadataQuery: Function,
    dataQuery?: Function,
    resolverOptions?: { forceFetch: boolean }
) {
    return (WrappedComponent: ComponentClass<P> | StatelessComponent<P>) => {
        return class MetaDataQueryResolver extends Component<P & RouteComponentProps<any>, State> {
            noErrors: ErrorState = {
                error: null,
                found: true
            };
            defaultState: State;

            loading: boolean = true;
            onlyMetadata: boolean = !dataQuery;
            noQuery: boolean;
            refetch: () => void = this.onRefetch.bind(this);

            state = (this.defaultState = {
                ...this.noErrors,
                metadata: null,
                data: null,
                onRefetch: this.refetch
            });

            static selectQuery(props: Readonly<P & RouteComponentProps<any>>, state: State, isMetadataQuery: boolean) {
                if (isMetadataQuery && typeof metadataQuery === 'function') {
                    return metadataQuery({ ...state, ...(props as object) });
                } else if (typeof dataQuery === 'function') {
                    return dataQuery({ ...state, ...(props as object) });
                }

                return null;
            }

            componentDidMount() {
                if (!this.noQuery) {
                    this.queryGraph(this.props, this.state, true);
                }
            }

            componentWillUpdate(nextProps: Readonly<P & RouteComponentProps<any>>, nextState: State) {
                if (this.noQuery) {
                    return;
                }

                const isRouteChange =
                    this.props.match.params !== nextProps.match.params ||
                    this.props.location.search !== nextProps.location.search;
                const metadataChanged = !this.onlyMetadata && this.state.metadata !== nextState.metadata;

                if (isRouteChange || metadataChanged) {
                    this.loading = true;
                    this.queryGraph(nextProps, nextState, isRouteChange, resolverOptions && resolverOptions.forceFetch);
                }
            }

            onRefetch() {
                const forceFetch = true;
                this.queryGraph(this.props, this.state, true, forceFetch);
            }

            render() {
                if (!this.loading && !this.state.found) {
                    return <NotFound />;
                }

                if (!this.loading && this.state.error) {
                    return <Error error={this.state.error} />;
                }

                const loadingProps = { loading: this.loading };
                return <WrappedComponent {...this.props} {...this.state} {...loadingProps} />;
            }

            private queryGraph(
                props: Readonly<P & RouteComponentProps<any>>,
                state: State,
                isMetadataQuery: boolean,
                forceFetch: boolean = false
            ) {
                if (!isMetadataQuery && this.onlyMetadata) {
                    return null;
                }

                return this.doQuery(props, state, isMetadataQuery, forceFetch);
            }

            private doQuery(
                props: Readonly<P & RouteComponentProps<any>>,
                state: State,
                isMetadataQuery: boolean,
                forceFetch: boolean
            ) {
                const query = MetaDataQueryResolver.selectQuery(props, state, isMetadataQuery);

                if (!query) {
                    return this.setNotFound();
                }

                Client.query({ fetchPolicy: forceFetch ? 'network-only' : 'cache-first', query })
                    .then(res => this.setQuery(res, isMetadataQuery))
                    .catch(err => this.setError(err));
            }

            private setQuery({ data }: any, isMetadataQuery: boolean) {
                return isMetadataQuery ? this.setMetadata(data) : this.setData(data);
            }

            private setMetadata(metadata: any) {
                if (this.onlyMetadata && this.loading) {
                    this.loading = false;

                    return this.setState(prevState => ({
                        ...this.noErrors,
                        metadata
                    }));
                }

                return this.setState({
                    metadata
                });
            }

            private setData(data: any) {
                this.loading = false;

                this.setState(prevState => ({
                    ...this.noErrors,
                    data
                }));
            }

            private setNotFound() {
                this.loading = false;

                this.setState({
                    error: null,
                    found: false
                });
            }

            private setError(err: Error) {
                this.loading = false;

                this.setState({
                    found: true,
                    error: err
                });
            }
        };
    };
}
