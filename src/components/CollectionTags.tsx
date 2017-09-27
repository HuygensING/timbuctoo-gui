import React, { SFC } from 'react';
import { CollectionMetadata } from '../typings/timbuctoo/schema';
import { ROUTE_PATHS } from '../constants/routeNaming';
import Button from './layout/Button';
import styled from 'styled-components';
import { encode } from '../services/UrlStringCreator';
import { BUTTON_TYPES } from '../constants/global';

interface Props {
    colKeys: CollectionMetadata[];
    dataSetId: string;
    currentCollectionListId?: string;
}

const ListItem = styled.li`
  display: inline-block;
  margin-right: 1rem;
`;

const CollectionTags: SFC<Props> = ({ colKeys, dataSetId, currentCollectionListId }) => {

    const renderButton = (name: string, collectionListId) => {

        const type = currentCollectionListId && currentCollectionListId === collectionListId
            ? BUTTON_TYPES.dark
            : BUTTON_TYPES.inverted;

        return (
            <ListItem key={name}>
                <Button type={type} to={`${ROUTE_PATHS.details}/${dataSetId}/${encode(collectionListId)}`}>{name}</Button>
            </ListItem>
        );
    };

    return (
        <ul>
            {colKeys.map((col, idx) => renderButton(col.title, col.collectionListId))}
        </ul>
    );
};

export default CollectionTags;