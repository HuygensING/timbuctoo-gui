import React, { ComponentClass, SFC } from 'react';
import styled, { withProps } from '../../styled-components';

import { Link } from '../layout/StyledCopy';
import { IconProps } from '../../typings';
import { LinkProps } from 'react-router-dom';

interface Props {
    to?: string;
    icon: SFC<IconProps> | ComponentClass<IconProps>;
    onClick?: () => void;
}

const MenuItem = styled.li`
    width: 200px;
`;

const Button = styled.button`
    display: block;
    cursor: pointer;
    padding: 0.5rem 1rem;
    outline: none;
`;

const LinkedButton = withProps<LinkProps>(styled(Link))`
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

const AccountMenuItem: SFC<Props> = ({ onClick, to = '/', icon: Icon, children }) => {

    const renderIcon = () => (
        <IconWrapper>
            <Icon color={IconColor}/>
        </IconWrapper>
    );

    return (
        <MenuItem>
            {
                onClick
                    ? (
                        <Button onClick={onClick}>
                            {renderIcon()}
                            {children}
                        </Button>
                    )
                    : (
                        <LinkedButton to={to}>
                            {renderIcon()}
                            {children}
                        </LinkedButton>
                    )
            }
        </MenuItem>
    );
};

export default AccountMenuItem;