import * as React from 'react';
import styled from '../../styled-components';

import { ContentProps } from '../../typings';
import { calcColWidth } from '../layout/Grid';
import { Subtitle, Content, Link, Label } from '../layout/StyledCopy';

const Datasets = ['World Leaders', 'German Royalty', '18th century literature'];

const ListItem = styled.li`
    position: relative;
    padding: ${calcColWidth(0.5)} 0;
    border-top: 1px solid ${props => props.theme.colors.shade.medium};
`;

const StyledLink = styled(Link)`
    color: ${props => props.theme.colors.primary.medium};
`;

const DateLabel = styled(Label)`
    position: absolute;
    display: block;
    top: 0;
    bottom: 0;
    right: 0;
    height: 1rem;
    margin: auto;
`;

const ListContentItem = (props: ContentProps) => {
    return (
        <ListItem>
            <Subtitle>{props.caption}</Subtitle>
            <Content>{props.description && props.description.substr(0, 20)} in <StyledLink to="/">{Datasets[Math.floor(Math.random() * Datasets.length)]}</StyledLink></Content>
            <DateLabel>Today</DateLabel>
        </ListItem>
    );
};

export default ListContentItem;