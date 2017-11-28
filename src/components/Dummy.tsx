import React from 'react';
import styled from '../styled-components';
import CreateElementWithTag from '../services/CreateElementWithTag';
import { Subtitle } from './layout/StyledCopy';
import { calcColWidth } from './layout/Grid';
import { lighten } from 'polished/lib';
import theme from '../theme/index';

const DummyContainer = styled(
    (props: {
        mvp: boolean;
        height: string | number;
        width: string | number;
        marginY: string | number;
        absolute: boolean;
    }) => CreateElementWithTag(props, 'div')
)`
    display: block;
    ${props => (props.absolute ? 'position: absolute; top: 0; right: 0;' : 'position: relative;')} float:right;
    height: ${props => (typeof props.height === 'number' ? calcColWidth(props.height) : props.height)};
    width: ${props => (typeof props.width === 'number' ? calcColWidth(props.width) : props.width)};
    margin-bottom: ${props => (typeof props.marginY === 'number' ? `${calcColWidth(props.marginY)}` : props.marginY)};
    padding: 0.5rem 0;
    border: 2px dashed
        ${props => (props.mvp ? lighten(0.5, props.theme.colors.primary.medium) : props.theme.colors.shade.light)};
`;

const DummyContent = styled(Subtitle)`
    position: absolute;
    margin: 0;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const DummySticker = styled.span`
    background: coral;
    border-radius: 50%;
    position: absolute;
    text-align: center;
    display: block;
    width: 1rem;
    height: 1rem;
    top: -0.5rem;
    right: -0.5rem;
`;

interface Props {
    mvp?: boolean;
    text?: string;
    absolute?: boolean;
    height?: number | string;
    width?: number | string;
    marginY?: number | string;
}

const Dummy = ({ mvp = false, text, height = '5rem', width = '100%', marginY = '0', absolute = false }: Props) => (
    <DummyContainer mvp={mvp} height={height} width={width} marginY={marginY} absolute={absolute}>
        <DummyContent color={mvp ? lighten(0.2, theme.colors.primary.medium) : theme.colors.shade.light}>
            {text && text}
        </DummyContent>
        {mvp && <DummySticker />}
    </DummyContainer>
);

export { Dummy };
