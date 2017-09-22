import React, { SFC } from 'react';
import { SortableContainer } from 'react-sortable-hoc';
import { ComponentType } from '../typings/index';

interface Props {
    items: ComponentType[];
    openCloseFn: Function;
    openedIndex: number;
    Component: any;
    onSortEnd: (props: { oldIndex: number, newIndex: number }) => void;
}

const SortableList: SFC<Props> = ({items, openCloseFn, openedIndex, Component}) => {

    const renderListItem = (item: ComponentType, idx) => {
        const isOpen = openedIndex === idx;
        const openClose = () => openCloseFn(isOpen ? null : idx);

        return (
            <Component
                key={idx}
                isOpen={openedIndex === idx}
                item={item}
                openCloseFn={openClose}
                index={idx}
            />
        );
    };

    return <ul>{items.map(renderListItem)}</ul>;
};

export default SortableContainer(SortableList);