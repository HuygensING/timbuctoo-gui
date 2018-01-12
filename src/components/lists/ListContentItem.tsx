import * as React from 'react';
import styled from '../../styled-components';

import { ROUTE_PATHS } from '../../constants/routeNaming';
import { calcColWidth } from '../layout/Grid';
import { Subtitle, Content, Link } from '../layout/StyledCopy';

import { getValue } from '../../services/getValue';
import { DataSetMetadata } from '../../typings/schema';
import { StyledComponentClass } from 'styled-components';

const ListItem = styled.li`
    position: relative;
    padding: ${calcColWidth(0.5)} 0;
    border-top: 1px solid ${props => props.theme.colors.shade.medium};
`;

const LinkableTitle = Subtitle.withComponent(Link) as StyledComponentClass<{}, {}, { to: string }>;

const ListContentItem = ({ title, description, dataSetId, dataSetName }: DataSetMetadata) => {
    const titleField = getValue(title);
    const descrField = getValue(description);

    return (
        <ListItem>
            <LinkableTitle to={`/${ROUTE_PATHS.details}/${dataSetId}`}>{titleField || dataSetName}</LinkableTitle>
            {descrField && <Content>{descrField}</Content>}
        </ListItem>
    );
};

export default ListContentItem;
