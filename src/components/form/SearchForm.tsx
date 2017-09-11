import React, { SFC } from 'react';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { InputField, ResetButton, SubmitButton } from './FormElements';
import { Col, Grid } from '../layout/Grid';

interface Props {
    onSubmit: () => void;
}

const SearchForm: SFC<Props & InjectedFormProps> = ({handleSubmit, reset, pristine, submitting}) => {
    return (
        <form onSubmit={handleSubmit}>
            <Grid>
                <Col sm={38.5}>
                    <InputField
                        name={'search'}
                        component={'input'}
                        type={'text'}
                        placeholder={'example'}
                    />
                    {!pristine && <ResetButton type={'button'} disabled={submitting} onClick={reset}>Reset</ResetButton>}
                </Col>
                <Col sm={3} smOffset={.5}>
                    <SubmitButton type={'submit'} disabled={pristine || submitting}>Submit</SubmitButton>
                </Col>

            </Grid>
        </form>
    );
};

const formConfig = {
    form: 'searchForm'
};

export default reduxForm(formConfig)(SearchForm);