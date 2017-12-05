import React from 'react';
import styled from '../../styled-components';

import { CollectionMetadataList } from '../../typings/schema';

import translate from '../../services/translate';
import { Subtitle, Content, Label } from '../layout/StyledCopy';
import Image from '../layout/Image';
import { ButtonLink } from '../layout/Button';

export interface ResultDataSetMetadata {
    imageUrl: string | null;
    title: string;
    description: string;
    licence: { uri: string };
    collections: CollectionMetadataList;
}

const Sub = Subtitle.withComponent('h1');

const SearchItem = styled.section``;

const CollectionList = styled.ul`
    margin: 0;
    list-style: none;
`;

const CollectionListItem = styled.li`
    display: inline-block;
    margin-right: 5px;
`;

const CollectionLabel = styled(Label)``;

const SearchResulDataset = (props: ResultDataSetMetadata) => {
    const { title, description, collections, imageUrl } = props;

    const renderCollections = () =>
        collections.items.map((collection, index) => (
            <CollectionListItem key={index}>
                <CollectionLabel>
                    {collection.title} ({collection.properties && collection.properties.items.length})
                </CollectionLabel>
            </CollectionListItem>
        ));

    const imageSrc = imageUrl ? imageUrl : '';

    return (
        <SearchItem>
            <Image src={imageSrc} ratio={4 / 2} />
            <Sub>{title}</Sub>
            <CollectionList>{renderCollections()}</CollectionList>
            <Content>{description}</Content>
            <ButtonLink to="/" data-small={true}>
                {translate('search.view_dataset')}
            </ButtonLink>
        </SearchItem>
    );
};

export default SearchResulDataset;
