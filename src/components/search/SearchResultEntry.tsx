import React from 'react';
import styled from '../../styled-components';

import Translations from '../../services/Translations';
import { Subtitle, Content, Label } from '../layout/StyledCopy';
import Image from '../layout/Image';
import Button from '../layout/Button';

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

const SearchResultEntry = (props) => {
    const { data } = props;

    const renderCollections = () => (
        data.collections.map((collection, index) => (
            <CollectionListItem key={index}>
                <CollectionLabel>{collection.type} ({collection.total})</CollectionLabel>
            </CollectionListItem>
        ))
    );

    return (
        <SearchItem>
            <Image src={data.imageUrl} ratio={4 / 2}/>
            <Subtitle tag="h1">{data.name}</Subtitle>
            <CollectionList>
                {renderCollections()}
            </CollectionList>
            <Content>{data.description}</Content>
            <Button to="/" small={true}>{Translations.translate('search.view_dataset')}</Button>
        </SearchItem>
    );
};

export default SearchResultEntry;