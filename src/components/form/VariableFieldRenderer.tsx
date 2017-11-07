import React, { FormEvent, PureComponent } from 'react';
import { match, withRouter } from 'react-router';
import styled from '../../styled-components';
import { COMPONENT_FIELDS, COMPONENTS } from '../../constants/global';
import DraggableForm from './DraggableForm';
import { default as Select, OptionProps } from './fields/Select';
import InputField from './fields/Input';
import { ConfigurableItem, NormalizedComponent, ValueItem } from '../../typings/index';
import KeyValue from './fields/KeyValue';
import { SELECT_COMPONENT_TYPES } from '../../constants/forms';
import { connect } from 'react-redux';
import {
    addViewConfigChild,
    addViewConfigNode,
    deleteViewConfigChild,
    deleteViewConfigNode,
    denormalizeComponent,
    getNodeById,
    lastId,
    modifyViewConfigNode,
    ViewConfigReducer
} from '../../reducers/viewconfig';
import { Component } from '../../typings/schema';
import EMPTY_VIEW_COMPONENTS from '../../constants/emptyViewComponents';
import { RootState } from '../../reducers/rootReducer';

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
    item: ConfigurableItem;
    items: ViewConfigReducer;
    match?: match<any>;
    configType: 'view' | 'facet';
    modifyNode: (component: Component) => void;
    removeNode: (nodeId: number) => void;
    removeChild: (childId: number) => void;
    addChild: (childId: number) => void;
    addNode: (component: Component) => void;
    lastId: number;
}

class VariableFormFieldRenderer extends PureComponent<Props> {
    render () {
        if (this.props.configType === 'view') {
            return this.renderComponentFields();
        } else {
            return (
                <p>TODO VariableFieldRenderer: render facet fields.</p>
            );
        }
    }
    
    renderComponentFields () {
        const item = this.props.item as NormalizedComponent;
        const { configType } = this.props;
        const { childIds } = item;

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
                <StyledDivider>
                    <Label htmlFor={name}>Component</Label>
                    <Select
                        name={'Component'}
                        options={SELECT_COMPONENT_TYPES}
                        selected={SELECT_COMPONENT_TYPES.find(({ value }) => value === item.type)}
                        onChange={e => this.onChangeHeadHandler(e)}
                    />
                </StyledDivider>
                {valueList.map((valueItem: ValueItem, idx: number) =>
                    valueItem && valueItem.value && (
                        <StyledDivider key={idx}>
                            <Label htmlFor={`${item.name}_${valueItem.name}_0`}>{valueItem.name}</Label>
                            <KeyValue
                                valueItem={valueItem}
                                onSelectChangeHandler={this.onSelectChangeHandler}
                                collection={this.props.match && this.props.match.params.collection}
                            />
                            {typeof valueItem.value.field === 'string' && (
                                <StyledInputWrapper>
                                    <StyledInput
                                        type={'text'}
                                        title={`${valueItem.name}_${0}`}
                                        name={item.name}
                                        defaultValue={valueItem.value.field}
                                        onBlur={(e) => this.onChangeHandler(e, valueItem.name)}
                                    />
                                </StyledInputWrapper>
                            )}
                        </StyledDivider>
                    ))}
                {childIds.length > 0 && (
                    <DraggableForm
                        items={(
                            childIds.map(id => getNodeById(id, this.props.items))
                        )}
                        configType={configType}
                        id={item.id}
                        noForm={true}
                    />
                )}
            </StyledFieldset>
        );
    }

    private onChangeHandler = (e: FormEvent<HTMLInputElement>, fieldName: string) => {
        const item = this.props.item as NormalizedComponent;

        const newValue = e.currentTarget.value;
        const oldValue = item[fieldName].field;

        if (newValue !== oldValue) {
            const newFieldset: Component = denormalizeComponent({ ...item });
            newFieldset[fieldName].field = newValue;
            this.props.modifyNode(newFieldset);
        }
    }

    private onSelectChangeHandler = (option: OptionProps, settings: any, fieldName: string, childIndex: number) => {
        const item = this.props.item as NormalizedComponent;

        // todo: Move all this logic to redux side effects as a saga (see 'redux-saga' package)

        // Set the newValue object
        const newValue = {
            value: option.value,
            reference: settings.reference
        };

        // Create reference for the oldValue
        const oldValue = item[fieldName].fields[childIndex];

        // Only update when newValue and oldValue are not matching
        if (newValue !== oldValue) {
            const newFieldset: Component = denormalizeComponent({ ...item });
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
            this.props.modifyNode(newFieldset);
        }
    }

    private onChangeHeadHandler = (option: OptionProps) => {
        const item = this.props.item as NormalizedComponent;
        const componentKey = option.value;

        if (componentKey === item.type) {
            return;
        }

        if (componentKey !== COMPONENTS.keyValue) {
            // we're not a keyvalue anymore, kill children
            for (const child of item.childIds) {
                this.props.removeChild(child);
                this.props.removeNode(child);
            }
        } else {
            // this is a keyvalue component now: push a new node and add it as child.
            this.props.addNode(EMPTY_VIEW_COMPONENTS[COMPONENTS.title]);
            this.props.addChild(this.props.lastId + 1);
        }

        const newFieldset = EMPTY_VIEW_COMPONENTS[componentKey];
        this.props.modifyNode(newFieldset);
    }
}

const mapStateToProps = (state: RootState) => ({
    items: state.viewconfig,
    lastId: lastId(state.viewconfig)
});

const mapDispatchToProps = (dispatch, { item: { id } }: Props) => ({
    modifyNode: (component: Component) => dispatch(modifyViewConfigNode(id, component)),
    removeChild: (childId: number) => dispatch(deleteViewConfigChild(id, childId)),
    removeNode: (nodeId: number) => dispatch(deleteViewConfigNode(nodeId)),
    addNode: (component: Component) => dispatch(addViewConfigNode(component)),
    addChild: (childId: number) => dispatch(addViewConfigChild(id, childId))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VariableFormFieldRenderer));
