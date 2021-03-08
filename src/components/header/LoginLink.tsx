import React from 'react';
import styled from '../../styled-components';

import { LOGIN_URL } from '../../constants/api';

import { MenuButtonStyle } from './MenuButtonStyle';

const Button = styled.button`
    ${MenuButtonStyle};
`;

const value: string = window.location.href;

const LoginLink = () => (
    <form action={LOGIN_URL} method="GET">
        <input name="redirect-uri" value={value} type="hidden" />
        <Button type="submit">Login</Button>
    </form>
);

export default LoginLink;
