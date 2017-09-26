import React, { SFC } from 'react';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import { ComponentType } from '../typings/index';
import Hamburger from './icons/Hamburger';
import styled from 'styled-components';
import Accordeon from './Accordeon';

interface Props {
    items: ComponentType[];
    openCloseFn: Function;
    deleteFn: Function;
    openedIndex: number;
    onSortEnd: (props: { oldIndex: number, newIndex: number }) => void;
}

const CONTAINER_PADDING = 1.5;

const DraggableIcon = styled(Hamburger)`
  position: absolute;
  left: ${CONTAINER_PADDING}rem;
  top: ${CONTAINER_PADDING}rem;
`;

const DragHandle = SortableHandle(DraggableIcon);
const DraggableElement = SortableElement(Accordeon);

const DraggableList: SFC<Props> = ({items, openCloseFn, deleteFn, openedIndex}) => {

    const renderListItem = (item: ComponentType, idx) => {
        const isOpen = openedIndex === idx;
        const openClose = () => openCloseFn(isOpen ? null : idx);
        const onDeleteFn = () => deleteFn(idx);

        return (
                <DraggableElement
                    key={idx}
                    index={idx}
                    isOpen={openedIndex === idx}
                    onDeleteFn={onDeleteFn}
                    openCloseFn={openClose}
                    padding={CONTAINER_PADDING}
                    item={item}
                >
                    <DragHandle/>
                </DraggableElement>
        );
    };

    return <ul>{items.map(renderListItem)}</ul>;
};

export default SortableContainer(DraggableList);