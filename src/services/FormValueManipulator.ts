import { ComponentFormType } from '../typings/index';
// import EMPTY_VIEW_COMPONENTS from '../constants/emptyViewComponents';
import { Component } from '../typings/schema';
import { NormalizedComponent } from '../reducers/viewconfig';

export const renderName = (typename: string, idx: number, field?: string): string => (
    `${idx}_${typename}${field ? '_' + field : ''}`
);

export const addExtraInfo = (item: NormalizedComponent): ComponentFormType => ({
    ...item,
    name: renderName(item.type, item.id)
});

export const removeExtraInfo = (items: ComponentFormType[]): Component[] => {
    const newItems = items.slice();
    newItems.forEach(item => {
        delete item.name;
        delete item.id;
        delete item.childIds;
    });

    return newItems;
};

// const renderEmptyViewComponent = (componentKey, idx) => {
//     if (!EMPTY_VIEW_COMPONENTS.hasOwnProperty(componentKey)) {
//         return null;
//     }
//
//     return addExtraInfo(EMPTY_VIEW_COMPONENTS[componentKey]);
// };
