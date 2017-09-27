import React, { SFC } from 'react';
import { CollectionMetadata } from '../../typings/timbuctoo/schema';
import styled, { css } from '../../styled-components';
import { Link , Title } from '../layout/StyledCopy';
import { lighten } from 'polished';
import Edit from '../icons/Edit';
import { ROUTE_PATHS, SUB_ROUTES } from '../../constants/routeNaming';

interface Props {
    collection: CollectionMetadata;
    datasetId: string;
}

const Bar = styled.section`
    display: inline-block;
    background-color: ${props => props.theme.colors.shade.light};
    min-height: 1rem;
    padding: .25rem .5rem;
    margin-bottom: .5rem;
    border-radius: .125rem;
`;

const Box = css`
    position: relative;
    padding: .25rem 2rem .25rem .5rem;
    margin: 0 1rem 0 0;
    border-radius: .125rem;
    display: inline-flex;
`;

const EditIcon = styled(Edit)`
  margin: 0 .5rem;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
`;

const LinkBox = styled(Link)`
    background: ${props => lighten(.05, props.theme.colors.shade.light)};
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

const EditCollectionBar: SFC<Props> = ({ collection, datasetId }) => {
    return (
        <Bar>
            <TitleBox>{collection.title}</TitleBox>
            <LinkBox to={'#'}>Edit facets<EditIcon/></LinkBox>
            <LinkBox to={`${ROUTE_PATHS.edit}/${datasetId}${SUB_ROUTES.viewScreen}/${collection.collectionId}`}>Edit screen<EditIcon/></LinkBox>
        </Bar>
    );
};

export default EditCollectionBar;