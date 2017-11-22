import React, { PureComponent } from 'react';

import DraggableList from '../DraggableList';
import { ConfigurableItem, NormalizedComponent } from '../../typings/index';
import styled from '../../styled-components';
import { COMPONENTS, DRAGGABLE_COMPONENTS, EMPTY_FACET_CONFIG } from '../../constants/global';
import { Component, FacetConfig } from '../../typings/schema';
import { SubmitButton } from './fields/Buttons';
import {
    addViewConfigChild, addViewConfigNode, getNodeById, lastId, sortViewConfigChild
} from '../../reducers/viewconfig';
import { connect } from 'react-redux';
import EMPTY_VIEW_COMPONENTS from '../../constants/emptyViewComponents';
import { RootState } from '../../reducers/rootReducer';
import { addFacetConfigItem, sortFacetConfigItem } from '../../reducers/facetconfig';

interface StateProps {
    items: ConfigurableItem[];
    lastId: number;
}

interface DispatchProps {
    addItem: (item: Component | FacetConfig) => void;
    addChild: (childIndex: number) => void;
    sortItem: (oldIndex: number, newIndex: number) => void;
    removeItem: (id: number) => void;
}

interface OwnProps {
    onSend: (e: {}) => void;
    id: number;
    noForm?: boolean;
    configType: 'facet' | 'view';
}

type Props = StateProps & DispatchProps & OwnProps;

interface State {
    openedIndex: number | null;
}

const AddListButton = styled.button`
  width: 100%;
  border: 1px dashed ${props => props.theme.colors.shade.light};
  padding: 1rem 1.75rem;
  margin-bottom: 1.5rem;
  font: ${props => props.theme.fonts.title};
  text-align: right;
  cursor: pointer;
  border-radius: .25rem;
  
  &:hover {
    color: ${props => props.theme.colors.primary.medium};
    border-color: ${props => props.theme.colors.primary.light};
  }
`;

const StyledSubmitButton = SubmitButton.extend`
  max-width: 15rem;
  float: right;
`;

class DraggableForm extends PureComponent<Props, State> {

    state = {
        openedIndex: null
    };

    render () {
        return this.props.noForm
            ? this.renderContent()
            : (
                <form onSubmit={this.onSubmit}>
                    {this.renderContent()}
                </form>
            );
    }

    private openCloseFn = (idx: number) => {
        this.setState({ openedIndex: idx });
    }

    private renderContent () {
        const { openedIndex } = this.state;
        const { items, configType } = this.props;
        const componentProps = {
            openedIndex,
            openCloseFn: this.openCloseFn
        };

        return (
            <div>
                <DraggableList
                    componentType={DRAGGABLE_COMPONENTS.accordeon}
                    componentProps={componentProps}
                    listItems={items}
                    configType={configType}
                    useDragHandle={true}
                    onSortEnd={this.onSortEnd}
                />
                <AddListButton type={'button'} onClick={this.addListItem}>+</AddListButton>
                {this.props.noForm
                    ? <StyledSubmitButton onClick={this.onSubmit}>save</StyledSubmitButton>
                    : <StyledSubmitButton type="submit">save</StyledSubmitButton>
                }
            </div>
        );
    }

    private onSortEnd = ({ oldIndex, newIndex }: { oldIndex: number, newIndex: number }) => {
        this.setState(state => ({
            openedIndex: oldIndex === state.openedIndex ? newIndex : state.openedIndex
        }));
        this.props.sortItem(oldIndex, newIndex);
    }

    private addListItem = () => {
        this.props.addItem(this.props.configType === 'view' ? EMPTY_VIEW_COMPONENTS[COMPONENTS.value] : EMPTY_FACET_CONFIG);
    }

    private onSubmit (e: any) {
        e.preventDefault();
        // this.props.onSend(this.state.listItems);
    }
}

const mapDispatchToProps = (dispatch, { id, configType, ...rest }: Props) => {
    if (configType === 'view') {
        return {
            sortItem: (oldIndex: number, newIndex: number) => dispatch(sortViewConfigChild(id, oldIndex, newIndex)),
            addChild: (childId) => dispatch(addViewConfigChild(id, childId)),
            addItem: (component: Component) => dispatch(addViewConfigNode(component))
        };
    } else {
        return {
            addItem: (facetConfig: FacetConfig) => dispatch(addFacetConfigItem(facetConfig)),
            sortItem: (oldIndex: number, newIndex: number) => dispatch(sortFacetConfigItem(oldIndex, newIndex)),
        };
    }
};

const mergeProps = (stateProps: StateProps, dispatchProps: DispatchProps, ownProps: OwnProps): Props => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    addItem: (item: ConfigurableItem) => {
        dispatchProps.addItem(item);
        if (ownProps.configType === 'view') {
            dispatchProps.addChild(stateProps.lastId);
        }
    }
});

const mapStateToProps = (state: RootState, { id, configType }: Props) => {
    let items: ConfigurableItem[];
    if (configType === 'view') {
        const myNode: NormalizedComponent = getNodeById(id, state.viewconfig)!;
        items = myNode.childIds.map(childId => getNodeById(childId, state.viewconfig)!);
    } else {
        items = state.facetconfig;
    }

    return {
        items,
        lastId: lastId(state.viewconfig)
    };
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(DraggableForm);
