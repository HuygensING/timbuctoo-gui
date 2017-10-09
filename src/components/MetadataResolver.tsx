import React, { Component } from 'react';
import Client from '../services/ApolloClient';

interface Props {
    match?: any;
}

interface State {
    metadata: any;
    data: any;
    loading: boolean;
}

export default (metadataQuery: Function | null, dataQuery?: Function) => (WrappedComponent: any) => {
    return class MetadataResolver extends Component<Props, State> {
        defaultState: State;
        onlyMetadata: boolean;
        noQuery: boolean;

        static selectQuery (props: Props, state: State, isMetadataQuery: boolean) {
            if (isMetadataQuery && typeof metadataQuery === 'function') {
                return metadataQuery({...props, ...state});

            } else if (typeof dataQuery === 'function') {
                return dataQuery({...props, ...state});
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

        componentDidMount() {
            if (!this.noQuery) {
                this.queryGraph(this.props, this.state, true);
            }
        }

        componentWillUpdate (nextProps: Props, nextState: State) {
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
        private queryGraph (p: Props, state: State, isMetadataQuery: boolean) {

            if (!isMetadataQuery && this.onlyMetadata) {
                return null;
            }

            return this.doQuery(p, state, isMetadataQuery);
        }

        private doQuery (p: Props, state: State, isMetadataQuery: boolean) {
            const query = MetadataResolver.selectQuery(p, state, isMetadataQuery);

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