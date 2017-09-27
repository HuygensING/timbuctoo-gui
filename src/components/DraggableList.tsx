import React, { SFC } from 'react';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import Hamburger from './icons/Hamburger';
import styled from 'styled-components';
import { CONTAINER_PADDING } from '../constants/global';

interface Props {
    listItems: any[];
    Component: any;
    componentProps: any;
    onSortEnd: (props: { oldIndex: number, newIndex: number }) => void;
}

const DraggableIcon = styled(Hamburger)`
  position: absolute;
  left: ${CONTAINER_PADDING}rem;
  top: ${CONTAINER_PADDING}rem;
`;

const DragHandle = SortableHandle(DraggableIcon);

const DraggableList: SFC<Props> = ({listItems, Component, componentProps}) => {

    const DraggableElement = SortableElement(Component);

    const renderListItem = (listItem, idx) => {
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
    };

    return <ul>{listItems.map(renderListItem)}</ul>;
};

export default SortableContainer(DraggableList);