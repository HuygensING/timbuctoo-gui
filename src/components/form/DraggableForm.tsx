import React, { PureComponent } from 'react';
import { arrayMove } from 'react-sortable-hoc';

import DraggableList from '../DraggableList';
import { ComponentFormType, ComponentType } from '../../typings/index';
import { addExtraInfo, removeExtraInfo, renderName } from '../../services/FormValuesConverter';
import { SubmitButton } from './FormElements';
import Accordeon from '../Accordeon';
import styled from '../../styled-components';
import { COMPONENTS } from '../../constants/global';

interface Props {
    items: ComponentType[];
    onSend: (e: {}) => void;
    noForm?: boolean;
}

interface State {
    listItems: ComponentFormType[];
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
    static newComponent (idx: number) {
        return {
            __typename: COMPONENTS.value,
            componentInfo: {
                name: renderName(COMPONENTS.value, idx),
                value: {isKey: false, fields: [COMPONENTS.value]},
                index: idx
            },
            value: {
                isKey: true,
                fields: ['...']
            }
        };
    };

    constructor (props: Props) {
        super(props);

        this.state = {
            listItems: addExtraInfo(props.items),
            openedIndex: null
        };

        this.addListItem = this.addListItem.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.resolveChange = this.resolveChange.bind(this);
        this.openCloseFn = this.openCloseFn.bind(this);
        this.deleteFn = this.deleteFn.bind(this);
        this.onSortEnd = this.onSortEnd.bind(this);
    }

    onSortEnd ({oldIndex, newIndex}: { oldIndex: number, newIndex: number }) {
        const listItems = arrayMove(this.state.listItems, oldIndex, newIndex);
        const openedIndex = oldIndex === this.state.openedIndex ? newIndex : this.state.openedIndex;

        this.setState({listItems, openedIndex});
    }

    openCloseFn (idx: number) {

        this.setState({openedIndex: idx});
    }

    deleteFn (idx: number) {
        const openedIndex = null;

        const listItems = this.state.listItems.slice();
        listItems.splice(idx, 1);

        this.setState({listItems, openedIndex});
    }

    resolveChange (listItem: ComponentFormType, idx: number) {
        const listItems = this.state.listItems.slice();
        listItems[idx] = listItem;

        this.setState({listItems});
    }

    onSubmit (e: any) {
        e.preventDefault();

        const list = removeExtraInfo(this.state.listItems);
        this.props.onSend(list);
    }

    addListItem () {
        const listItems: any = this.state.listItems.slice();
        listItems.push(DraggableForm.newComponent(this.state.listItems.length));

        this.setState({listItems});
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
        const {listItems, openedIndex} = this.state;
        const componentProps = {
            openedIndex,
            openCloseFn: this.openCloseFn,
            onDeleteFn: this.deleteFn,
            resolveChange: this.resolveChange,
            deleteFn: this.deleteFn
        };

        return (
            <div>
                <DraggableList
                    Component={Accordeon}
                    componentProps={componentProps}

                    listItems={listItems}
                    onSortEnd={this.onSortEnd}
                    useDragHandle={true}
                />
                <AddListButton type={'button'} onClick={this.addListItem}>+</AddListButton>
                { this.props.noForm
                    ? <StyledSubmitButton type={'button'} onClick={this.onSubmit}>save</StyledSubmitButton>
                    : <StyledSubmitButton type="submit">save</StyledSubmitButton>
                }
            </div>
        );
    }
}

export default DraggableForm;