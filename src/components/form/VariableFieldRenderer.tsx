import React, { FormEvent, PureComponent } from 'react';
import { match, withRouter } from 'react-router';
import styled from '../../styled-components';
import { COMPONENTS } from '../../constants/global';
import DraggableForm from './DraggableForm';
import { default as Select, OptionProps } from './fields/Select';
import InputField from './fields/Input';
import { NormalizedComponent } from '../../typings/index';
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
import { ComponentConfig, PathComponentConfig, Property } from '../../typings/schema';
import { EMPTY_COMPONENT, EMPTY_LEAF_COMPONENT } from '../../constants/emptyViewComponents';
import { RootState } from '../../reducers/rootReducer';
import ConnectedSelect from './fields/ConnectedSelect';

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
        const { item, item: { childIds, value, name, type, valueList } } = this.props;

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
                                <span>
                                    <ConnectedSelect
                                        name={'select'}
                                        selected={{ key: '', value: '' }}
                                        collectionId={this.props.match && this.props.match.params.collection}
                                        onChange={this.onSelectChangeHandler}
                                    />
                                    {!!valueList && valueList.map(({ ids, valueType }, childIdx: number) => (
                                        !valueType
                                            ? <ConnectedSelect
                                                key={childIdx}
                                                selected={{ key: '', value: '' }}
                                                name={'select'}
                                                collectionId={ids[0]}
                                                onChange={(val, property) => this.onSelectChangeHandler(val, property, childIdx)}
                                            />
                                            : valueType
                                    ))}
                                </span>
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

    private onSelectChangeHandler = (collectionKey: string, { isList, isValueType, referencedCollections }: Property, idx: number = -1) => {
        const { item } = this.props;

        if (!Array.isArray(item.valueList)) {
            return false;
        }

        const newFieldset = { ...item } as PathComponentConfig;

        newFieldset.valueList = [
            ...item.valueList.slice(0, idx > -1 ? (idx + 1) : 0),
            {
                ids: referencedCollections.items,
                isList,
                valueType: isValueType ? collectionKey : null,
            }
        ];

        return this.props.modifyNode(newFieldset);
    }

    private onChangeHeadHandler = (option: OptionProps) => {
        const { item } = this.props;
        const componentKey = option.value;

        if (componentKey === item.type) {
            return false;
        }

        const newFieldset: ComponentConfig = { ...EMPTY_COMPONENT[componentKey] };

        switch (componentKey) {
            case COMPONENTS.path:
            case COMPONENTS.literal:
                for (const child of item.childIds) {
                    this.props.removeChild(child);
                    this.props.removeNode(child);
                }
                break;
            default:
                if (!item.childIds.length) {
                    this.props.addNode(EMPTY_LEAF_COMPONENT[COMPONENTS.path]);
                    this.props.addChild(this.props.lastId + 1);
                }
                break;
        }

        return this.props.modifyNode(newFieldset);
    }
}

const mapStateToProps = (state: RootState) => ({
    items: state.viewconfig,
    lastId: lastId(state.viewconfig)
});

const mapDispatchToProps = (dispatch, { item: { id } }: Props) => ({
    modifyNode: (component: NormalizedComponent) => dispatch(modifyViewConfigNode(id, component)),
    removeChild: (childId: number) => dispatch(deleteViewConfigChild(id, childId)),
    removeNode: (nodeId: number) => dispatch(deleteViewConfigNode(nodeId)),
    addNode: (component: ComponentConfig) => dispatch(addViewConfigNode(component)),
    addChild: (childId: number) => dispatch(addViewConfigChild(id, childId))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VariableFormFieldRenderer));
