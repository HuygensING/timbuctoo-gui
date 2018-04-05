import React, { FormEvent, SFC } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import styled from '../../styled-components';
import DraggableForm from './DraggableForm';
import { default as Select, OptionProps } from './fields/Select';
import InputField from './fields/Input';
import { NormalizedComponentConfig } from '../../typings/index';
import { SELECT_COMPONENT_TYPES } from '../../constants/forms';
import { connect, Dispatch } from 'react-redux';
import {
    changeViewConfigNodeType,
    deleteViewConfigNode,
    modifyViewConfigNode,
    ViewConfigReducer
} from '../../reducers/viewconfig';
import { EMPTY_COMPONENT } from '../../constants/emptyViewComponents';
import { RootState } from '../../reducers/rootReducer';
import { compose } from 'redux';
import ReferencePathSelector from './fields/ReferencePathSelector';
import { Field, FieldContainer, FieldLabel, FieldValue } from './fields/StyledField';
import { COMPONENTS } from '../../constants/global';
import { ReferencePath } from '../../services/propertyPath';

const StyledInput = styled(InputField)`
    display: inline-block;
    margin-bottom: 0.5rem;
    width: auto;
    margin-right: 0.5rem;
    max-width: 10rem;
`;

const StyledInputWrapper = styled.div`
    display: inline-block;
`;

interface OwnProps {
    item: NormalizedComponentConfig;
}

interface DispatchProps {
    modifyNode: (component: NormalizedComponentConfig) => void;
    changeNodeType: (component: NormalizedComponentConfig) => void;
    removeNode: (childId: number) => void;
}

interface StateProps {
    items: ViewConfigReducer;
}

type Props = StateProps & DispatchProps & OwnProps & RouteComponentProps<{ dataSet: string; collection: string }>;

const ComponentFields: SFC<Props> = ({ item, modifyNode, changeNodeType, removeNode }) => {
    const setMaxItems = (): number => {
        switch (item.type) {
            case COMPONENTS.title:
            case COMPONENTS.divider:
                return 1;
            case COMPONENTS.link:
            case COMPONENTS.internalLink:
            case COMPONENTS.image:
                return 2;
            default:
                return 10;
        }
    };

    const onChangeHandler = (e: FormEvent<HTMLInputElement>): void | false => {
        e.persist();

        const newValue = e.currentTarget.value;

        if (newValue === item.value) {
            return false;
        }

        const newFieldset = { ...item };
        newFieldset.value = newValue;

        return modifyNode(newFieldset);
    };

    const onSelectChangeHandler = (newPath: ReferencePath) => modifyNode({ ...item, referencePath: newPath });

    const onChangeHeadHandler = (option: OptionProps) => {
        const componentKey = option.key;

        if (componentKey === item.type || componentKey === null) {
            return false;
        }

        const { id, name } = item;

        const newFieldset: NormalizedComponentConfig = {
            ...EMPTY_COMPONENT[componentKey],
            childIds: [],
            id,
            name
        };

        if (item.childIds) {
            for (const childId of item.childIds) {
                removeNode(childId);
            }
        }

        return changeNodeType(newFieldset);
    };

    return (
        <FieldContainer>
            <Field>
                <FieldLabel htmlFor={name}>Component</FieldLabel>
                <FieldValue>
                    <Select
                        name={'Component'}
                        options={SELECT_COMPONENT_TYPES}
                        selected={
                            SELECT_COMPONENT_TYPES.find(valueType => valueType.key === item.type) ||
                            SELECT_COMPONENT_TYPES[0]
                        }
                        onChange={onChangeHeadHandler}
                        isFinal={false}
                    />
                </FieldValue>
            </Field>

            <Field>
                {typeof item.value === 'string' && <FieldLabel htmlFor={name}>{item.type}</FieldLabel>}
                {typeof item.value === 'string' && (
                    <FieldValue>
                        {item.type === 'PATH' ? (
                            <ReferencePathSelector onChange={onSelectChangeHandler} path={item.referencePath || []} />
                        ) : (
                            <StyledInputWrapper>
                                <StyledInput
                                    type={'text'}
                                    title={name}
                                    name={name}
                                    defaultValue={item.value}
                                    onBlur={onChangeHandler}
                                />
                            </StyledInputWrapper>
                        )}
                    </FieldValue>
                )}
            </Field>

            {item.type !== COMPONENTS.literal &&
                item.type !== COMPONENTS.path &&
                item.childIds && (
                    <DraggableForm maxItems={setMaxItems()} configType={'view'} id={item.id} noForm={true} />
                )}
        </FieldContainer>
    );
};

const mapStateToProps = (state: RootState) => ({
    items: state.viewconfig
});

const mapDispatchToProps = (
    dispatch: Dispatch<OwnProps & RouteComponentProps<{ dataSet: string; collection: string }>>,
    { item: { id }, match }: Props
) => ({
    removeNode: (childId: number) => dispatch(deleteViewConfigNode(childId)),
    changeNodeType: (component: NormalizedComponentConfig) =>
        dispatch(changeViewConfigNodeType(id, component, match.params.collection)),
    modifyNode: (component: NormalizedComponentConfig) => dispatch(modifyViewConfigNode(id, component))
});

export default compose<SFC<OwnProps>>(withRouter, connect(mapStateToProps, mapDispatchToProps))(ComponentFields);
