import React from 'react';

import ContentTitle from '../components/content/ContentTitle';
import ContentImage from '../components/content/ContentImage';
import ContentValue from '../components/content/ContentValue';
import ContentLink from '../components/content/ContentLink';
import ContentKeyValue from '../components/content/ContentKeyValue';
import ContentDivider from '../components/content/ContentDivider';

import { COMPONENTS } from '../constants/global';

/**
 * TODO: Set new component types as discussed yesterday with Ian
 * Old types:
 * - ValueString
 * - DataKeyValue
 * - DataTable
 * 
 * New Types:
 * - ValueComponent
 * - LinkComponent
 * - ImageComponent
 * - KeyValueComponent
 * - TableComponent
 * - DividerComponent
 */

interface ComponentLoaderProps {
    component: any;
    data: any;
}

const ComponentLoader = ({ component, data }: ComponentLoaderProps) => {

    const getValue = (key) => data && data[key] && data[key].value || '';

    const renderComponent = () => {
        switch (component.__typename) {
            case COMPONENTS.title:
                return <ContentTitle>{getValue(component.valueKey)}</ContentTitle>;

            case COMPONENTS.value:
                return <ContentValue>{getValue(component.valueKey)}</ContentValue>;

            case COMPONENTS.image:
                return <ContentImage src={getValue(component.urlKey)} alt={getValue(component.altKey)} />;

            case COMPONENTS.link:
                return <ContentLink to={getValue(component.urlKey)}>{getValue(component.valueKey)}</ContentLink>;

            case COMPONENTS.divider:
                return <ContentDivider title={getValue(component.valueKey)} />;

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