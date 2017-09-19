import React from 'react';
import styled from '../../styled-components';

import { Url, CollectionMetadataList } from '../../typings/timbuctoo/schema';

import Translations from '../../services/Translations';
import { Subtitle, Content, Label } from '../layout/StyledCopy';
import Image from '../layout/Image';
import Button from '../layout/Button';

export interface ResultDataSetMetadata {
    imageUrl: Url | null;
    title: string;
    description: string;
    collections: CollectionMetadataList;
};

const SearchItem = styled.section`
`;

const CollectionList = styled.ul`
    margin: 0;
    list-style: none;
`;

const CollectionListItem = styled.li`
    display: inline-block;
    margin-right: 5px;
`;

const CollectionLabel = styled(Label)`
`;

const SearchResulDataset = (props: ResultDataSetMetadata) => {
    const { title, description, collections, imageUrl } = props;

    const renderCollections = () => (
        collections.items.map((collection, index) => (
            <CollectionListItem key={index}>
                <CollectionLabel>{collection.name} ({collection.properties && collection.properties.items.length})</CollectionLabel>
            </CollectionListItem>
        ))
    );

    return (
        <SearchItem>
            <Image src={imageUrl} ratio={4 / 2}/>
            <Subtitle tag="h1">{title}</Subtitle>
            <CollectionList>
                {renderCollections()}
            </CollectionList>
            <Content>{description}</Content>
            <Button to="/" small={true}>{Translations.translate('search.view_dataset')}</Button>
        </SearchItem>
    );
};

export default SearchResulDataset;