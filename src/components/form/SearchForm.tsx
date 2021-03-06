import React, { SFC } from 'react';
import { connect, Dispatch } from 'react-redux';
import translate from '../../services/translate';
import { Col, Grid } from '../layout/Grid';
import { requestCall, SearchReducer, submitSearch } from '../../reducers/search';
import InputField from './fields/Input';
import { ResetButton, SubmitButton } from './fields/Buttons';
import { compose } from 'redux';
import { RootState } from '../../reducers/rootReducer';
import styled, { withProps } from '../../styled-components';

interface Props {
    type: 'dataset' | 'collection' | 'filter';
    loading: boolean;
}

interface StoreProps {
    defaultValues: SearchReducer;
    handleChange: Function;
    requestSearch: () => void;
}

const Form = withProps<{ loading: boolean }>(styled.form)`
      opacity: ${props => (props.loading ? 0.5 : 1)};
`;

const ExtendedCol = Col.extend`
    display: inline-flex;
    align-items: center;
`;

const SearchForm: SFC<Props & StoreProps> = ({ defaultValues, type, handleChange, requestSearch, loading }) => {
    const onChange = (e: any) => {
        e.preventDefault();
        const val = e.target.value;
        handleChange(type, val);
    };

    const onReset = (e: any) => {
        e.preventDefault();
        handleChange(type, '');
        requestSearch();
    };

    const onSubmit = (e: any) => {
        e.preventDefault();
        requestSearch();
    };

    const value = defaultValues.fullText[type];
    const pristine = value.length === 0;

    return (
        <Form onSubmit={onSubmit} loading={loading}>
            <Grid>
                <ExtendedCol sm={42}>
                    <InputField
                        name={'search'}
                        type={'text'}
                        value={defaultValues.fullText[type]}
                        onChange={onChange}
                        placeholder={translate('search.placeholder') || undefined}
                    />
                    {!pristine && (
                        <ResetButton type={'button'} onClick={onReset}>
                            {translate('search.reset')}
                        </ResetButton>
                    )}
                    <SubmitButton type={'submit'}>{translate('search.search')}</SubmitButton>
                </ExtendedCol>
            </Grid>
        </Form>
    );
};

const mapStateToProps = (state: RootState) => ({
    defaultValues: state.search
});
const mapDispatchToProps = (dispatch: Dispatch<Props>) => ({
    handleChange: (key: 'fullText' | 'filters' | 'callRequested', value: string) => dispatch(submitSearch(key, value)),
    requestSearch: () => dispatch(requestCall())
});

export default compose<SFC<Props>>(connect(mapStateToProps, mapDispatchToProps))(SearchForm);
