import React, { PureComponent } from 'react';
import { SortableElement, SortableHandle } from 'react-sortable-hoc';
import styled, { withProps } from '../styled-components';
import Hamburger from './icons/Hamburger';
import { ComponentType } from '../typings/index';
import Cross from './icons/Cross';
import theme from '../theme/index';

interface Props {
    item: ComponentType;
    isOpen: boolean;
    openCloseFn: Function;
}

interface State {
    isActive: boolean;
}

const CONTAINER_PADDING = 1.5;

const AccordeonBox = withProps<{ active: boolean }>(styled.li)`
  border: 1px solid ${props => props.theme.colors.shade.light};
  background: ${props => props.theme.colors.white};
  position: relative;
  display: inline-block;
  width: 100%;
  border-radius: .25rem;
  margin-bottom: .5rem;
  padding: ${CONTAINER_PADDING}rem ${CONTAINER_PADDING * 3}rem;
  ${props => props.active ? `box-shadow: 0 .125rem .5rem rgba(0,0,0,.05);` : ''}
`;

const FormContainer = styled.div`
  width: 100%;
  float: left;
`;

const StyledTitle = styled.button`
  cursor: pointer;
  width: 100%;
  font: ${props => props.theme.fonts.subTitle};
  
  &:focus {
  outline: none;
  }
  
`;

const DraggableIcon = styled(Hamburger)`
  position: absolute;
  left: ${CONTAINER_PADDING}rem;
  top: ${CONTAINER_PADDING}rem;
`;

const CloseIcon = styled(Cross)`
  position: absolute;
  right: ${CONTAINER_PADDING}rem;
  top: ${CONTAINER_PADDING}rem;
`;

const DragHandle = SortableHandle(DraggableIcon);

class DraggableAccordeon extends PureComponent<Props, State> {
    static renderForm (item: ComponentType) {
        return (
            <FormContainer>
                <p>{JSON.stringify(item)}</p>
            </FormContainer>
        );
    }

    constructor () {
        super();

        this.state = {
            isActive: false
        };

        this.changeColor = this.changeColor.bind(this);
    }

    changeColor () {
        this.setState({isActive: !this.state.isActive});
    }

    render () {
        const {isActive} = this.state;
        const {isOpen, openCloseFn, item} = this.props;
        return (
            <AccordeonBox active={isActive} onMouseEnter={this.changeColor} onMouseLeave={this.changeColor}>
                <StyledTitle type="button" onClick={() => openCloseFn()}>
                    {item.__typename}
                </StyledTitle>
                {isOpen && DraggableAccordeon.renderForm(item)}
                <DragHandle/>
                <CloseIcon color={isActive ? theme.colors.error : theme.colors.shade.medium}/>
            </AccordeonBox>
        );
    }
}

export default SortableElement(DraggableAccordeon);