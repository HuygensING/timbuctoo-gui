import React from 'react';
import styled from '../styled-components';

import { Label } from './layout/StyledCopy';

const logo = require('../assets/logo.svg');

const tagWidth: number = 30;

const Tag = styled(Label)`
    position: fixed;
    right: ${tagWidth / 2}px;
    bottom: ${tagWidth}px;
    width: auto;
    height: ${tagWidth}px;
    padding: 5px;
    color: ${props => props.theme.colors.white};
    background-color: ${props => props.theme.colors.primary.medium};
    transform-origin: right;
    transform: rotate(90deg);
    backface-visiblity: hidden;
    z-index: 100;
`;

const Logo = styled.img`
    position: relative;
    vertical-align: middle;
`;

const PoweredBy = (props) => {
    return (
        <Tag>
            Powered by <Logo src={logo} />
        </Tag>
    );
};

export default PoweredBy;