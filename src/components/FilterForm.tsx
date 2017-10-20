import translate from '../services/translate';
import React, { FormEvent, SFC } from 'react';
import { Dummy } from './Dummy';
import { Title } from './layout/StyledCopy';
import { EsFilter } from '../reducers/search';
import MultiSelectForm from './form/MultiselectForm';
import styled, { withProps } from '../styled-components';

interface Props {
    filters: EsFilter[];
    loading: boolean;
}

// TODO: this is just a simple loading effect, should be way cooler
const StyledForm = withProps<{ loading: boolean }>(styled.form)`
    opacity: ${props => props.loading ? .5 : 1};
`;

const FilterForm: SFC<Props> = ({ filters, loading }) => {

    const handleSubmit = (e: FormEvent<any>) => {
        e.preventDefault();
    };

    return (
        <StyledForm onSubmit={handleSubmit} loading={loading}>
            <Title>{translate('globals.filters')}</Title>
            <Dummy text={'search-filter'} height={1} marginY={.5}/>
            {
                filters.length > 0 && filters.map(
                    (filter, idx) => (
                        <MultiSelectForm key={idx} filter={filter} index={idx} />
                    )
                )
            }
            <Dummy text={'filter hierarchy'} height={2} marginY={.5}/>
            <Dummy text={'filter range'} height={5} marginY={.5}/>
        </StyledForm>
    );
};

export default FilterForm;