import React, { PureComponent } from 'react';
import styled from '../styled-components';
import Cross from './icons/Cross';
import { CONTAINER_PADDING } from '../constants/global';
import { ConfigurableItem, NormalizedComponent, NormalizedFacetConfig } from '../typings/index';
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

interface State {
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

class Accordeon extends PureComponent<Props, State> {

    static renderForm (item: ConfigurableItem, configType: 'view' | 'facet', resolve: Function) {
        return (
            <FieldContainer>
                {configType === 'view' && (
                    <ComponentFields item={item as NormalizedComponent} resolveChange={resolve} />
                )}
                {configType === 'facet' && (
                    <FacetFields item={item as NormalizedFacetConfig} />
                )}
            </FieldContainer>
        );
    }

    constructor (props: Props) {
        super(props);

        this.setActive = this.setActive.bind(this);
        this.setInactive = this.setInactive.bind(this);
    }

    render () {
        const { openCloseFn, item, openedIndex, resolveChange, onDeleteFn, idx, children, configType } = this.props;

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

                {isOpen && Accordeon.renderForm(item, configType, resolve)}
                {children}

                {onDeleteFn &&
                <CloseIcon onClick={() => onDeleteFn(idx)}>
                    <Cross/>
                </CloseIcon>
                }
            </AccordeonBox>
        );
    }

    private setActive () {
        this.setState({ isActive: true });
    }

    private setInactive () {
        this.setState({ isActive: false });
    }
}

export default Accordeon;
