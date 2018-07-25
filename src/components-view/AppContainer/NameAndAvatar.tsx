import React, { SFC } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    border: 1px solid #fff;
    border-radius: 0.25rem;
    padding: 0.25rem 1rem;
    position: absolute;
    background: transparent;
    font: ${props => props.theme.fonts.body};
    right: 1rem;
    color: #fff;
    cursor: pointer;
`;

const Name = styled.span`
    vertical-align: middle;
    padding-right: 1rem;
`;

const Avatar = styled.img`
    border-radius: 50%; /*make it round*/
    object-fit: cover; /*make it fill out */
    width: 2rem;
    height: 2rem;
    vertical-align: middle;
`;

// const Subtitle = styled.h2`
//     margin: 1.1vw 0;
//     font: ${props => props.theme.fonts.subTitle};
//     color: ${props => props.theme.colors.black};
// `;

export const NameAndAvatar: SFC<{ username: string; avatarUrl: string; onClick: () => void }> = ({
    username,
    avatarUrl,
    onClick
}) => (
    <Wrapper onClick={onClick}>
        <Name>{username}</Name>
        <Avatar src={avatarUrl} />
    </Wrapper>
);
