import React, { SFC } from 'react';
import styled from '../../styled-components';

interface Props {
    color?: string;
}

const SvgWrapper = styled.svg`
  cursor: pointer;
  
  & path {
    color: ${props => props.theme.colors.shade.medium}
  }
  
  &:hover {
    & path {
      color: ${props => props.theme.colors.error}
    }
  }
`;

const Cross: SFC<Props> = (props) => (
    <SvgWrapper {...props} width="16" height="16" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
        <title>Cross</title>
        <path
            d="M9.152 7.49c0 .19-.066.35-.198.48l-.958.96c-.132.13-.292.197-.48.197s-.348-.066-.48-.198L4.965 6.856 2.89 8.93c-.13.13-.29.197-.48.197-.187 0-.346-.066-.478-.198l-.96-.96c-.13-.13-.196-.29-.196-.48 0-.187.065-.347.197-.478L3.046 4.94.973 2.865c-.132-.132-.197-.292-.197-.48s.065-.347.197-.48l.96-.958c.13-.132.29-.197.478-.197.19 0 .35.066.48.198L4.965 3.02 7.037.95c.13-.132.29-.197.48-.197.187 0 .347.066.48.198l.957.96c.132.13.198.29.198.478s-.066.348-.198.48L6.882 4.94 8.954 7.01c.132.13.198.29.198.48z"
            fill="currentColor"
            fillRule="evenodd"
        />
    </SvgWrapper>
);

export default Cross;