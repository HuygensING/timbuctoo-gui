import React from 'react';

import ContentTitle from '../components/content/ContentTitle';
import ContentImage from '../components/content/ContentImage';
import ContentValue from '../components/content/ContentValue';
import ContentLink from '../components/content/ContentLink';
import ContentKeyValue from '../components/content/ContentKeyValue';
import ContentDivider from '../components/content/ContentDivider';

import { COMPONENTS } from '../constants/global';
import { ComponentValue } from '../typings/timbuctoo/schema';

interface ComponentLoaderProps {
    component: any;
    data: any;
}

const ComponentLoader = ({ component, data }: ComponentLoaderProps) => {

    const getTreeValue = (fields) => {
        let tree = {...data};

        for (let i = 0, len = fields.length; i < len; i++) {
            const key = fields[i];

            if (!tree || !tree[key]) {
                break;
            }

            tree = tree[key];
        }

        return tree.value ? tree.value : null;
    };

    const getValue = (values: ComponentValue) => {
        if (!values) { return null; }

        if (values.field) {
            return values.field;
        } else if (values.fields && Array.isArray(values.fields)) {
            return getTreeValue(values.fields);
        }

        return null;
    };

    const renderComponent = () => {
        switch (component.type) {
            case COMPONENTS.title:
                return <ContentTitle>{getValue(component.value) || 'Title'}</ContentTitle>;

            case COMPONENTS.value:
                return <ContentValue>{getValue(component.value) || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a nulla convallis, venenatis odio vel, dictum sapien. Integer malesuada libero at massa pulvinar, sed tincidunt lacus rhoncus. Cras at elit non tellus euismod accumsan. In bibendum sed felis non semper. Donec dapibus maximus nisi, at ullamcorper mauris luctus sodales. In quis euismod orci, sed tincidunt odio. Nullam viverra et turpis eget molestie. Mauris molestie feugiat augue, ut varius metus porttitor vel. Sed sit amet est id dolor efficitur ultrices sit amet vel orci. Morbi pharetra, sapien sed pellentesque volutpat, lectus odio aliquet magna, at faucibus nisl neque et velit.'}</ContentValue>;

            case COMPONENTS.image:
                return <ContentImage src={getValue(component.url) || 'http://lorempixel.com/400/200/city/'} alt={getValue(component.alt)} options={component.options} />;

            case COMPONENTS.link:
                return <ContentLink to={getValue(component.url) || 'https://github.com/HuygensING/timbuctoo-gui'}>{getValue(component.value) || 'Link'}</ContentLink>;

            case COMPONENTS.divider:
                return <ContentDivider title={getValue(component.title)} />;

            case COMPONENTS.keyValue:
                return <ContentKeyValue label={getValue(component.key)} values={component.values} data={data}/>;

            default:
                return null;
        }
    };

    return renderComponent();
};

export default ComponentLoader;