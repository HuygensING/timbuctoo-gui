import React, { SFC } from 'react';
import styled, { keyframes } from '../styled-components';
import Logo from './icons/Logo';
import theme from '../theme/index';

interface Props {}

const rotate360 = keyframes`
	from { transform: rotate(0deg); }
	to { transform: rotate(360deg); }
`;

const LoadingView = styled(Logo)`
    animation: ${rotate360} 2s linear infinite;
    position: absolute;
    z-index: 1;
    top: 50%;
    left: 50%;
    margin-top: -2.5rem;
    margin-left: -2.5rem;
`;

const Loading: SFC<Props> = () => <LoadingView color={theme.colors.shade.dark} width={'80px'} height={'8px'} />;

export default Loading;
