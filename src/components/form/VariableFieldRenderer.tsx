import React, { PureComponent } from 'react';
import { withRouter, match } from 'react-router';
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
    match?: match<any>;
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

        if (typeof valueItem.value.field !== 'string') {
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

    private renderConnectedSelect = (valueItem: ValueItem, field: ComponentValueField, childIdx: number = 0) => {
        // const { item } = this.props;
        // const { componentInfo } = item;
        const { value, reference } = field;
        return (
            <ConnectedSelect
                key={childIdx}
                name={'Select'}
                selected={{key: value, value: value}}
                collectionId={reference}
                onChange={({option, settings}) => this.onSelectChangeHandler(option, settings, valueItem.name, childIdx)}
            />
        );
    }

    private renderKeyFields (valueItem: ValueItem) {

        // If fields does not exist return null
        if (!valueItem.value.fields) {
            return null;
        }

        // If fields does exist but is empty, add a default field with current collection as reference
        const { match } = this.props;
        if (valueItem.value.fields && valueItem.value.fields.length === 0) {
            valueItem.value.fields.push({
                value: '',
                reference: match && match.params.collection
            })
        }

        return (
            <StyledInputWrapper>
                {
                    valueItem.value.fields.map((field: ComponentValueField, childIdx: number) => (
                        this.renderConnectedSelect(valueItem, field, childIdx))
                    )
                }
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
                {this.renderKeyFields(valueItem)}
                {this.renderTextField(valueItem)}
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

    private onSelectChangeHandler (option: OptionProps, settings: any, fieldName: string, childIndex: number) {
        const { resolveChange, item } = this.props;
        
        // Set the newValue object
        const newValue = {
            value: option.value,
            reference: settings.reference
        };

        // Create reference for the oldValue
        const oldValue = item[fieldName].fields[childIndex];

        // Only update when newValue and oldValue are not matching
        if (newValue !== oldValue) {
            const newFieldset = {...item};
            const fields = newFieldset[fieldName].fields;
            fields[childIndex] = {
                ...oldValue,
                value: newValue.value
            };
            
            // Remove all items behind last changed index
            fields.splice(childIndex + 1, fields.length - childIndex);

            // If isList boolean is true then push an items field to fields array
            // This field is needed for the correct query
            if (settings.isList) {
                fields.push({
                    value: 'items',
                    reference: null
                });
            }

            // If the newValue has a reference then create a new field at the end of the fields array
            // This field will query based on the reference given
            if (newValue.reference) {
                fields.push({
                    value: '',
                    reference: newValue.reference
                });
            }

            // Send a fieldSet change
            resolveChange( newFieldset );
        }
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

export default withRouter(VariableFormFieldRenderer);