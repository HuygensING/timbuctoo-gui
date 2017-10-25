import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Location } from 'history';
import { Facet, FacetConfig } from '../typings/schema';
import { EsFilter, FullTextSearch, mergeFilters } from '../reducers/search';
import { RootState } from '../reducers/rootReducer';
import { RouteComponentProps, withRouter } from 'react-router';
import { encode } from '../services/UrlStringCreator';
import { createEsQueryString } from '../services/EsQueryStringCreator';
import FilterForm from './FilterForm';

interface Props {
    currentCollectionListId: string;
    loading: boolean;
    collection: {
        facets: Facet[]
    } | null;
    facetConfigs: FacetConfig[];
}

interface StateProps {
    filters: EsFilter[];
    fullText: FullTextSearch;
    callRequested: boolean;
    mergeFilter: (config: FacetConfig[], options: Facet[], location: Location) => void;
}

type FullProps = Props & StateProps & RouteComponentProps<any>;

class Filters extends PureComponent<FullProps, {}> {
    onlyFilterChanged: boolean = false;
    id: string | null;

    static mergeFilter (props: FullProps): void {
        const { collection, facetConfigs, mergeFilter, location } = props;

        if (collection && collection.facets) {
            mergeFilter(facetConfigs, collection.facets, location);
        }
    }

    componentWillMount (): void {
        Filters.mergeFilter(this.props);
    }

    componentWillReceiveProps (nextProps: FullProps) {
        // already has a filter, but needs to merge it with the new intel
        if (!nextProps.loading && this.onlyFilterChanged) {
            this.onlyFilterChanged = false;
            Filters.mergeFilter(nextProps);

        // in case of route change save id for next rerender
        } else if (this.props.currentCollectionListId !== nextProps.currentCollectionListId) {
            this.id = this.props.currentCollectionListId;

        // merge the old with the new
        } else if (this.id && this.id !== nextProps.currentCollectionListId) {
            this.id = null;
            Filters.mergeFilter(nextProps);

        // need a new call with new intel after changing the form
        } else if (nextProps.callRequested && !this.props.callRequested) {
            this.pushQueryString(nextProps);
        }
    }

    pushQueryString (props: FullProps) {
        const { history, location, filters, fullText } = props;
        const query = createEsQueryString(filters, fullText);
        const searchParam = query ? `?search=${encode(query)}` : '';

        this.onlyFilterChanged = true;

        history.replace(location.pathname + searchParam);
    }

    render () {
        return <FilterForm filters={this.props.filters} loading={this.props.loading}/>;
    }
}

const mapStateToProps = (state: RootState) => ({
    filters: state.search.filters,
    fullText: state.search.fullText,
    callRequested: state.search.callRequested
});

const mapDispatchToProps = (dispatch) => ({
    mergeFilter: (config: FacetConfig[], options: Facet[], location: Location) => dispatch(mergeFilters(config, options, location))
});

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(Filters)
);