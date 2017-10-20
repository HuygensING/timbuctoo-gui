import React, { FormEvent, PureComponent } from 'react';
import { match, withRouter } from 'react-router';
import styled from '../../styled-components';
import { COMPONENT_FIELDS } from '../../constants/global';
import DraggableForm from './DraggableForm';
import { removeExtraInfo, renderEmptyViewComponent } from '../../services/FormValueManipulator';
import Select, { OptionProps } from './fields/Select';
import { SELECT_COMPONENT_TYPES } from '../../constants/forms';
import InputField from './fields/Input';
import { ComponentFormType, ValueItem } from '../../typings/index';
import KeyValue from './fields/KeyValue';

const Label = styled.label`
    display: inline-block;
    clear: left;
    min-width: 5rem;
`;

const StyledFieldset = styled.fieldset`
    width: 100%;
`;

const StyledInput = styled(InputField)`
    display: inline-block;
    margin-bottom: .5rem;
    width: auto;
    margin-right: .5rem;
    max-width: 10rem;
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
    item: ComponentFormType;
    resolveChange: Function;
    match?: match<any>;
}

class VariableFormFieldRenderer extends PureComponent<Props> {
    render () {
        const { item } = this.props;
        const { values, componentInfo } = item;

        const valueList: ValueItem[] = [];

        for (let key in COMPONENT_FIELDS) {
            if (COMPONENT_FIELDS.hasOwnProperty(key)) {
                const name = COMPONENT_FIELDS[key];
                const obj = {
                    value: item[name],
                    name
                };

                if (item[name]) {
                    valueList.push(obj);
                }
            }
        }

        return (
            <StyledFieldset>
                {componentInfo && (
                    <StyledDivider>
                        <Label htmlFor={name}>Component</Label>
                        <Select
                            name={'Component'}
                            options={SELECT_COMPONENT_TYPES}
                            selected={name}
                            onChange={e => this.onChangeHeadHandler(e)}
                        />
                    </StyledDivider>
                )}
                {valueList.map((valueItem: ValueItem, idx: number) =>
                    valueItem && valueItem.value && (
                        <StyledDivider key={idx}>
                            <Label htmlFor={`${componentInfo.name}_${valueItem.name}_0`}>{valueItem.name}</Label>
                            <KeyValue
                                valueItem={valueItem}
                                componentInfo={componentInfo}
                                onSelectChangeHandler={this.onSelectChangeHandler}
                                collection={this.props.match && this.props.match.params.collection}
                            />
                            {typeof valueItem.value.field === 'string' && (
                                <StyledInputWrapper>
                                    <StyledInput
                                        type={'text'}
                                        title={`${valueItem.name}_${0}`}
                                        name={componentInfo.name}
                                        defaultValue={valueItem.value.field}
                                        onBlur={(e) => this.onChangeHandler(e, valueItem.name)}
                                    />
                                </StyledInputWrapper>
                            )}
                        </StyledDivider>
                    ))}
                {values && values.length > 0 && (
                    <DraggableForm
                        items={values}
                        noForm={true}
                        onSend={this.onChangeSubForm}
                    />
                )}
            </StyledFieldset>
        );
    }

    private onChangeSubForm = (values: any) => {
        const { resolveChange, item } = this.props;
        const newValues = removeExtraInfo(values);

        const newFieldset = { ...item };
        newFieldset.values = newValues;

        resolveChange(newFieldset);
    }

    private onChangeHandler = (e: FormEvent<HTMLInputElement>, fieldName: string) => {
        const { resolveChange, item } = this.props;

        const newValue = e.currentTarget.value;
        const oldValue = item[fieldName].field;

        if (newValue !== oldValue) {
            const newFieldset = { ...item };
            newFieldset[fieldName].field = newValue;
            resolveChange(newFieldset);
        }
    }

    private onSelectChangeHandler = (option: OptionProps, settings: any, fieldName: string, childIndex: number) => {
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
            const newFieldset = { ...item };
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
            resolveChange(newFieldset);
        }
    }

    private onChangeHeadHandler = (option: OptionProps) => {
        const { resolveChange, item } = this.props;
        const componentKey = option.value;

        if (componentKey === item.type) {
            return null;
        }

        const newFieldset = renderEmptyViewComponent(componentKey, item.componentInfo.index);

        return newFieldset
            ? resolveChange(newFieldset)
            : console.log('"' + componentKey + '" : this is not an existing component!');
    }
}

export default withRouter(VariableFormFieldRenderer);
