import { ComponentFormType } from '../typings/index';
import EMPTY_VIEW_COMPONENTS from '../constants/emptyViewComponents';
import { Component } from '../typings/timbuctoo/schema';

const addExtraInfo = (items: any[]): ComponentFormType[] => {
    const newItems: any = [];

    items.forEach((item, idx) => {
        newItems.push(setComponentInfo(item, idx));
    });

    return newItems;
};

const removeExtraInfo = (items: ComponentFormType[]): Component[] => {
    const newItems = items.slice();
    newItems.forEach(item => delete item.componentInfo);

    return newItems;
};

const setComponentInfo = (item: any, idx: number) => {
    const newItem = {...item};

    newItem.componentInfo = {
        name: renderName(item.type, idx),
        index: idx
    };

    return newItem;
};

const renderEmptyViewComponent = (componentKey, idx) => {
    if (!EMPTY_VIEW_COMPONENTS.hasOwnProperty(componentKey)) {
        return null;
    }

    return setComponentInfo(EMPTY_VIEW_COMPONENTS[componentKey], idx);
};

const renderName = (typename: string, idx: number, field?: string, ): string => (
    `${idx}_${typename}${field ? '_' + field : ''}`
);

export { addExtraInfo, removeExtraInfo, renderEmptyViewComponent, setComponentInfo, renderName };