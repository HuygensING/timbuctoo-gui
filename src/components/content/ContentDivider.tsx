import React from 'react';
import styled from '../../styled-components';

import { Title } from '../layout/StyledCopy';

const DividerLine = styled.figure`
    position: relative;
    margin: 3rem 0;
    border-bottom: 1px solid ${props => props.theme.colors.shade.light};
    text-align: center;
`;

const DividerTitle = styled(Title)`
    position: absolute;
    top: 50%;
    left: 50%;
    margin: 0 auto;
    padding: 0 1rem;
    background: ${props => props.theme.colors.white};
    transform: translate(-50%, -50%);
`;

interface Props {
    title: string;
}

const ContentDivider = ({title}: Props) => {
    return (
        <DividerLine>
            {title && <DividerTitle>{title}</DividerTitle>}
        </DividerLine>
    );
};

export default ContentDivider;