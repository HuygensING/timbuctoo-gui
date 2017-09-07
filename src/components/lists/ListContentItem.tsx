import * as React from 'react';
import styled from '../../styled-components';

import { ContentProps } from '../../typings';
import { Subtitle, Content } from '../layout/StyledCopy';

const ListItem = styled.li`
`;

const ListContentItem = (props: ContentProps) => {
    return (
        <ListItem>
            <Subtitle>{props.caption}</Subtitle>
            <Content>{props.description && props.description.substr(0, 100)}...</Content>
        </ListItem>
    );
};

export default ListContentItem;