import React, { SFC } from 'react';
import { InputField, ResetButton, SubmitButton } from './FormElements';
import { Col, Grid } from '../layout/Grid';
import FormWrapper from './FormWrapper';

// TODO: pristine, submitting and reset are props retrieved from the FormWrapper. Need to create a nicer definition for this in TS.
interface Props {
    pristine?: boolean;
    submitting?: boolean;
    reset?: () => void;
    onSubmit: (val: {search: string}) => void;
}

const SearchForm: SFC<Props> = ({ pristine, submitting, reset, onSubmit }) => (
    <FormWrapper onSubmit={onSubmit}>
        <Grid>
            <Col sm={38.5}>
                <InputField
                    name={'search'}
                    component={'input'}
                    type={'text'}
                    placeholder={'example'}
                />
                {!pristine && typeof reset === 'function' && <ResetButton type={'button'} disabled={submitting} onClick={reset}>Reset</ResetButton>}
            </Col>
            <Col sm={3} smOffset={.5}>
                <SubmitButton type={'submit'} disabled={pristine || submitting}>Submit</SubmitButton>
            </Col>

        </Grid>
    </FormWrapper>
);

export default SearchForm;