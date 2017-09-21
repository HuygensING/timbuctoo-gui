import React from 'react';

import { Title, Link } from '../components/layout/StyledCopy';
import Image from '../components/layout/Image';
import KeyValue from '../components/entry/KeyValue';
import Divider from '../components/entry/Divider';

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
            case COMPONENTS.value:
                return <Title>{getValue(component.valueKey)}</Title>;

            case COMPONENTS.image:
                return <Image src={getValue(component.urlKey)} alt={getValue(component.altKey)} ratio={16 / 9} />;

            case COMPONENTS.link:
                return <Link to={getValue(component.urlKey)}>{getValue(component.valueKey)}</Link>;

            case COMPONENTS.divider:
                return <Divider title={getValue(component.valueKey)} />;

            case COMPONENTS.keyValue:
                return <KeyValue label={component.key} values={component.values} data={data}/>;

            default:
                break;
        }
        return null;
    };

    return renderComponent();
};

export default ComponentLoader;