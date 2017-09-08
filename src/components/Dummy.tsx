import React from 'react';
import styled from '../styled-components';
import CreateElementWithTag from '../services/CreateElementWithTag';
import { Subtitle } from './layout/StyledCopy';
import { calcColWidth } from './layout/Grid';
import { lighten } from 'polished/lib';

const DummyContainer = styled((props: {mvp: boolean, height: string | number, marginY: string | number}) => CreateElementWithTag(props, 'div'))`
    display: block;
    position: relative;
    height: ${p => typeof p.height === 'number' ? calcColWidth(p.height) : p.height};
    margin: ${p => typeof p.marginY === 'number' ? `${calcColWidth(p.marginY)} 0` : p.marginY};
    padding: .5rem 0;
    background: ${p => p.mvp ? lighten(.4 , p.theme.colors.primary.medium) : lighten(.15, p.theme.colors.shade.medium)};
    color: #fff;
`;

const DummyContent = styled(Subtitle)`
    position: absolute;
    margin: 0;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

interface Props {
    mvp?: boolean;
    text?: string;
    height?: number | string;
    marginY?: number | string;
}

const Dummy = ({mvp = false, text, height = '5rem', marginY = '0'}: Props) => (
    <DummyContainer mvp={mvp} height={height} marginY={marginY}>
        <DummyContent color={'#fff'}>
            {text && text}
        </DummyContent>
    </DummyContainer>
);

export { Dummy };