import React, { SFC } from 'react';
import Translations from '../../services/Translations';
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
                    placeholder={Translations.translate('search.placeholder')}
                />
                {!pristine && typeof reset === 'function' && <ResetButton type={'button'} disabled={submitting} onClick={reset}>{Translations.translate('search.reset')}</ResetButton>}
            </Col>
            <Col sm={3} smOffset={.5}>
                <SubmitButton type={'submit'} disabled={pristine || submitting}>{Translations.translate('search.search')}</SubmitButton>
            </Col>

        </Grid>
    </FormWrapper>
);

export default SearchForm;