import React, { SFC } from 'react';
import { CollectionMetadata } from '../../typings/schema';
import styled, { css, withProps } from '../../styled-components';
import { Link, Title } from '../layout/StyledCopy';
import { lighten } from 'polished';
import Edit from '../icons/Edit';
import { ROUTE_PATHS, SUB_ROUTES } from '../../constants/routeNaming';
import { getValue } from '../../services/getValue';
import { LinkProps } from 'react-router-dom';

interface Props {
    collection: CollectionMetadata;
    dataSetId: string;
}

const Bar = styled.section`
    display: inline-block;
    background-color: ${props => props.theme.colors.shade.light};
    min-height: 1rem;
    padding: 0.25rem 0.5rem;
    margin-bottom: 0.5rem;
    border-radius: 0.125rem;
`;

const Box = css`
    position: relative;
    padding: 0.25rem 2rem 0.25rem 0.5rem;
    margin: 0 1rem 0 0;
    border-radius: 0.125rem;
    display: inline-flex;
`;

const EditIcon = styled(Edit)`
    margin: 0 0.5rem;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
`;

const LinkBox = withProps<LinkProps>(styled(Link))`
    background: ${props => lighten(0.05, props.theme.colors.shade.light)};
    ${Box}
    &:last-child {
      margin: 0;
    }
`;

const TitleBox = styled(Title)`
    ${Box};
    font: ${props => props.theme.fonts.body};
    width: 300px;
`;

const EditCollectionBar: SFC<Props> = ({ collection, dataSetId }) => {
    return (
        <Bar>
            <TitleBox>{getValue(collection.title) || collection.collectionId}</TitleBox>
            <LinkBox to={`/${ROUTE_PATHS.edit}/${dataSetId}${SUB_ROUTES.facetConfig}/${collection.collectionId}`}>
                Edit facets<EditIcon />
            </LinkBox>
            <LinkBox to={`/${ROUTE_PATHS.edit}/${dataSetId}${SUB_ROUTES.viewConfig}/${collection.collectionId}`}>
                Edit screen<EditIcon />
            </LinkBox>
        </Bar>
    );
};

export default EditCollectionBar;
