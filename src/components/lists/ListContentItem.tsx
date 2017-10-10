import * as React from 'react';
import styled from '../../styled-components';

import { ROUTE_PATHS } from '../../constants/routeNaming';
import { DataSetProps } from '../../typings';
import { calcColWidth } from '../layout/Grid';
import { Subtitle, Content, Link, Label } from '../layout/StyledCopy';

import translate from '../../services/translate';
import { getValue } from '../../services/getValue';

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

const ListContentItem = ({ title, description, dataSetId }: DataSetProps) => {
    const titleField = getValue(title);
    const descrField = getValue(description);

    if (!titleField && !descrField) {
        return null;
    }

    return (
        <ListItem>
            {titleField && <Subtitle>{titleField}</Subtitle>}
            {descrField &&
                <Content>{descrField} in
                    <StyledLink to={`${ROUTE_PATHS.details}/userId/${dataSetId}`}>
                        {Datasets[Math.floor(Math.random() * Datasets.length)]}
                    </StyledLink>
                </Content>
            }
            <DateLabel>{translate('globals.today')}</DateLabel>
        </ListItem>
    );
};

export default ListContentItem;