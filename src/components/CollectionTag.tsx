import React, { SFC } from 'react';
import styled from 'styled-components';

import translate from '../services/translate';
import { CollectionMetadata, Property } from '../typings/schema';
import { ROUTE_PATHS } from '../constants/routeNaming';
import { encode } from '../services/UrlStringCreator';
import { Subtitle, Label } from './layout/StyledCopy';
import Button from './layout/Button';
import { BUTTON_TYPES } from '../constants/global';

import ProgressBar from './ProgressBar';
import { getValue } from '../services/getValue';

import Tooltip from './Tooltip';

interface Props {
    isOpen: boolean;
    index: number;
    dataSetId: string;
    currentCollectionListId?: string | null;
    collection: CollectionMetadata;
    toggleOpen: Function;
}

const ListItem = styled.li`
    position: relative;
    display: inline-block;
    margin-top: 0.5rem;
    margin-right: 1rem;
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
            <Tooltip>
                <PropertiesHeader>
                    <Subtitle>{collectionId}</Subtitle>
                    <PropertyLabel>{translate('details.collection.property')}</PropertyLabel><DensityLabel>{translate('details.collection.density')}</DensityLabel>
                </PropertiesHeader>
                {properties.items.map(renderPropertyDensity)}
            </Tooltip>
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