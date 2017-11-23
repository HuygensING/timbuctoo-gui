import React from 'react';
import styled from '../../styled-components';

import { LOGIN_URL } from '../../constants/api';

import { MenuButtonStyle } from './MenuButtonStyle';

const Button = styled.button`
    ${MenuButtonStyle};
`;

const value: string = window.location.href + window.location.pathname.substr(1);

const LoginLink = () => (
    <form action={LOGIN_URL} method="POST">
        <input name="hsurl" value={value} type="hidden" />
        <Button type="submit">Login</Button>
    </form>
);

export default LoginLink;
