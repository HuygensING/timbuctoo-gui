import React, { PureComponent } from 'react';
import styled, { withProps } from '../styled-components';
import { ComponentType } from '../typings/index';
import Cross from './icons/Cross';

interface Props {
    index: number;
    item: ComponentType;
    isOpen: boolean;
    onDeleteFn?: Function;
    padding?: number;
    openCloseFn: Function;
}

interface State {
    isActive: boolean;
}

const AccordeonBox = withProps<{ active: boolean, padding: number }>(styled.li)`
  border: 1px solid ${props => props.theme.colors.shade.light};
  background: ${props => props.theme.colors.white};
  position: relative;
  display: inline-block;
  width: 100%;
  border-radius: .25rem;
  margin-bottom: .5rem;
  padding: ${props => props.padding}rem ${props => props.padding * 3}rem;
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

const CloseIcon = withProps<{padding: number}>(styled(Cross))`
  position: absolute;
  right: ${props => props.padding}rem;
  top: ${props => props.padding}rem;
`;

class Accordeon extends PureComponent<Props, State> {

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

        this.setActive = this.setActive.bind(this);
        this.setInactive = this.setInactive.bind(this);
    }

    render () {
        const {isActive} = this.state;
        const {isOpen, openCloseFn, item, children, padding = 1.5} = this.props;

        return (
            <AccordeonBox padding={padding} active={isActive} onMouseEnter={this.setActive} onMouseLeave={this.setInactive}>
                <StyledTitle type="button" onClick={() => openCloseFn()}>
                    {item.__typename}
                </StyledTitle>

                {isOpen && Accordeon.renderForm(item)}

                {children}

                {this.renderCloseIcon(padding)}
            </AccordeonBox>
        );
    }

    private setActive () {
        this.setState({isActive: true});
    }

    private setInactive () {
        this.setState({isActive: false});
    }

    private renderCloseIcon (padding: number) {
        const {onDeleteFn} = this.props;
        return onDeleteFn && this.state.isActive &&
            <CloseIcon padding={padding} onClick={() => onDeleteFn()}/>;
    }
}

export default Accordeon;