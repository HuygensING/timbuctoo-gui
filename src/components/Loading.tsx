import React, { SFC } from 'react';
import styled, { keyframes, withProps } from '../styled-components';
import Logo from './icons/Logo';
import theme from '../theme/index';

interface Props {}

const rotate360 = keyframes`
	from { transform: rotate(0deg); }
	to { transform: rotate(360deg); }
`;

const LoadingView = withProps<{ 'data-absolute'?: boolean }>(styled(Logo))`
    animation: ${rotate360} 2s linear infinite;
    ${props =>
        props['data-absolute']
            ? `
        position: absolute;
        z-index: 1;
        top: 50%;
        left: 50%;
        margin-top: -2.5rem;
        margin-left: -2.5rem;
    `
            : ''}
`;

const Loading: SFC<Props> = () => (
    <LoadingView data-absolute={true} color={theme.colors.shade.dark} width={'80px'} height={'80px'} />
);

export const MiniLoader: SFC<Props> = () => (
    <LoadingView color={theme.colors.shade.dark} width={'1rem'} height={'1rem'} />
);

export default Loading;
