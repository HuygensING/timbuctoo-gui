import React, { PureComponent } from 'react';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import Hamburger from './icons/Hamburger';
import styled from 'styled-components';
import { CONTAINER_PADDING, DRAGGABLE_COMPONENTS } from '../constants/global';
import Accordeon from './Accordeon';

// TODO: Abstractify rendering components into the DraggableList.
// If we pass a component as prop, which then needs to be dynamically wrapped into
// a SortableElement, that component will destroy and create a new instance every time
interface Props {
    listItems: any[];
    componentType: 'accordeon' | 'block';
    componentProps: any;
    onSortEnd: (props: { oldIndex: number, newIndex: number }) => void;
}

const DraggableIcon = styled(Hamburger)`
  position: absolute;
  left: ${CONTAINER_PADDING}rem;
  top: ${CONTAINER_PADDING}rem;
`;

const DragHandle = SortableHandle(DraggableIcon);
const DraggableElement = SortableElement(Accordeon);

class DraggableList extends PureComponent<Props> {

    constructor () {
        super();

        this.renderListItem = this.renderListItem.bind(this);
    }

    renderListItem ( listItem: any, idx: number) {
        const { componentType, componentProps } = this.props;

        if (componentType === DRAGGABLE_COMPONENTS.accordeon) {
            return (
                <DraggableElement
                    key={idx}
                    index={idx}
                    item={listItem}
                    idx={idx}
                    {...componentProps}
                >
                    <DragHandle/>
                </DraggableElement>
            );
        }

        return null;
    }

    render () {
        const { listItems } = this.props;

        return (
            <ul>{listItems.map(this.renderListItem)}</ul>
        );
    }
}

export default SortableContainer(DraggableList);