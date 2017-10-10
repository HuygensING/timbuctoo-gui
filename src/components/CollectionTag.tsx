import React, { SFC } from 'react';
import styled from 'styled-components';

import Translations from '../services/Translations';
import { CollectionMetadata, Property } from '../typings/schema';
import { ROUTE_PATHS } from '../constants/routeNaming';
import { encode } from '../services/UrlStringCreator';
import { Subtitle, Label } from './layout/StyledCopy';
import Button from './layout/Button';
import { BUTTON_TYPES } from '../constants/global';

import ProgressBar from './ProgressBar';
import { getValue } from '../services/getValue';

import Tooltip from './Tooltip';
import { isKnown } from '../services/HandleUnknowns';

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

const renderButtonType = (CollectionIsKnown: boolean, CollectionIsSelected: boolean) => {
    if (!CollectionIsKnown) {
        return BUTTON_TYPES.disabled;
    }

    return CollectionIsSelected
        ? BUTTON_TYPES.dark
        : BUTTON_TYPES.inverted;
};

const UNKNOWN: string = Translations.translate('details.collection.unknown');

const CollectionTag: SFC<Props> = ({ isOpen, index, toggleOpen, collection, currentCollectionListId, dataSetId }) => {
    const { title, collectionId, collectionListId, properties, total } = collection;

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
                    <Subtitle>{collectionId} ({total})</Subtitle>
                    <PropertyLabel>{Translations.translate('details.collection.property')}</PropertyLabel><DensityLabel>{Translations.translate('details.collection.density')}</DensityLabel>
                </PropertiesHeader>
                {properties.items.map(renderPropertyDensity)}
            </Tooltip>
        );
    };

    const renderButton = () => {
        const collectionKnown = isKnown(collection);
        const collectionSelected =  !!currentCollectionListId && currentCollectionListId === collectionListId;

        const buttonType = renderButtonType(collectionKnown, collectionSelected);
        const buttonTitle = getValue(title) || (collectionKnown ? collectionId : UNKNOWN);

        return (
            <Button type={buttonType} to={`${ROUTE_PATHS.details}/${dataSetId}/${encode(collectionListId)}`}>
                {buttonTitle} ({total})
            </Button>
        );
    };

    return (
        <ListItem
            onMouseEnter={() => toggleOpen(index)}
            onMouseLeave={() => toggleOpen(null)}
        >
            {renderButton()}
            {isOpen && renderPropertiesPanel()}
        </ListItem>
    );
};

export default CollectionTag;