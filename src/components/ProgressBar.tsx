import React, { SFC } from 'react';
import styled, { withProps, keyframes } from '../styled-components';

import { Label } from './layout/StyledCopy';

const ProgressWrapper = styled.div`
    white-space: nowrap;
`;

const ProgressLabel = styled(Label)`
    display: inline-block;
    text-overflow: ellipsis;
    direction: rtl;
    overflow: hidden;
    width: 10rem;
    margin-right: 1rem;
`;

const Bar = withProps<{ width?: string }>(styled.figure)`
    position: relative;
    display: inline-block;
    overflow: hidden;
    width: ${props => props.width || '100%'};
    height: 0.5rem;
    vertical-align: middle;
    border: 1px solid ${props => props.theme.colors.shade.medium};
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
    background: ${props =>
        props.progress && props.progress >= 100 ? props.theme.colors.primary.light : props.theme.colors.shade.medium};
    transform-origin: left;
    // animation: ${ProgressAnimation} 1s ease-in-out;
`;

interface Props {
    width?: string;
    progress?: number;
    filter?: string[];
    children?: any;
}

const ProgressBar: SFC<Props> = ({ width, progress, children }) => {
    // Check if label exists, if not don't render component
    if (!children) {
        return null;
    }

    return (
        <ProgressWrapper>
            <ProgressLabel>{children}</ProgressLabel>
            <Bar width={width}>
                <Progress progress={progress} />
            </Bar>
        </ProgressWrapper>
    );
};

export default ProgressBar;
