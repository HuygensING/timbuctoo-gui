import React, { SFC } from 'react';
import { connect } from 'react-redux';
import translate from '../../services/translate';
import { Col, Grid } from '../layout/Grid';
import { requestCall, SearchReducer, submitSearch } from '../../reducers/search';
import InputField from './fields/Input';
import { ResetButton, SubmitButton } from './fields/Buttons';

const mapStateToProps = state => ({
    defaultValues: state.search
});
const mapDispatchToProps = dispatch => ({
    handleChange: (key, value) => dispatch(submitSearch(key, value)),
    requestSearch: () => dispatch(requestCall())
});

interface Props {
    type: 'dataset' | 'collection' | 'filter';
}

interface StoreProps {
    defaultValues: SearchReducer;
    handleChange: Function;
    requestSearch: () => void;
}

const SearchForm: SFC<Props & StoreProps> = ({ defaultValues, type, handleChange, requestSearch }) => {

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
        <form onSubmit={onSubmit}>
            <Grid>
                <Col sm={38.5}>
                    <InputField
                        name={'search'}
                        type={'text'}
                        value={defaultValues.fullText[type]}
                        onChange={onChange}
                        placeholder={translate('search.placeholder')}
                    />
                    {!pristine && (
                        <ResetButton type={'button'} onClick={onReset}>
                            {translate('search.reset')}
                        </ResetButton>
                    )}
                </Col>
                <Col sm={3} smOffset={.5}>
                    <SubmitButton type={'submit'}>{translate('search.search')}</SubmitButton>
                </Col>

            </Grid>
        </form>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);