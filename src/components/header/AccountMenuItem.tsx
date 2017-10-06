import React, { SFC } from 'react';
import styled from '../../styled-components';

import { Link } from '../layout/StyledCopy';

import User from '../icons/User';
import Book from '../icons/Book';
import GitBranch from '../icons/GitBranch';
import Heart from '../icons/Heart';
import Logout from '../icons/Logout';

interface Props {
    to?: string;
    icon: string;
    onClick?: () => void;
}

const ICONS = {
    user: 'user',
    book: 'book',
    git: 'git-branch',
    heart: 'heart',
    logout: 'logout'
};

const MenuItem = styled.li`
    width: 200px;
`;

const Button = styled.button`
    display: block;
    cursor: pointer;
    padding: 0.5rem 1rem;
    outline: none;
`;

const LinkedButton = styled(Link)`
    display: block;
    cursor: pointer;
    padding: 0.5rem 1rem;
`;

const IconWrapper = styled.figure`
    position: relative;
    display: inline-block;

    width: 1rem;
    margin-right: 1rem;
    vertical-align: middle;
    text-align: center;
`;

const IconColor = '#114235';

const AccountMenuItem: SFC<Props> = ({ onClick, to = '/', icon, children }) => {
    const loadIcon = (iconName: string) => {
        switch (iconName) {
            case ICONS.user:    return <User color={IconColor} />;
            case ICONS.book:    return <Book color={IconColor} />;
            case ICONS.git:     return <GitBranch color={IconColor} />;
            case ICONS.heart:   return <Heart color={IconColor} />;
            case ICONS.logout:  return <Logout color={IconColor} />;
            default: return null;
        }
    };

    const renderButton = () => (
        <Button onClick={onClick}>
            <IconWrapper>
                {loadIcon(icon)}
            </IconWrapper>
            {children}
        </Button>
    );

    const renderLinkedButton = () => (
        <LinkedButton to={to}>
            <IconWrapper>
                {loadIcon(icon)}
            </IconWrapper>
            {children}
        </LinkedButton>
    );
    
    return (
        <MenuItem>
            {
                onClick
                    ? renderButton()
                    : renderLinkedButton()
            }
        </MenuItem>
    );
};

export default AccountMenuItem;