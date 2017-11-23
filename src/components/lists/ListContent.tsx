import * as React from 'react';
import styled from '../../styled-components';

import { Col } from '../layout/Grid';
import { Title } from '../layout/StyledCopy';

import ListContentItem from './ListContentItem';

const List = styled.ul`
    padding: 0;
    list-style: none;
`;

const ListContent = props => {
    function renderContent(data: any) {
        return (
            (data && data.map((content, index) => <ListContentItem key={index} {...content} />)) || <div>Loading</div>
        );
    }

    return (
        <Col {...props}>
            <Title>{props.title}</Title>
            <List>{renderContent(props.data)}</List>
            {/* <pre>{JSON.stringify(props, null, 4)}</pre> */}
        </Col>
    );
};

export default ListContent;
