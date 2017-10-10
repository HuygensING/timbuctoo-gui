import React, { SFC } from 'react';
import styled, { withProps, keyframes } from '../styled-components';

import { Label } from './layout/StyledCopy';

const FILTERED_LABELS = ['_inverse'];

const ProgressWrapper = styled.div`
    white-space: nowrap;
`;

const ProgressLabel = styled(Label)`
    display: inline-block;
    overflow: hidden;
    width: 10rem;
    margin-right: 1rem;
`;

const Bar = styled.figure`
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
    background: ${props => props.progress && props.progress >= 100 ? props.theme.colors.primary.light : props.theme.colors.shade.medium};
    transform-origin: left;
    // animation: ${ProgressAnimation} 1s ease-in-out;
`;

interface Props {
    label?: string;
    width?: number | string;
    progress?: number;
    filter?: string[];
}

const ProgressBar: SFC<Props> = ({ label, width, progress, filter = FILTERED_LABELS }) => {

    // Check if label exists, if not don't render component
    if (!label) {
        return null;
    }

    // If filter exists check if label contains any of the filters
    // If so then don't render component
    if (filter) {
        for (let i = 0, limit = filter.length; i < limit; i++) {
            if (!label || label.indexOf(filter[i]) !== -1) {
                return null;
            }
        }
    }

    return (
        <ProgressWrapper>
            <ProgressLabel>{label}</ProgressLabel>
            <Bar width={width}>
                <Progress progress={progress} />
            </Bar>
        </ProgressWrapper>
    );
};

export default ProgressBar;