import React, { SFC } from 'react';
import styled from 'styled-components';

import translate from '../services/translate';
import { CollectionMetadata, Property } from '../typings/schema';
import { ROUTE_PATHS } from '../constants/routeNaming';
import { encode } from '../services/UrlStringCreator';
import { Label, Subtitle } from './layout/StyledCopy';
import { ButtonLink } from './layout/Button';
import { BUTTON_VARIANT } from '../constants/global';

import ProgressBar from './ProgressBar';
import { getValue } from '../services/getValue';

import Tooltip from './Tooltip';
import { isKnown } from '../services/HandleUnknowns';
import { ButtonVariant } from '../typings/layout';

import { PredicateLabel } from './PredicateLabel';

interface Props {
    isOpen: boolean;
    index: number;
    dataSetId: string;
    currentCollectionListId?: string | null;
    collection: CollectionMetadata;
    toggleOpen: Function;
    replace?: boolean;
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

const DensityLabel = styled(Label)``;

const getButtonVariant = (CollectionIsKnown: boolean, CollectionIsSelected: boolean): ButtonVariant => {
    if (!CollectionIsKnown) {
        return BUTTON_VARIANT.disabled;
    }

    return CollectionIsSelected ? BUTTON_VARIANT.dark : BUTTON_VARIANT.inverted;
};

const CollectionTag: SFC<Props> = ({
    isOpen,
    index,
    toggleOpen,
    collection,
    currentCollectionListId,
    dataSetId,
    replace
}) => {
    const { title, collectionId, collectionListId, properties, total } = collection;

    const renderPropertiesPanel = () => {
        return (
            <Tooltip>
                <PropertiesHeader>
                    <Subtitle>
                        {collectionId} ({total})
                    </Subtitle>
                    <PropertyLabel>{translate('details.collection.property')}</PropertyLabel>
                    <DensityLabel>{translate('details.collection.density')}</DensityLabel>
                </PropertiesHeader>
                {properties.items
                    .slice()
                    .filter(p => !p.isInverse)
                    .sort((a, b) => (a.shortenedUri < b.shortenedUri ? -1 : 1))
                    .map((property: Property, idx: number) => (
                        <ProgressBar key={idx} width={'100px'} progress={property.density}>
                            <PredicateLabel
                                predicate={
                                    property.isList ? property.shortenedUri + '(s)\u200E' : property.shortenedUri
                                }
                            />
                        </ProgressBar>
                    ))}
            </Tooltip>
        );
    };

    const renderButton = () => {
        const collectionKnown = isKnown(collection);
        const collectionSelected = !!currentCollectionListId && currentCollectionListId === collectionListId;

        const buttonVariant = getButtonVariant(collectionKnown, collectionSelected);
        const buttonTitle =
            getValue(title) || (collectionKnown ? collectionId : translate('details.collection.unknown'));

        return (
            <ButtonLink
                data-variant={buttonVariant}
                to={{
                    pathname: `/${ROUTE_PATHS.details}/${dataSetId}/${encode(collectionListId)}`,
                    state: replace && { keepPosition: true }
                }}
                replace={!!replace}
            >
                {buttonTitle} ({total})
            </ButtonLink>
        );
    };

    return (
        <ListItem onMouseEnter={() => toggleOpen(index)} onMouseLeave={() => toggleOpen(null)}>
            {renderButton()}
            {isOpen && renderPropertiesPanel()}
        </ListItem>
    );
};

export default CollectionTag;
