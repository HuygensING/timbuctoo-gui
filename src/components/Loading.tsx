import React, { SFC } from 'react';
import { Title } from './layout/StyledCopy';
import styled from 'styled-components';

interface Props {}

const LoadingTitle = styled(Title)`
  height: 100vh;
  position: relative;
  padding: 20vh;
  left: 50%;
  transform: translateX(-50%);
`;

const Loading: SFC<Props> = () => (<LoadingTitle>Loading</LoadingTitle>);

export default Loading;