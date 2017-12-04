import * as React from 'react';
import styled from '../../styled-components';

import { Col } from '../layout/Grid';
import { Title } from '../layout/StyledCopy';

import ListContentItem from './ListContentItem';
import { SFC } from 'react';
import { DataSetMetadata } from '../../typings/schema';
import { ColProps } from '../../typings/layout';

const List = styled.ul`
    padding: 0;
    list-style: none;
`;

interface Props extends ColProps {
    title: string | null;
    data: DataSetMetadata[];
}

const ListContent: SFC<Props> = ({ title, data, ...rest }) => (
    <Col {...rest}>
        {title && <Title>{title}</Title>}
        <List>
            {(data && data.map((content, index) => <ListContentItem key={index} {...content} />)) || <div>Loading</div>}
        </List>
    </Col>
);

export default ListContent;
