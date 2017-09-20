import React from 'react';
import styled from '../../styled-components';

import { Url } from '../../typings/timbuctoo/schema';

import Translations from '../../services/Translations';
import { Subtitle } from '../layout/StyledCopy';
import Image from '../layout/Image';
import Button from '../layout/Button';
import { ROUTE_PATHS } from '../../constants/routeNaming';
import { encode } from '../../services/UrlStringCreator';

export interface ResultDataSetMetadata {
    imageUrl: Url | null;
    title: string;
    description: string;
    collectionId: string;
    datasetId: string;
    uri: string;
}

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

const SearchResultEntry = ({ title, imageUrl, collectionId, datasetId, uri }: ResultDataSetMetadata) => {
    const url = `${ROUTE_PATHS.details}/${datasetId}/${collectionId}/${encode(uri)}`;

    return (
        <SearchItem>
            <Subtitle tag="h1">
                {title}
            </Subtitle>
            <Button to={url} small={true}>{Translations.translate('search.view_entry')}</Button>
            {imageUrl && imageUrl.indexOf('http') > -1 &&
                <ImageWrapper>
                    <Image src={imageUrl} ratio={1}/>
                </ImageWrapper>
            }
        </SearchItem>
    );
};

export default SearchResultEntry;