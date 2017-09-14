import React, { PureComponent } from 'react';
import { reduxForm } from 'redux-form';

const formConfig = {
    form: 'searchForm'
};

// TODO: add typings to this Component that does not conflict with children
class FormWrapper extends PureComponent<any, any> {

    render () {
        const { handleSubmit, pristine, submitting, reset } = this.props;

        return (
            <form onSubmit={handleSubmit}>
                {React.cloneElement(
                    this.props.children,
                    { pristine, submitting, reset }
                )}
            </form>
        );
    }
}

export default reduxForm<any>(formConfig)(FormWrapper);