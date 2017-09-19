import React, { SFC } from 'react';
import { CollectionMetadata } from '../typings/timbuctoo/schema';
import { ROUTE_PATHS } from '../constants/routeNaming';
import Button from './layout/Button';
import styled from 'styled-components';
import { calcColWidth } from './layout/Grid';
import { encode } from '../services/UrlStringCreator';

interface Props {
    colKeys: CollectionMetadata[];
    datasetId: string;
}

const ListItem = styled.li`
  display: inline-block;
  margin-right: 1rem;
`;

const List = styled.ul`
  width: ${calcColWidth(42)};
  margin-left: ${calcColWidth(3)};
`;

const CollectionTags: SFC<Props> = ({ colKeys, datasetId }) => {

    const renderButton = (name: string) => (
        <ListItem>
            <Button to={`${ROUTE_PATHS.search}/${datasetId}/${encode(name)}`}>{name}</Button>
        </ListItem>
    );

    return (
        <List>
            {colKeys.map((col, idx) => renderButton(col.name))}
        </List>
    );
};

export default CollectionTags;