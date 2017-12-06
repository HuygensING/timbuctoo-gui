import React, { SFC } from 'react';
import { connect } from 'react-redux';
import { Facet, FacetConfig } from '../typings/schema';
import { EsFilter } from '../reducers/search';
import { RootState } from '../reducers/rootReducer';
import { RouteComponentProps, withRouter } from 'react-router';
import styled, { withProps } from '../styled-components';
import { Title } from './layout/StyledCopy';
import MultiSelectForm from './form/MultiselectForm';
import translate from '../services/translate';
import { Dummy } from './Dummy';
import { compose } from 'redux';

// TODO: this is just a simple loading effect, should be way cooler
const StyledForm = withProps<{ loading: boolean }>(styled.form)`
    opacity: ${props => (props.loading ? 0.5 : 1)};
`;

interface Props {
    currentCollectionListId: string;
    loading: boolean;
    collection: {
        facets: Facet[];
    } | null;
    facetConfigs: FacetConfig[];
}

interface StateProps {
    filters: EsFilter[];
}

type FullProps = Props & StateProps & RouteComponentProps<any>;

const Filters: SFC<FullProps> = ({ loading, filters }) => (
    <StyledForm onSubmit={e => e.preventDefault()} loading={loading}>
        <Title>{translate('globals.filters')}</Title>
        <Dummy text={'search-filter'} height={1} marginY={0.5} />
        {filters.length > 0 && filters.map((filter, idx) => <MultiSelectForm key={idx} filter={filter} index={idx} />)}
    </StyledForm>
);

const mapStateToProps = (state: RootState) => ({
    filters: state.search.filters
});

export default compose(withRouter, connect(mapStateToProps))(Filters);
