import { ComponentFormType } from '../typings/index';
import { Component } from '../typings/schema';
import { NormalizedComponent } from '../typings/index';

export const renderName = (typename: string, idx: number, field?: string): string => (
    `${idx}_${typename}${field ? '_' + field : ''}`
);

export const addExtraInfo = (item: NormalizedComponent): ComponentFormType => ({
    ...item,
    name: renderName(item.type, item.id)
});

export const removeExtraInfo = (item: ComponentFormType): Component => {
    item = { ...item };
    delete item.name;
    delete item.id;
    delete item.childIds;
    return item;
};
