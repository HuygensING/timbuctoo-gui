import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Translations from '../../services/Translations';
import { InputField, ResetButton, SubmitButton } from './FormElements';
import { Col, Grid } from '../layout/Grid';
import { submitSearch } from '../../reducers/search';
import { SearchReducer } from '../../typings/store';

const mapStateToProps = state => ({
    defaultValues: state.search
});
const mapDispatchToProps = dispatch => ({
    submitSearch: (key, value) => dispatch(submitSearch(key, value))
});

interface Props {
    type: 'dataset' | 'collection' | 'filter';
}

interface StoreProps {
    defaultValues: SearchReducer;
    submitSearch: Function;
}

interface State {
    pristine: boolean;
    value: string;
}

class SearchForm extends PureComponent<Props & StoreProps, State> {
    defaultState: State;

    constructor (props: Props & StoreProps) {
        super(props);

        const storeValue = props.defaultValues[props.type];

        this.state = {
            pristine: storeValue === '',
            value: storeValue
        };

        this.defaultState = {
            pristine: true,
            value: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.onReset = this.onReset.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    render () {
        return (
            <form onSubmit={this.onSubmit}>
                <Grid>
                    <Col sm={38.5}>
                        <InputField
                            name={'search'}
                            type={'text'}
                            value={this.state.value}
                            onChange={this.handleChange}
                            placeholder={Translations.translate('search.placeholder')}
                        />
                        {!this.state.pristine && this.renderReset()}
                    </Col>
                    <Col sm={3} smOffset={.5}>
                        <SubmitButton type={'submit'} disabled={this.state.pristine}>{Translations.translate('search.search')}</SubmitButton>
                    </Col>

                </Grid>
            </form>
        );
    }

    private renderReset () {
        return (
            <ResetButton type={'button'} onClick={this.onReset}>
                {Translations.translate('search.reset')}
            </ResetButton>
        );
    }

    private handleChange (e: any) {
        e.preventDefault();
        const value = e.target.value;
        const pristine = value === '';
        this.setState({value, pristine});
    }

    private onReset (e: any) {
        e.preventDefault();
        this.setState(this.defaultState);
    }

    private onSubmit (e: any) {
        e.preventDefault();

        const { type } = this.props;
        const { value } = this.state;

        this.props.submitSearch(type, value);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);