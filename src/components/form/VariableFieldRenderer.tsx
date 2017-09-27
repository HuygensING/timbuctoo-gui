import React, { PureComponent } from 'react';
import styled from '../../styled-components';
import { Field, Fieldset } from '../../typings/Forms';
import { StandardStyledFormElements } from './FormElements';

const Label = styled.label`
  display: inline-block;
  clear: left;
  min-width: 5rem;
`;

const StyledInput = styled.input`
  display: inline-block;
  width: auto;
  ${StandardStyledFormElements};
`;

const StyledDivider = styled.div`
  margin-bottom: 1rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

interface Props {
    fieldset: Fieldset;
    resolveChange: Function;
}

class VariableFormFieldRenderer extends PureComponent<Props> {

    constructor () {
        super();

        this.renderFields = this.renderFields.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
    }

    renderFields (field: Field, idx: number) {
        return (
            <StyledDivider key={idx}>
                <Label htmlFor={field.name}>{field.title}</Label>
                <StyledInput
                    key={idx}
                    type={'text'}
                    title={field.title}
                    name={`example-${idx}`}
                    defaultValue={field.value}
                    onBlur={(e) => this.onChangeHandler(e, idx)}
                />
            </StyledDivider>
        );
    }

    onChangeHandler (e: any, idx: number) {
        const { resolveChange, fieldset } = this.props;

        if (e.target.value !== fieldset.fields[idx].value) {
            const newFieldset = { ...fieldset};
            newFieldset.fields[idx].value = e.target.value;

            resolveChange(newFieldset);
        }
    }

    render () {
        const { fields } = this.props.fieldset;
        return (
            <fieldset>
                {fields.map(this.renderFields)}
            </fieldset>
        );
    }
}

export default VariableFormFieldRenderer;