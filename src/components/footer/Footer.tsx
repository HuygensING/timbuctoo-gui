import * as React from 'react';
import styled from '../../styled-components';

import { calcColWidth } from '../layout/Grid';
import { Title } from '../layout/StyledCopy';

const FooterContainer = styled.footer`
    padding: ${calcColWidth(3)};
    background-color: ${(props) => props.theme.colors.shade.dark};
`;

const Footer = (props) => {

    return (
        <FooterContainer>
            <Title color="#fff">Footer</Title>
        </FooterContainer>
    );
    
};

export default Footer;