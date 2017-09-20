import React, { SFC } from 'react';
import { CollectionMetadata } from '../typings/timbuctoo/schema';
import { ROUTE_PATHS } from '../constants/routeNaming';
import Button from './layout/Button';
import styled from 'styled-components';
import { encode } from '../services/UrlStringCreator';

interface Props {
    colKeys: CollectionMetadata[];
    datasetId: string;
}

const ListItem = styled.li`
  display: inline-block;
  margin-right: 1rem;
`;

const CollectionTags: SFC<Props> = ({ colKeys, datasetId }) => {

    const renderButton = (name: string, collectionListId) => (
        <ListItem key={name}>
            <Button to={`${ROUTE_PATHS.details}/${datasetId}/${encode(collectionListId)}`}>{name}</Button>
        </ListItem>
    );

    return (
        <ul>
            {colKeys.map((col, idx) => renderButton(col.title, col.collectionListId))}
        </ul>
    );
};

export default CollectionTags;