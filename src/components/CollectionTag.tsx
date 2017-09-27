import React, { SFC } from 'react';
import styled from 'styled-components';

import { CollectionMetadata, Property } from '../typings/timbuctoo/schema';
import { ROUTE_PATHS } from '../constants/routeNaming';
import { encode } from '../services/UrlStringCreator';
import Button from './layout/Button';
import { BUTTON_TYPES } from '../constants/global';

import ProgressBar from './ProgressBar';

interface Props {
    isOpen: boolean;
    index: number;
    dataSetId: string;
    currentCollectionListId: string | undefined;
    collection: CollectionMetadata;
    toggleOpen: Function;
}

const ListItem = styled.li`
    position: relative;
    display: inline-block;
    margin-right: 1rem;
`;

const PropertiesPanel = styled.div`
    position: absolute;
    pointer-events: none;
    top: 4rem;
    left: 0;

    padding: 1rem;

    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    background: ${props => props.theme.colors.shade.light};
    
    // transform: translateX(-50%);
    
    z-index: 10;
    
    &:before {
        position: absolute;
        top: 0;
        left: 1rem;
        
        width: 1rem;
        height: 1rem;
        
        background: ${props => props.theme.colors.shade.light};

        transform: translateY(-50%) rotate(45deg);
        content: '';
    }
`;

const CollectionTag: SFC<Props> = ({ isOpen, index, toggleOpen, collection, currentCollectionListId, dataSetId }) => {
    const { title, collectionListId, properties } = collection;

    const type = currentCollectionListId && currentCollectionListId === collectionListId
        ? BUTTON_TYPES.dark
        : BUTTON_TYPES.inverted;

    const renderPropertyDensity = (property: Property, idx: number) => {
        return (
            <ProgressBar
                key={idx}
                label={property.name}
                width={'100px'}
                progress={property.density}
            />
        );
    };

    const renderPropertiesPanel = () => {
        return (
            <PropertiesPanel>
                {properties.items.map(renderPropertyDensity)}
            </PropertiesPanel>
        );
    };

    return (
        <ListItem
            onMouseEnter={() => toggleOpen(index)}
            onMouseLeave={() => toggleOpen(null)}
        >
            <Button type={type} to={`${ROUTE_PATHS.details}/${dataSetId}/${encode(collectionListId)}`}>{title}</Button>
            {isOpen && renderPropertiesPanel()}
        </ListItem>
    );
};

export default CollectionTag;