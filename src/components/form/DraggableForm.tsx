import React, { PureComponent } from 'react';

import DraggableList from '../DraggableList';
import { NormalizedComponent } from '../../typings/index';
import styled from '../../styled-components';
import { COMPONENTS, DRAGGABLE_COMPONENTS } from '../../constants/global';
import { Component } from '../../typings/schema';
import { SubmitButton } from './fields/Buttons';
import {
    addViewConfigChild, addViewConfigNode, getNodeById, lastId, sortViewConfigChild
} from '../../reducers/viewconfig';
import { connect } from 'react-redux';
import EMPTY_VIEW_COMPONENTS from '../../constants/emptyViewComponents';
import { RootState } from '../../reducers/rootReducer';

interface Props {
    items: NormalizedComponent[];
    onSend: (e: {}) => void;
    addItem: (component: Component) => void;
    addChild: (childId: number) => void;
    sortChild: (oldIndex: number, newIndex: number) => void;
    id: number;
    noForm?: boolean;
    lastId: number;
}

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
        const { items } = this.props;
        const componentProps = {
            openedIndex,
            openCloseFn: this.openCloseFn
        };

        const myNode: NormalizedComponent = getNodeById(this.props.id, items)!;
        const myChildren: NormalizedComponent[] =
            myNode.childIds.map(id => getNodeById(id, items)!);

        return (
            <div>
                <DraggableList
                    componentType={DRAGGABLE_COMPONENTS.accordeon}
                    componentProps={componentProps}
                    listItems={myChildren}
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
        this.props.sortChild(oldIndex, newIndex);
    }

    private addListItem = () => {
        this.props.addItem(EMPTY_VIEW_COMPONENTS[COMPONENTS.value]);
        this.props.addChild(this.props.lastId + 1);
    }

    private onSubmit (e: any) {
        e.preventDefault();
        // this.props.onSend(this.state.listItems);
    }
}

const mapDispatchToProps = (dispatch, { id }: Props) => ({
    addItem: (component: Component) => dispatch(addViewConfigNode(component)),
    addChild: (childId) => dispatch(addViewConfigChild(id, childId)),
    sortChild: (oldIndex, newIndex) => dispatch(sortViewConfigChild(id, oldIndex, newIndex))
});

const mapStateToProps = (state: RootState) => ({
    items: state.viewconfig,
    lastId: lastId(state.viewconfig)
});

export default connect(mapStateToProps, mapDispatchToProps)(DraggableForm);
