import React, { SFC } from 'react';
import styled from 'styled-components';

import translate from '../services/translate';
import { CollectionMetadata, Property } from '../typings/schema';
import { ROUTE_PATHS } from '../constants/routeNaming';
import { encode } from '../services/UrlStringCreator';
import { Subtitle, Label } from './layout/StyledCopy';
import { ButtonLink } from './layout/Button';
import { BUTTON_TYPES } from '../constants/global';

import ProgressBar from './ProgressBar';
import { getValue } from '../services/getValue';

import Tooltip from './Tooltip';
import { isKnown } from '../services/HandleUnknowns';
import { ButtonVariant } from '../typings/layout';

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

const getButtonVariant = (CollectionIsKnown: boolean, CollectionIsSelected: boolean): ButtonVariant => {
    if (!CollectionIsKnown) {
        return BUTTON_TYPES.disabled;
    }

    return CollectionIsSelected
        ? BUTTON_TYPES.dark
        : BUTTON_TYPES.inverted;
};

const CollectionTag: SFC<Props> = ({ isOpen, index, toggleOpen, collection, currentCollectionListId, dataSetId }) => {
    const { title, collectionId, collectionListId, properties, total } = collection;

    const renderPropertiesPanel = () => {
        return (
            <Tooltip>
                <PropertiesHeader>
                    <Subtitle>{collectionId} ({total})</Subtitle>
                    <PropertyLabel>{translate('details.collection.property')}</PropertyLabel><DensityLabel>{translate('details.collection.density')}</DensityLabel>
                </PropertiesHeader>
                {properties.items.map((property: Property, idx: number) => (
                    <ProgressBar
                        key={idx}
                        label={property.name}
                        width={'100px'}
                        progress={property.density}
                    />
                ))}
            </Tooltip>
        );
    };

    const renderButton = () => {
        const collectionKnown = isKnown(collection);
        const collectionSelected = !!currentCollectionListId && currentCollectionListId === collectionListId;

        const buttonVariant = getButtonVariant(collectionKnown, collectionSelected);
        const buttonTitle = getValue(title) || (
            collectionKnown
                ? collectionId
                : translate('details.collection.unknown')
        );

        return (
            <ButtonLink variant={buttonVariant} to={`${ROUTE_PATHS.details}/${dataSetId}/${encode(collectionListId)}`} replace={true}>
                {buttonTitle} ({total})
            </ButtonLink>
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