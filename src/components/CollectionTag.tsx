import React, { SFC } from 'react';
import { lighten } from 'polished/lib';
import styled, { keyframes } from 'styled-components';

import Translations from '../services/Translations';
import { CollectionMetadata, Property } from '../typings/timbuctoo/schema';
import { ROUTE_PATHS } from '../constants/routeNaming';
import { encode } from '../services/UrlStringCreator';
import { Subtitle, Label } from './layout/StyledCopy';
import Button from './layout/Button';
import { BUTTON_TYPES } from '../constants/global';

import ProgressBar from './ProgressBar';
import { getValue } from '../services/getValue';

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

const PropertiesPanelAnimation = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const PropertiesPanel = styled.div`
    position: absolute;
    pointer-events: none;
    top: 3.5rem;
    left: 0;

    padding: 1rem;

    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    background: ${props => props.theme.colors.white};
    
    z-index: 10;

    animation: ${PropertiesPanelAnimation} 0.3s ease-in-out;
    
    &:before {
        position: absolute;
        top: 0;
        left: 1rem;
        
        width: 1rem;
        height: 1rem;
        
        border-top: 1px solid ${props => lighten(0.04, props.theme.colors.shade.light)};
        border-right: 1px solid ${props => props.theme.colors.shade.light};
        background: ${props => props.theme.colors.white};

        transform: translateY(-50%) rotate(-45deg);
        content: '';
    }
`;

const PropertiesHeader = styled.div`
    position: relative;
    display: block;
    padding-bottom: 0.5rem;
`;

const PropertyLabel = styled(Label)`
    display: inline-block;
    width: 10rem;
    margin-right: 1rem;
`;

const DensityLabel = styled(Label)`
`;

const CollectionTag: SFC<Props> = ({ isOpen, index, toggleOpen, collection, currentCollectionListId, dataSetId }) => {
    const { title, collectionId, collectionListId, properties } = collection;

    let buttonType = currentCollectionListId && currentCollectionListId === collectionListId
        ? BUTTON_TYPES.dark
        : BUTTON_TYPES.inverted;
    
    let tagTitle = collectionId;
    if (collectionId.indexOf('vocabulary_unknown') !== -1) {
        tagTitle = 'Uknown';
        buttonType = BUTTON_TYPES.disabled;
    }

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
                <PropertiesHeader>
                    <Subtitle>{collectionId}</Subtitle>
                    <PropertyLabel>{Translations.translate('details.collection.property')}</PropertyLabel><DensityLabel>{Translations.translate('details.collection.density')}</DensityLabel>
                </PropertiesHeader>
                {properties.items.map(renderPropertyDensity)}
            </PropertiesPanel>
        );
    };

    return (
        <ListItem
            onMouseEnter={() => toggleOpen(index)}
            onMouseLeave={() => toggleOpen(null)}
        >
            <Button type={buttonType} to={`${ROUTE_PATHS.details}/${dataSetId}/${encode(collectionListId)}`}>{getValue(title) || tagTitle}</Button>
            {isOpen && renderPropertiesPanel()}
        </ListItem>
    );
};

export default CollectionTag;