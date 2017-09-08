import React from 'react';
import styled from '../styled-components';

import { Label } from './layout/StyledCopy';

const logo = require('../assets/logo.svg');

const Tag = styled(Label)`
    position: fixed;
    right: 0;
    bottom: 30px;
    width: auto;
    height: 30px;
    padding: 5px;
    color: ${props => props.theme.colors.shade.light};
    background-color: ${props => props.theme.colors.primary.medium};
    transform-origin: right;
    transform: rotate(90deg);
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