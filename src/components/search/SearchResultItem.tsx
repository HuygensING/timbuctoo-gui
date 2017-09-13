import React from 'react';
import styled from '../../styled-components';

import { Subtitle, Content, Label } from '../layout/StyledCopy';
import Image from '../layout/Image';
import Button from '../layout/Button';

const SearchItem = styled.article`
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

const SearchResultItem = (props) => {
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
            <Button to="/" small={true}>Bekijk dataset</Button>
        </SearchItem>
    );
};

export default SearchResultItem;