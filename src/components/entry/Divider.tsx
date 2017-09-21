import React from 'react';
import styled from '../../styled-components';

import { Title } from '../layout/StyledCopy';

const DividerLine = styled.figure`
    position: relative;
    margin: 1rem 0;
    border-bottom: 1px solid ${props => props.theme.colors.shade.light};
    text-align: center;
`;

const DividerTitle = styled(Title)`
    position: absolute;
    top: 50%;
    right: 0;
    left: 0;
    margin: 0 auto;
    transform: translate(-50%, -50%);
`;

interface Props {
    title: string;
}

const Divider = ({title}: Props) => {
    return (
        <DividerLine>
            <DividerTitle>{title}</DividerTitle>
        </DividerLine>
    );
};

export default Divider;