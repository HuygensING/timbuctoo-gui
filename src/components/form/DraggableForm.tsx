import React, { PureComponent } from 'react';

import DraggableList from '../DraggableList';
import { ComponentFormType } from '../../typings/index';
import { addExtraInfo } from '../../services/FormValueManipulator';
import styled from '../../styled-components';
import { DRAGGABLE_COMPONENTS } from '../../constants/global';
import { Component } from '../../typings/schema';
import { SubmitButton } from './fields/Buttons';
import { addViewConfigNode, getNodeById, NormalizedComponent } from '../../reducers/viewconfig';
import { connect } from 'react-redux';

interface Props {
    items: NormalizedComponent[];
    onSend: (e: {}) => void;
    addItem: (component: Component) => void;
    id: number;
    noForm?: boolean;
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

const StyledSubmitButton = styled(SubmitButton)`
  max-width: 15rem;
  float: right;
`;

class DraggableForm extends PureComponent<Props, State> {

    state = {
        openedIndex: null
    };

    // constructor (props: Props) {
    //     super(props);

    // this.state = {
    //     listItems: addExtraInfo(props.items),
    //     openedIndex: null
    // };
    // }

    // onSortEnd ({ oldIndex, newIndex }: { oldIndex: number, newIndex: number }) {
    //     const listItems = arrayMove(this.state.listItems, oldIndex, newIndex);
    //     const openedIndex = oldIndex === this.state.openedIndex ? newIndex : this.state.openedIndex;
    //
    //     this.setState({ listItems, openedIndex });
    // }

    openCloseFn (idx: number) {

        this.setState({ openedIndex: idx });
    }

    render () {
        return this.props.noForm
            ? this.renderContent()
            : (
                <form onSubmit={this.onSubmit}>
                    {this.renderContent()}
                </form>
            );
    }

    private renderContent () {
        const { openedIndex } = this.state;
        const { items } = this.props;
        const componentProps = {
            openedIndex
        };

        const myNode: NormalizedComponent = getNodeById(this.props.id, items)!;
        const myChildren: ComponentFormType[] = myNode.childIds
            .map(id => getNodeById(id, items)!)
            .map(component => addExtraInfo(component));

        return (
            <div>
                <DraggableList
                    componentType={DRAGGABLE_COMPONENTS.accordeon}
                    componentProps={componentProps}
                    listItems={myChildren}
                    useDragHandle={true}
                />
                {/*onSortEnd={this.onSortEnd}*/}
                <AddListButton type={'button'} onClick={this.addListItem}>+</AddListButton>
                {this.props.noForm
                    ? <StyledSubmitButton type={'button'} onClick={this.onSubmit}>save</StyledSubmitButton>
                    : <StyledSubmitButton type="submit">save</StyledSubmitButton>
                }
            </div>
        );
    }

    private addListItem () {
        // const listItems: any = this.state.listItems.slice();

        // const newListItem = renderEmptyViewComponent(COMPONENTS.value, this.state.listItems.length);
        // this.props.addItem(newListItem);

        // listItems.push(newListItem);

        // this.setState({ listItems });
    }

    private onSubmit (e: any) {
        e.preventDefault();
        // this.props.onSend(this.state.listItems);
    }
}

const mapDispatchToProps = dispatch => ({
    addItem: (component: Component) => addViewConfigNode(component)
});

export default connect(({ viewconfig: items }) => ({ items }), mapDispatchToProps)(DraggableForm);
