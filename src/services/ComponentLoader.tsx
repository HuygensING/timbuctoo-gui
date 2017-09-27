import React from 'react';

import ContentTitle from '../components/content/ContentTitle';
import ContentImage from '../components/content/ContentImage';
import ContentValue from '../components/content/ContentValue';
import ContentLink from '../components/content/ContentLink';
import ContentKeyValue from '../components/content/ContentKeyValue';
import ContentDivider from '../components/content/ContentDivider';

import { COMPONENTS } from '../constants/global';

interface ComponentLoaderProps {
    component: any;
    data: any;
}

const ComponentLoader = ({ component, data }: ComponentLoaderProps) => {

    const getValue = (key) => data && data[key] && data[key].value || '';

    const renderComponent = () => {
        switch (component.__typename) {
            case COMPONENTS.title:
                return <ContentTitle>{getValue(component.valueKey) || 'Fake title'}</ContentTitle>;

            case COMPONENTS.value:
                return <ContentValue>{getValue(component.valueKey) || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a nulla convallis, venenatis odio vel, dictum sapien. Integer malesuada libero at massa pulvinar, sed tincidunt lacus rhoncus. Cras at elit non tellus euismod accumsan. In bibendum sed felis non semper. Donec dapibus maximus nisi, at ullamcorper mauris luctus sodales. In quis euismod orci, sed tincidunt odio. Nullam viverra et turpis eget molestie. Mauris molestie feugiat augue, ut varius metus porttitor vel. Sed sit amet est id dolor efficitur ultrices sit amet vel orci. Morbi pharetra, sapien sed pellentesque volutpat, lectus odio aliquet magna, at faucibus nisl neque et velit.'}</ContentValue>;

            case COMPONENTS.image:
                return <ContentImage src={getValue(component.urlKey) || 'http://lorempixel.com/400/200/cats/'} alt={getValue(component.altKey)} options={component.options} />;

            case COMPONENTS.link:
                return <ContentLink to={getValue(component.urlKey)}>{getValue(component.valueKey) || 'Fake link'}</ContentLink>;

            case COMPONENTS.divider:
                return <ContentDivider title={component.title} />;

            case COMPONENTS.keyValue:
                return <ContentKeyValue label={component.key} values={component.values} data={data}/>;

            default:
                break;
        }
        return null;
    };

    return renderComponent();
};

export default ComponentLoader;