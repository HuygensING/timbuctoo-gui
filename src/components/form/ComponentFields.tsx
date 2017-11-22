import React, { FormEvent, SFC } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import styled from '../../styled-components';
import { COMPONENTS } from '../../constants/global';
import DraggableForm from './DraggableForm';
import { default as Select, OptionProps } from './fields/Select';
import InputField from './fields/Input';
import { NormalizedComponentConfig } from '../../typings/index';
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
import { compose } from 'redux';

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

interface OwnProps {
    item: NormalizedComponentConfig;
}

interface DispatchProps {
    modifyNode: (component: ComponentConfig) => void;
    removeNode: (nodeId: number) => void;
    removeChild: (childId: number) => void;
    addChild: (childId: number) => void;
    addNode: (component: ComponentConfig) => void;
}

interface StateProps {
    items: ViewConfigReducer;
    lastIdofViewComponents: number;
}

type Props = StateProps & DispatchProps & OwnProps & RouteComponentProps<any>;

const ComponentFields: SFC<Props> = ({ item, items, lastIdofViewComponents, match, modifyNode, removeChild, removeNode, addChild, addNode }) => {

    const onChangeHandler = (e: FormEvent<HTMLInputElement>): void | false => {
        e.persist();

        const newValue = e.currentTarget.value;

        if (newValue === item.value) {
            return false;
        }

        const newFieldset: ComponentConfig = denormalizeComponent({ ...item });
        newFieldset.value = newValue;

        return modifyNode(newFieldset);
    };

    const onSelectChangeHandler = (collectionKey: string, { isList, isValueType, referencedCollections }: Property, idx: number = -1) => {
        if (!Array.isArray(item.valueList)) {
            return false;
        }

        const newFieldset = { ...item } as PathComponentConfig;

        newFieldset.valueList = [
            ...item.valueList.slice(0, idx > -1 ? (idx + 1) : 0),
            {
                ids: referencedCollections.items,
                isList,
                valueType: isValueType ? collectionKey : null
            }
        ];

        return modifyNode(newFieldset);
    };

    const onChangeHeadHandler = (option: OptionProps) => {
        const componentKey = option.value;

        if (componentKey === item.type) {
            return false;
        }

        const newFieldset: ComponentConfig = { ...EMPTY_COMPONENT[componentKey] };

        switch (componentKey) {
            case COMPONENTS.path:
            case COMPONENTS.literal:
                for (const child of item.childIds) {
                    removeChild(child);
                    removeNode(child);
                }
                break;
            default:
                if (!item.childIds.length) {
                    addNode(EMPTY_LEAF_COMPONENT[COMPONENTS.path]);
                    addChild(lastIdofViewComponents + 1);
                }
                break;
        }

        return modifyNode(newFieldset);
    };

    return (
        <StyledFieldset>
            <StyledDivider>
                <Label htmlFor={name}>Component</Label>
                <Select
                    name={'Component'}
                    options={SELECT_COMPONENT_TYPES}
                    selected={SELECT_COMPONENT_TYPES.find((valueType) => valueType.value === item.type)}
                    onChange={onChangeHeadHandler}
                />
            </StyledDivider>

            <StyledDivider>
                {typeof item.value === 'string' && <Label htmlFor={name}>{item.type}</Label>}
                {typeof item.value === 'string' && (
                    item.type === 'PATH'
                        ? (
                            <span>
                                    <ConnectedSelect
                                        name={'select'}
                                        selected={{ key: '', value: '' }}
                                        collectionId={match && match.params.collection}
                                        onChange={onSelectChangeHandler}
                                    />
                                {!!item.valueList && item.valueList.map(({ ids, valueType }, childIdx: number) => (
                                    !valueType
                                        ? <ConnectedSelect
                                            key={childIdx}
                                            selected={{ key: '', value: '' }}
                                            name={'select'}
                                            collectionId={ids[0]}
                                            onChange={(val, property) => onSelectChangeHandler(val, property, childIdx)}
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
                                    defaultValue={item.value}
                                    onBlur={onChangeHandler}
                                />
                            </StyledInputWrapper>
                        )
                )}
            </StyledDivider>

            {item.childIds.length > 0 && (
                <DraggableForm
                    items={(
                        item.childIds.map(id => getNodeById(id, items))
                    )}
                    configType={'view'}
                    id={item.id}
                    noForm={true}
                />
            )}
        </StyledFieldset>
    );
};

const mapStateToProps = (state: RootState) => ({
    items: state.viewconfig,
    lastIdofViewComponents: lastId(state.viewconfig)
});

const mapDispatchToProps = (dispatch, { item: { id } }: Props) => ({
    modifyNode: (component: NormalizedComponentConfig) => dispatch(modifyViewConfigNode(id, component)),
    removeChild: (childId: number) => dispatch(deleteViewConfigChild(id, childId)),
    removeNode: (nodeId: number) => dispatch(deleteViewConfigNode(nodeId)),
    addNode: (component: ComponentConfig) => dispatch(addViewConfigNode(component)),
    addChild: (childId: number) => dispatch(addViewConfigChild(id, childId))
});

export default compose<SFC<OwnProps>>(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(ComponentFields);