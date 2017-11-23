import React, { FormEvent, SFC } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import styled from '../../styled-components';
import DraggableForm from './DraggableForm';
import { default as Select, OptionProps } from './fields/Select';
import InputField from './fields/Input';
import { NormalizedComponentConfig, ReferencePath } from '../../typings/index';
import { SELECT_COMPONENT_TYPES } from '../../constants/forms';
import { connect } from 'react-redux';
import {
    addViewConfigChild,
    addViewConfigNode,
    deleteViewConfigChild,
    deleteViewConfigNode, denormalizeComponent,
    lastId,
    modifyViewConfigNode,
    ViewConfigReducer
} from '../../reducers/viewconfig';
import { ComponentConfig } from '../../typings/schema';
import { EMPTY_COMPONENT } from '../../constants/emptyViewComponents';
import { RootState } from '../../reducers/rootReducer';
import { compose } from 'redux';
import ReferencePathSelector from './fields/ReferencePathSelector';
import { Field, FieldContainer, FieldLabel, FieldValue } from './fields/StyledField';

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

const ComponentFields: SFC<Props> = ({ item, lastIdofViewComponents, modifyNode, removeChild, removeNode, addChild, addNode }) => {

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

    const onSelectChangeHandler = (newPath: ReferencePath) => (
        modifyNode({ ...item, referencePath: newPath })
    );

    const onChangeHeadHandler = (option: OptionProps) => {
        const componentKey = option.value;

        if (componentKey === item.type) {
            return false;
        }

        const { id, childIds, name } = item;

        const newFieldset: NormalizedComponentConfig = {
            ...EMPTY_COMPONENT[componentKey],
            id, childIds, name
        };

        // TODO: maak hier een switchNode van en replace childIds with index stuff

        return modifyNode(newFieldset);
    };

    console.log(item);

    return (
        <FieldContainer>
            <Field>
                <FieldLabel htmlFor={name}>Component</FieldLabel>
                <FieldValue>
                    <Select
                        name={'Component'}
                        options={SELECT_COMPONENT_TYPES}
                        selected={SELECT_COMPONENT_TYPES.find((valueType) => valueType.value === item.type)}
                        onChange={onChangeHeadHandler}
                    />
                </FieldValue>
            </Field>

            <Field>
                {typeof item.value === 'string' && <FieldLabel htmlFor={name}>{item.type}</FieldLabel>}
                {typeof item.value === 'string' && (
                    <FieldValue>
                        {(
                            item.type === 'PATH'
                                ? (
                                    <ReferencePathSelector
                                        onChange={onSelectChangeHandler}
                                        paths={item.referencePath as ReferencePath}
                                    />
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
                    </FieldValue>
                )}
            </Field>

            {item.childIds.length > 0 && (
                <DraggableForm
                    configType={'view'}
                    id={item.id}
                    noForm={true}
                />
            )}
        </FieldContainer>
    );
};

const mapStateToProps = (state: RootState) => ({
    items: state.viewconfig,
    lastIdofViewComponents: lastId(state.viewconfig)
});

const mapDispatchToProps = (dispatch, { item: { id }, match }: Props) => ({
    modifyNode: (component: NormalizedComponentConfig) => dispatch(modifyViewConfigNode(id, component)),
    removeChild: (childId: number) => dispatch(deleteViewConfigChild(id, childId)),
    removeNode: (nodeId: number) => dispatch(deleteViewConfigNode(nodeId)),
    addNode: (component: ComponentConfig) => dispatch(addViewConfigNode(component, match.params.collection)),
    addChild: (childId: number) => dispatch(addViewConfigChild(id, childId))
});

export default compose<SFC<OwnProps>>(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(ComponentFields);