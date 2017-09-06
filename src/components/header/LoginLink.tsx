import React from 'react';
import { LOGIN_URL } from '../../constants/api';
import styled from '../../styled-components';

const Button = styled.button`
    padding: .25rem 1rem;
    border: 1px solid #fff;
    border-radius: .25rem;
    position: absolute;
    background: transparent;
    font: ${props => props.theme.fonts.body};
    right: 1rem;
    top: 50%;
    color: #fff;
    text-decoration: none;
    cursor: pointer;
    transform: translateY(-50%);
`;

const value: string = window.location.href + window.location.pathname.substr(1);

const LoginLink = () => (
    <form action={LOGIN_URL} method="POST">
        <input name="hsurl" value={value} type="hidden" />
        <Button type="submit">
            Login
        </Button>
    </form>
);

export default LoginLink;