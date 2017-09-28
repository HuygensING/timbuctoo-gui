import React, { PureComponent } from 'react';
import styled from '../../styled-components';
import { StandardStyledFormElements } from './FormElements';
import { COMPONENT_FIELDS } from '../../constants/global';
import { ComponentValue } from '../../typings/timbuctoo/schema';
import DraggableForm from './DraggableForm';

const Label = styled.label`
  display: inline-block;
  clear: left;
  min-width: 5rem;
`;

const StyledFieldset = styled.fieldset`
  width: 100%;
`;

const StyledInput = styled.input`
  display: inline-block;
  margin-bottom: .5rem;
  width: auto;
  margin-right: .5rem;
  max-width: 10rem;
  ${StandardStyledFormElements};
`;

const StyledInputWrapper = styled.div`
  display: inline-block;
`;

const StyledDivider = styled.div`
  margin-bottom: 1rem;
  display: flex;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

interface Props {
    item: any;
    resolveChange: Function;
}

class VariableFormFieldRenderer extends PureComponent<Props> {
    fieldValues: string[][];

    constructor () {
        super();

        this.fieldValues = [];

        this.onAddHandler = this.onAddHandler.bind(this);
        this.renderSubFields = this.renderSubFields.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
    }

    onChangeHead (e: any) {

    }

    renderSubForm () {
        const { values } = this.props.item;

        console.log('subform is rendering');
        console.log(values);

        return (
            <DraggableForm
                items={values}
                noForm={true}
                onSend={(e) => null}
            />
        );
    }

    render () {
        const {url, alt, value, values, componentInfo} = this.props.item;

        console.log(this.props.item);

        const valueList = [
            {value: url, name: COMPONENT_FIELDS.urlKey},
            {value: alt, name: COMPONENT_FIELDS.altKey},
            {value: value, name: COMPONENT_FIELDS.valueKey}];

        return (
            <StyledFieldset>
                <StyledDivider>
                    <Label htmlFor={componentInfo.name}>Component</Label>
                    <StyledInput
                        key={componentInfo.name}
                        type={'text'}
                        title={this.props.item.__typename}
                        name={componentInfo.name}
                        defaultValue={this.props.item.__typename}
                        onBlur={(e) => this.onChangeHead(e)}
                    />
                </StyledDivider>
                {values && values.length > 0
                    ? this.renderSubForm()
                    : valueList.map(this.renderSubFields)
                }
            </StyledFieldset>
        );
    }

    private renderSubFields (valueItem: {value: ComponentValue, name: string}, idx: number) {
        if (!valueItem.value) {
            return null;
        }

        const { componentInfo } = this.props.item;

        return (
            <StyledDivider key={idx}>
                <Label htmlFor={`${componentInfo.name}_${valueItem.name}_0`}>{valueItem.name}</Label>
                <StyledInputWrapper>
                    {
                        valueItem.value.fields.map((field: string, childIdx: number) => (
                            <StyledInput
                                key={childIdx}
                                type={'text'}
                                title={`${valueItem.name}_${childIdx}`}
                                name={componentInfo.name}
                                defaultValue={field}
                                onBlur={(e) => this.onChangeHandler(e, valueItem.name, childIdx)}
                            />
                        ))
                    }
                    <button type={'button'} onClick={(e) => this.onAddHandler(valueItem.name)}>+</button>
                </StyledInputWrapper>
            </StyledDivider>
        );
    }

    private onChangeHandler (e: any, fieldName: string, childIndex: number) {
        const {resolveChange, item} = this.props;

        const newValue = e.target.value;
        const oldValue = item[fieldName].fields[childIndex];

        if (newValue !== oldValue) {
            const newFieldset = {...item};
            newFieldset[fieldName].fields[childIndex] = newValue;
            newFieldset[fieldName].fields.length = childIndex + 1;

            resolveChange(newFieldset);
        }
    }

    private onAddHandler (fieldName: string) {
        const { resolveChange, item } = this.props;

        const newFieldset = {...item};
        newFieldset[fieldName].fields.push('Vul in...');

        resolveChange(newFieldset);
    }
}

export default VariableFormFieldRenderer;