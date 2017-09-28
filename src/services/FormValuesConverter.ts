import { ComponentFormType, ComponentType } from '../typings/index';

const addExtraInfo = (items: any[]): ComponentFormType[] => {
    const newItems = items.slice();

    newItems.forEach((item, idx: number) => {
        item.componentInfo = {
            name: renderName(item.__typename, idx),
            value: {isKey: false, fields: [item.__typename]},
            index: idx
        };
    });

    return newItems;
};

const removeExtraInfo = (items: ComponentFormType[]): ComponentType[] => {
    const newItems = items.slice();

    newItems.forEach(item => delete item.componentInfo);
    return newItems;
};

const renderName = (typename: string, idx: number, field?: string, ): string => (
    `${idx}_${typename}${field ? '_' + field : ''}`
);

export { addExtraInfo, removeExtraInfo, renderName };