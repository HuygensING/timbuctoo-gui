import React, { SFC } from 'react';
import theme from '../../theme/index';
import styled from 'styled-components';

interface Props {
    color?: string;
}

const SvgWrapper = styled.svg`
  cursor: move;
`;

const Hamburger: SFC<Props> = props => (
    <SvgWrapper {...props} width="24" height="18" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
        <title>Hamburger</title>
        <g
            stroke={props.color ? props.color : theme.colors.shade.medium}
            fill="none"
            fillRule="evenodd"
            strokeLinecap="round"
        >
            <path d="M1 1h16M1 5h16M1 9h16"/>
        </g>
    </SvgWrapper>
);

export default Hamburger;