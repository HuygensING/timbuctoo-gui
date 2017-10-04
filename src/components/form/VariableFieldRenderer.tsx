import React, { PureComponent } from 'react';
import styled from '../../styled-components';
import { StandardStyledFormElements } from './FormElements';
import { COMPONENT_FIELDS } from '../../constants/global';
import DraggableForm from './DraggableForm';
import { removeExtraInfo, renderEmptyViewComponent } from '../../services/FormValueManipulator';
import ConnectedSelect from './fields/ConnectedSelect';
import Select, { OptionProps } from './fields/Select';
import { SELECT_COMPONENT_TYPES } from '../../constants/forms';
import { ComponentValue, ComponentValueField } from '../../typings/timbuctoo/schema';

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
                    valueItem.value.fields.map((field: ComponentValueField, childIdx: number) => {
                        const { value, referenceType } = field;
                        return (
                            <ConnectedSelect
                                key={childIdx}
                                name={componentInfo.name}
                                selected={{key: value, value: value}}
                                collection={referenceType}
                                onChange={({option, reference}) => this.onSelectChangeHandler(option, reference, valueItem.name, childIdx)}
                            />
                        );
                    })
                }
                {/* <button type={'button'} onClick={(e) => this.onAddHandler(valueItem.name)}>+</button> */}
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

    private onSelectChangeHandler (option: OptionProps, reference: string, fieldName: string, childIndex: number) {
        const { resolveChange, item } = this.props;
        
        const newValue = {
            value: option.value,
            referenceType: reference
        };
        const oldValue = item[fieldName].fields[childIndex];

        if (newValue !== oldValue) {
            const newFieldset = {...item};
            newFieldset[fieldName].fields[childIndex] = newValue;
            resolveChange( newFieldset );

            if (newValue.referenceType) {
                const nextFieldSet = {...item};
                nextFieldSet[fieldName].fields[childIndex + 1] = newValue;
                resolveChange( nextFieldSet );
            }
        }

        console.log('newValue', newValue);
        console.log('oldValue', oldValue);
    }

    private onChangeHeadHandler (option: OptionProps) {
        const { resolveChange, item } = this.props;
        const componentKey = option.value;

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