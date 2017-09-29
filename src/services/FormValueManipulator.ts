import { ComponentFormType, ComponentType } from '../typings/index';
import EMPTY_VIEW_COMPONENTS from '../constants/emptyViewComponents';

const addExtraInfo = (items: any[]): ComponentFormType[] => {
    const newItems: any = [];

    items.forEach((item, idx) => {
        newItems.push(setComponentInfo(item, idx));
    });

    return newItems;
};

const removeExtraInfo = (items: ComponentFormType[]): ComponentType[] => {
    const newItems = items.slice();
    newItems.forEach(item => delete item.componentInfo);

    return newItems;
};

const setComponentInfo = (item: any, idx: number) => {
    const newItem = {...item};

    newItem.componentInfo = {
        name: renderName(item.__typename, idx),
        value: {isKey: false, fields: [item.__typename]},
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