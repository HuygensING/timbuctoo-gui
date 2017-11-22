import React, { SFC } from 'react';
import styled from '../styled-components';
import Cross from './icons/Cross';
import { CONTAINER_PADDING } from '../constants/global';
import { ConfigurableItem, NormalizedComponentConfig, NormalizedFacetConfig } from '../typings/index';
import ComponentFields from './form/ComponentFields';
import FacetFields from './form/FacetFields';

interface Props {
    item: ConfigurableItem;
    configType: 'view' | 'facet';
    idx: number;
    openedIndex?: number;
    resolveChange: Function;
    onDeleteFn?: Function;
    openCloseFn: Function;
}

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

const Accordeon: SFC<Props> = ({ openCloseFn, item, openedIndex, resolveChange, onDeleteFn, idx, children, configType }) => {
    const isOpen = openedIndex === idx;
    const openClose = () => openCloseFn(isOpen ? null : idx);
    const resolve = (val: ConfigurableItem) => {
        resolveChange(val, idx);
    };

    return (
        <AccordeonBox>
            <StyledTitle type="button" onClick={openClose}>
                {configType === 'view' ? item.type : (item as NormalizedFacetConfig).caption}
            </StyledTitle>

            {isOpen &&
            <FieldContainer>
                {configType === 'view' && (
                    <ComponentFields item={item as NormalizedComponentConfig} resolveChange={resolve} />
                )}
                {configType === 'facet' && (
                    <FacetFields item={item as NormalizedFacetConfigConfig} />
                )}
            </FieldContainer>
            }
            {children}

            {onDeleteFn &&
            <CloseIcon onClick={() => onDeleteFn(idx)}>
                <Cross/>
            </CloseIcon>
            }
        </AccordeonBox>
    );
};

export default Accordeon;
