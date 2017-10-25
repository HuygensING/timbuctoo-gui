import { ComponentFormType } from '../typings/index';
import { Component } from '../typings/schema';
import { NormalizedComponent } from '../reducers/viewconfig';

export const renderName = (typename: string, idx: number, field?: string): string => (
    `${idx}_${typename}${field ? '_' + field : ''}`
);

export const addExtraInfo = (item: NormalizedComponent): ComponentFormType => ({
    ...item,
    name: renderName(item.type, item.id)
});

// warning! if it wasn't obvious enough: this function mutates!
export const removeExtraInfo = (item: ComponentFormType): Component => {
    delete item.name;
    delete item.id;
    delete item.childIds;
    return item;
};

export const removeExtraInfos = (items: ComponentFormType[]): Component[] => {
    const newItems = items.slice();
    newItems.forEach(item => {
        delete item.name;
        delete item.id;
        delete item.childIds;
    });

    return newItems;
};
