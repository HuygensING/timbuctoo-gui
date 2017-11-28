import React, { SFC } from 'react';
import { connect } from 'react-redux';
import styled from '../styled-components';
import Cross from './icons/Cross';
import { CONTAINER_PADDING } from '../constants/global';
import { ConfigurableItem, NormalizedComponentConfig, NormalizedFacetConfig } from '../typings/index';
import ComponentFields from './form/ComponentFields';
import FacetFields from './form/FacetFields';
import { deleteViewConfigNode } from '../reducers/viewconfig';
import { deleteFacetConfigItem } from '../reducers/facetconfig';

interface OwnProps {
    item: ConfigurableItem;
    configType: 'view' | 'facet';
    idx: number;
    openedIndex?: number;
    resolveChange: Function;
    onDeleteFn?: Function;
    openCloseFn: Function;
}

interface DispatchProps {
    deleteNode: () => void;
}

type Props = DispatchProps & OwnProps;

const FieldContainer = styled.section`
  display: flex;
  padding: ${CONTAINER_PADDING}rem .5rem 0;
  margin-top: 1rem;
  border-top: 1px solid ${props => props.theme.colors.shade.light}
`;

const AccordeonBox = styled.li`
  border: 1px solid ${props => props.theme.colors.shade.light};
  background: ${props => props.theme.colors.white};
  position: relative;
  display: inline-block;
  width: 100%;
  border-radius: .25rem;
  margin-bottom: .5rem;
  padding: ${CONTAINER_PADDING}rem 1rem;
`;

const StyledTitle = styled.button`
  cursor: pointer;
  padding: 0 ${CONTAINER_PADDING * 3 - 1}rem;
  width: 100%;
  font: ${props => props.theme.fonts.subTitle};
  text-align: left;
  
  &:focus {
    outline: none;
  }
`;

const CloseIcon = styled.button`
  position: absolute;
  right: ${CONTAINER_PADDING}rem;
  top: ${CONTAINER_PADDING}rem;
`;

const Accordeon: SFC<Props> = ({ openCloseFn, item, openedIndex, deleteNode, idx, children, configType }) => {
    const isOpen = openedIndex === idx;
    const openClose = () => openCloseFn(isOpen ? null : idx);

    if (!item) { return null; }

    return (
        <AccordeonBox>
            <StyledTitle type="button" onClick={openClose}>
                {configType === 'view' ? item.type : (item as NormalizedFacetConfig).caption}
            </StyledTitle>

            {isOpen &&
            <FieldContainer>
                {configType === 'view' && (
                    <ComponentFields item={item as NormalizedComponentConfig} />
                )}
                {configType === 'facet' && (
                    <FacetFields item={item as NormalizedFacetConfig} />
                )}
            </FieldContainer>
            }
            {children}

            {deleteNode &&
                <CloseIcon onClick={deleteNode}>
                    <Cross/>
                </CloseIcon>
            }
        </AccordeonBox>
    );
};

const mapDispatchToProps = (dispatch, { configType, item }: OwnProps) => {
    console.log(item);
    if (configType === 'view') {
        return {
            deleteNode: () => dispatch(deleteViewConfigNode(item.id))
        };
    }

    if (configType === 'facet') {
        return {
            deleteNode: () => dispatch(deleteFacetConfigItem(item.id))
        };
    }

    return {};
};

export default connect(null, mapDispatchToProps)(Accordeon);
