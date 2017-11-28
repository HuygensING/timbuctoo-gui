import React, { SFC } from 'react';
import { lighten } from 'polished/lib';
import styled, { keyframes, withProps } from '../styled-components';

export enum ALIGN {
    left,
    right
}
interface Props {
    interactable?: boolean;
    align?: ALIGN;
    alignOffset?: string;
    width?: string;
}

const TooltipPanelAnimation = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const TooltipPanel = withProps<Props>(styled.div)`
    position: absolute;
    pointer-events: ${props => (props.interactable ? 'inherit' : 'none')};
    top: 3.5rem;
    ${props =>
        props.align === ALIGN.right ? `right: ${props.alignOffset || '1rem'}` : `left: ${props.alignOffset || '1rem'}`};
    width: ${props => (props.width ? props.width : 'auto')};
    padding: 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    background: ${props => props.theme.colors.white};
    z-index: 10;
    animation: ${TooltipPanelAnimation} 0.3s ease-in-out;
    
    &:before {
        position: absolute;
        top: 0;
        ${props => (props.align === ALIGN.right ? 'right: 1rem' : 'left: 1rem')};
        width: 1rem;
        height: 1rem;
        border-top: 1px solid ${props => lighten(0.04, props.theme.colors.shade.light)};
        border-right: 1px solid ${props => props.theme.colors.shade.light};
        background: ${props => props.theme.colors.white};
        transform: translateY(-50%) rotate(-45deg);
        content: '';
    }
`;

const Tooltip: SFC<Props> = ({ interactable = false, align = ALIGN.left, alignOffset, width, children }) => {
    return (
        <TooltipPanel interactable={interactable} align={align} alignOffset={alignOffset} width={width}>
            {children}
        </TooltipPanel>
    );
};

export default Tooltip;
