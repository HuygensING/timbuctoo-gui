import React, { SFC } from 'react';
import { default as styled } from 'styled-components';
import { StyledAnchor } from './HyperLink';

const Button = styled.button`
    display: block;
    cursor: pointer;
    padding: 0.5rem 1rem;
    outline: none;
    text-align: left;
`;

const LinkedButton = StyledAnchor.extend`
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

type MenuItemProps =
    | {
          type: 'anchor';
          href: string;
          onClick?: () => void;
          icon?: SFC<{ color?: string }>;
      }
    | {
          type: 'button';
          onClick: () => void;
          icon?: SFC<{ color?: string }>;
      };

export const MenuItem: SFC<MenuItemProps> = function(props) {
    if (props.type === 'button') {
        return (
            <li>
                <Button style={{ width: 200 }} onClick={props.onClick}>
                    <IconWrapper>{props.icon && <props.icon color="#114235" />}</IconWrapper>
                    {props.children}
                </Button>
            </li>
        );
    } else {
        return (
            <li>
                <LinkedButton style={{ width: 200 }} href={props.href} onClick={props.onClick}>
                    <IconWrapper>{props.icon && <props.icon color="#114235" />}</IconWrapper>
                    {props.children}
                </LinkedButton>
            </li>
        );
    }
};
