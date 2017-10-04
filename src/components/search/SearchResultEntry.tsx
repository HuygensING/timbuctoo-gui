import React from 'react';
import styled, { css } from '../../styled-components';

import Translations from '../../services/Translations';
import { Content, Subtitle } from '../layout/StyledCopy';
import Image from '../layout/Image';
import Button from '../layout/Button';
import { ROUTE_PATHS } from '../../constants/routeNaming';
import { encode } from '../../services/UrlStringCreator';

export interface ResultDataSetMetadata {
    imageUrl: string | null;
    title: string | null;
    description: string | null;
    collectionId: string;
    dataSetId: string;
    uri: string;
}

const SearchItem = styled.section`
    position: relative;
    min-height: 80px;
`;

const ImageWrapper = styled.figure`
    position: absolute; 
    top: 0;
    right: 0;
    width: 40%;
    height: 100%;
`;

const MaxWidth = css`
    max-width: 60%;
    padding-right: 1rem;
`;

const SearchTitle = styled(Subtitle)`
    margin: 0;
    ${MaxWidth}
`;

const SearchDescription = styled(Content)`
    margin-bottom: 1rem;
    ${MaxWidth}
`;

const SearchResultEntry = ({ title, imageUrl, description, collectionId, dataSetId, uri }: ResultDataSetMetadata) => {
    const url = `${ROUTE_PATHS.details}/${dataSetId}/${collectionId}/${encode(uri)}`;

    return (
        <SearchItem>
            <SearchTitle tag="h1">
                {title}
            </SearchTitle>
            <SearchDescription>{description}</SearchDescription>
            <Button to={url} small={true}>{Translations.translate('search.view_entry')}</Button>
            {imageUrl && imageUrl.indexOf('http') > -1 &&
                <ImageWrapper>
                    <Image src={imageUrl} ratio={1} fill={true}/>
                </ImageWrapper>
            }
        </SearchItem>
    );
};

export default SearchResultEntry;