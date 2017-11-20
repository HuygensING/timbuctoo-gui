import React, { FormEvent, PureComponent } from 'react';
import { match, withRouter } from 'react-router';
import styled from '../../styled-components';
import { COMPONENTS } from '../../constants/global';
import DraggableForm from './DraggableForm';
import { default as Select, OptionProps } from './fields/Select';
import InputField from './fields/Input';
import { NormalizedComponent } from '../../typings/index';
import KeyValue from './fields/KeyValue';
import { SELECT_COMPONENT_TYPES } from '../../constants/forms';
import { connect } from 'react-redux';
import {
    addViewConfigChild,
    addViewConfigNode,
    deleteViewConfigChild,
    deleteViewConfigNode, denormalizeComponent,
    getNodeById, lastId,
    modifyViewConfigNode,
    ViewConfigReducer
} from '../../reducers/viewconfig';
import { ComponentConfig } from '../../typings/schema';
import { EMPTY_NODE_COMPONENT, EMPTY_LEAF_COMPONENT } from '../../constants/emptyViewComponents';
import { RootState } from '../../reducers/rootReducer';
import { isLeafOrNode } from '../../services/LeafOrNodeComponent';

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
    item: NormalizedComponent;
    items: ViewConfigReducer;
    match?: match<any>;
    modifyNode: (component: ComponentConfig) => void;
    removeNode: (nodeId: number) => void;
    removeChild: (childId: number) => void;
    addChild: (childId: number) => void;
    addNode: (component: ComponentConfig) => void;
    lastId: number;
}

class VariableFormFieldRenderer extends PureComponent<Props> {

    render () {
        const { item, item: { childIds, value, name, type } } = this.props;

        return (
            <StyledFieldset>
                <StyledDivider>
                    <Label htmlFor={name}>Component</Label>
                    <Select
                        name={'Component'}
                        options={SELECT_COMPONENT_TYPES}
                        selected={SELECT_COMPONENT_TYPES.find((valueType) => valueType.value === item.type)}
                        onChange={this.onChangeHeadHandler}
                    />
                </StyledDivider>

                <StyledDivider>
                    {typeof value === 'string' && <Label htmlFor={name}>{type}</Label>}
                    {typeof value === 'string' && (
                        type === 'PATH'
                            ? (
                                <KeyValue
                                    valueItem={{ value: {}, name }}
                                    onSelectChangeHandler={this.onSelectChangeHandler}
                                    collection={this.props.match && this.props.match.params.collection}
                                />
                            )
                            : (
                                <StyledInputWrapper>
                                    <StyledInput
                                        type={'text'}
                                        title={name}
                                        name={name}
                                        defaultValue={value}
                                        onBlur={this.onChangeHandler}
                                    />
                                </StyledInputWrapper>
                            )
                    )}
                </StyledDivider>

                {childIds.length > 0 && (
                    <DraggableForm
                        items={(childIds.map(id => getNodeById(id, this.props.items)))}
                        id={item.id}
                        noForm={true}
                    />
                )}
            </StyledFieldset>
        );
    }

    private onChangeHandler = (e: FormEvent<HTMLInputElement>): void | false => {
        e.persist();

        const { item } = this.props;
        const newValue = e.currentTarget.value;

        if (newValue === item.value) {
            return false;
        }

        const newFieldset: ComponentConfig = denormalizeComponent({ ...item });
        newFieldset.value = newValue;

        return this.props.modifyNode(newFieldset);
    }

    private onSelectChangeHandler (option: OptionProps, settings: any, fieldName: string, childIndex: number) {
        const { item } = this.props;

        // todo: Move all this logic to redux side effects as a saga (see 'redux-saga' package)
        // todo: Align with what the string will look like for the value of PATH component


        // Set the newValue object
        const newValue = {
            value: option.value,
            reference: settings.reference
        };

        // Create reference for the oldValue
        const oldValue = item[fieldName].fields[childIndex];

        // Only update when newValue and oldValue are not matching
        if (newValue !== oldValue) {
            const newFieldset: ComponentConfig = denormalizeComponent({ ...item });
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
        const { item } = this.props;
        const componentKey = option.value;

        if (componentKey === item.type) {
            return;
        }

        let newFieldset: ComponentConfig | null = null;

        switch (isLeafOrNode(componentKey)) {
            case 'leaf':
                for (const child of item.childIds) {
                    this.props.removeChild(child);
                    this.props.removeNode(child);
                }
                newFieldset = EMPTY_LEAF_COMPONENT[componentKey];
                break;

            case 'node':
                if (!item.childIds.length) {
                    this.props.addNode(EMPTY_NODE_COMPONENT[COMPONENTS.path]);
                    this.props.addChild(this.props.lastId + 1);
                }
                newFieldset = EMPTY_NODE_COMPONENT[componentKey];
                break;

            default:
                return process.env.NODE_ENV === 'development'
                    ? console.warn(`${componentKey} is no valid component-type.`)
                    : false;
        }

        this.props.modifyNode(newFieldset);
    }
}

const mapStateToProps = (state: RootState) => ({
    items: state.viewconfig,
    lastId: lastId(state.viewconfig)
});

const mapDispatchToProps = (dispatch, { item: { id } }: Props) => ({
    modifyNode: (component: ComponentConfig) => dispatch(modifyViewConfigNode(id, component)),
    removeChild: (childId: number) => dispatch(deleteViewConfigChild(id, childId)),
    removeNode: (nodeId: number) => dispatch(deleteViewConfigNode(nodeId)),
    addNode: (component: ComponentConfig) => dispatch(addViewConfigNode(component)),
    addChild: (childId: number) => dispatch(addViewConfigChild(id, childId))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VariableFormFieldRenderer));
