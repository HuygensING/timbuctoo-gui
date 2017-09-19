import React from 'react';
import styled from '../../styled-components';

import { Url, CollectionMetadataList } from '../../typings/timbuctoo/schema';

import Translations from '../../services/Translations';
import { Subtitle } from '../layout/StyledCopy';
import Image from '../layout/Image';
import Button from '../layout/Button';

export interface ResultDataSetMetadata {
    imageUrl: Url | null;
    title: string;
    description: string;
    collections: CollectionMetadataList;
};

const SearchItem = styled.section`
    height: 80px;
    border-left: 2px solid ${props => props.theme.colors.shade.light};
    padding-left: 10px;
`;

const ImageWrapper = styled.figure`
    position: absolute;
    top: 0;
    right: 0;
    width: 80px;
`;

const SearchResultEntry = (props: ResultDataSetMetadata) => {
    const { title, imageUrl } = props;

    return (
        <SearchItem>
            <Subtitle tag="h1">
                {title}
            </Subtitle>
            <Button to="/" small={true}>{Translations.translate('search.view_dataset')}</Button>
            <ImageWrapper>
                <Image src={imageUrl} ratio={1}/>
            </ImageWrapper>
        </SearchItem>
    );
};

export default SearchResultEntry;