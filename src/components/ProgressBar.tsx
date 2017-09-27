import React, { SFC } from 'react';
import styled, { withProps, keyframes } from '../styled-components';

import { Label } from './layout/StyledCopy';

const ProgressWrapper = styled.div`
    white-space: nowrap;
`;

const ProgressLabel = styled(Label)`
    display: inline-block;
    overflow: hidden;
    width: 150px;
    padding-right: 1rem;
`;

const Bar = styled.figure`
    position: relative;
    display: inline-block;
    overflow: hidden;
    width: ${props => props.width || '100%'};
    height: 0.5rem;
    vertical-align: middle;
    background: ${props => props.theme.colors.white};
`;

const ProgressAnimation = keyframes`
    from { transform: scaleX(0); }
    to { transform: scaleX(1); }
`;

const Progress = withProps<Props>(styled.figure)`
    position: relative;
    width: ${props => `${props.progress}%`};
    height: 100%;
    background: ${props => props.theme.colors.shade.dark};
    transform-origin: left;
    animation: ${ProgressAnimation} 1s ease-in-out;
`;

interface Props {
    label?: string | null;
    width?: number | string;
    progress: number | null;
}

const ProgressBar: SFC<Props> = ({label, width, progress}) => (
    <ProgressWrapper>
        <ProgressLabel>{label}</ProgressLabel>
        <Bar width={width}>
            <Progress progress={progress} />
        </Bar>
    </ProgressWrapper>
);

export default ProgressBar;