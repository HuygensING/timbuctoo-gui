import React, { PureComponent } from 'react';
import styled from '../../styled-components';
import { StandardStyledFormElements } from './FormElements';
import { COMPONENT_FIELDS } from '../../constants/global';
import DraggableForm from './DraggableForm';
import { removeExtraInfo, renderEmptyViewComponent } from '../../services/FormValueManipulator';
import Select from './fields/Select';
import { SELECT_COMPONENT_TYPES } from '../../constants/forms';
import { ComponentValue } from '../../typings/timbuctoo/schema';

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

interface ValueItem {
    value: ComponentValue;
    name: string;
}

class VariableFormFieldRenderer extends PureComponent<Props> {

    static renderFieldList (item: any) {
        const arr: any[] = [];

        for (let key in COMPONENT_FIELDS) {
            if (COMPONENT_FIELDS.hasOwnProperty(key)) {
                const name = COMPONENT_FIELDS[key];
                const obj = {
                    value: item[name],
                    name
                };

                console.group(name);
                console.log(obj);
                console.groupEnd();

                if (item[name]) {
                    arr.push(obj);
                }

            }
        }

        return arr;
    }

    constructor () {
        super();

        this.onAddHandler = this.onAddHandler.bind(this);
        this.renderSubFields = this.renderSubFields.bind(this);
        this.renderComponentSelector = this.renderComponentSelector.bind(this);
        this.onChangeSubForm = this.onChangeSubForm.bind(this);
        this.onChangeHeadHandler = this.onChangeHeadHandler.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
    }

    onChangeSubForm (values: any) {
        const { resolveChange, item } = this.props;
        const newValues = removeExtraInfo(values);

        const newFieldset = {...item};
        newFieldset.values = newValues;

        resolveChange(newFieldset);
    }

    renderSubForm () {
        const { values } = this.props.item;
        return (
            <DraggableForm
                items={values}
                noForm={true}
                onSend={this.onChangeSubForm}
            />
        );
    }

    render () {
        const {values, componentInfo} = this.props.item;
        const valueList = VariableFormFieldRenderer.renderFieldList(this.props.item);

        return (
            <StyledFieldset>
                {componentInfo && this.renderComponentSelector()}
                {valueList.map(this.renderSubFields)}
                {values && values.length > 0 && this.renderSubForm()}
            </StyledFieldset>
        );
    }

    private renderComponentSelector () {
        const { name } = this.props.item.componentInfo;

        return (
            <StyledDivider>
                <Label htmlFor={name}>Component</Label>
                <Select
                    name={'Component'}
                    options={SELECT_COMPONENT_TYPES}
                    selected={name}
                    onChange={e => this.onChangeHeadHandler(e)}
                />
            </StyledDivider>
        );
    }

    private renderTextField (valueItem: ValueItem) {
        const { componentInfo } = this.props.item;

        if (!valueItem.value.field) {
            return null;
        }

        return (
            <StyledInputWrapper>
                <StyledInput
                    type={'text'}
                    title={`${valueItem.name}_${0}`}
                    name={componentInfo.name}
                    defaultValue={valueItem.value.field}
                    onBlur={(e) => this.onChangeHandler(e, valueItem.name)}
                />
            </StyledInputWrapper>
        );
    }

    private renderKeyFields (valueItem: ValueItem) {
        const { componentInfo } = this.props.item;

        if (!valueItem.value.fields || valueItem.value.fields.length === 0) {
            return null;
        }

        return (
            <StyledInputWrapper>
                {
                    valueItem.value.fields.map((field: string, childIdx: number) => (
                        <StyledInput
                            key={childIdx}
                            type={'text'}
                            title={`${valueItem.name}_${childIdx}`}
                            name={componentInfo.name}
                            defaultValue={field}
                            onBlur={(e) => this.onChangeHandler(e, valueItem.name)}
                        />
                    ))
                }
                <button type={'button'} onClick={(e) => this.onAddHandler(valueItem.name)}>+</button>
            </StyledInputWrapper>
        );
    }

    private renderSubFields (valueItem: ValueItem, idx: number) {
        if (!valueItem || !valueItem.value) {
            return null;
        }

        const { componentInfo } = this.props.item;

        return (
            <StyledDivider key={idx}>
                <Label htmlFor={`${componentInfo.name}_${valueItem.name}_0`}>{valueItem.name}</Label>
                {
                    valueItem.value.fields && valueItem.value.fields.length > 0
                     ? this.renderKeyFields(valueItem)
                     : this.renderTextField(valueItem)
                }
            </StyledDivider>
        );
    }

    private onChangeHandler (e: any, fieldName: string) {
        const {resolveChange, item} = this.props;

        const newValue = e.target.value;
        const oldValue = item[fieldName].field;

        if (newValue !== oldValue) {
            const newFieldset = {...item};
            newFieldset[fieldName].field = newValue;
            resolveChange(newFieldset);
        }
    }

    private onChangeHeadHandler (componentKey: string) {
        console.log(componentKey);
        const { resolveChange, item } = this.props;

        if (componentKey === item.type) { return null; }

        const newFieldset = renderEmptyViewComponent(componentKey, item.componentInfo.index);

        return newFieldset
            ? resolveChange(newFieldset)
            : console.log('"' + componentKey + '" : this is not an existing component!');
    }

    private onAddHandler (fieldName: string) {
        const { resolveChange, item } = this.props;

        const newFieldset = {...item};
        newFieldset[fieldName].fields.push('');

        resolveChange(newFieldset);
    }
}

export default VariableFormFieldRenderer;