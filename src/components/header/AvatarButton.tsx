import React, { SFC } from 'react';
import styled from '../../styled-components';
import { Label } from '../layout/StyledCopy';
import Avatar, { SIZE } from './Avatar';
import { UserReducer } from '../../reducers/user';

interface Props {
    user: UserReducer;
    onClick: (event: any) => void;
}

const Username = styled(Label)`
    margin-right: 1rem;
    color: ${props => props.theme.colors.white};
`;

const Button = styled.button`
    position: relative;
    outline: none;
    cursor: pointer;

    &:hover {
        ${Username} {
            color: ${props => props.theme.colors.primary.medium};
        }
    }
`;

const AvatarButton: SFC<Props> = ({ user, onClick }) => {
    return (
        <Button onClick={onClick}>
            <Username>{user.name}</Username>
            <Avatar size={SIZE.small} src={user.avatar} />
        </Button>
    );
};

export default AvatarButton;
