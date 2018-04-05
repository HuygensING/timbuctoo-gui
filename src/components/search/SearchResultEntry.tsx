import React from 'react';
import styled, { css } from '../../styled-components';

import translate from '../../services/translate';
import { Content, Subtitle } from '../layout/StyledCopy';
import Image from '../layout/Image';
import { ButtonLink } from '../layout/Button';
import { ROUTE_PATHS } from '../../constants/routeNaming';
import { encode } from '../../services/UrlStringCreator';
import { valueToString } from '../../services/getValue';
import { Value } from '../../typings/schema';
import { DEFAULT_FORMATTERS } from '../../services/propertyPath';

export interface ResultDataSetMetadata {
    image: Value | null;
    title: Value | null;
    description: Value | null;
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

const SearchTitle = Subtitle.withComponent('h1').extend`
    margin: 0;
    ${MaxWidth};
`;

const SearchDescription = styled(Content)`
    margin-bottom: 1rem;
    ${MaxWidth};
`;

function format(input: Value | null) {
    return input == null ? input : valueToString(input, DEFAULT_FORMATTERS);
}

const SearchResultEntry = ({ title, image, description, collectionId, dataSetId, uri }: ResultDataSetMetadata) => {
    const url = `/${ROUTE_PATHS.details}/${dataSetId}/${collectionId}/${encode(uri)}`;

    return (
        <SearchItem>
            <SearchTitle>{format(title)}</SearchTitle>
            <SearchDescription>{format(description)}</SearchDescription>
            <ButtonLink to={url} data-small={true}>
                {translate('search.view_entry')}
            </ButtonLink>
            {image &&
                image.value &&
                image.value.indexOf('http') > -1 && (
                    <ImageWrapper>
                        <Image src={image.value} ratio={1} fillOut={true} />
                    </ImageWrapper>
                )}
        </SearchItem>
    );
};

export default SearchResultEntry;
