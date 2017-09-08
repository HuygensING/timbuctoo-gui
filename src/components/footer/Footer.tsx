import * as React from 'react';
import styled from '../../styled-components';

import { calcColWidth, Grid } from '../layout/Grid';
import { Title } from '../layout/StyledCopy';
import DefinitionList from '../layout/DefinitionList';

const FooterContainer = styled(Grid)`
    padding: ${calcColWidth(1)} ${calcColWidth(3)};
    background-color: ${(props) => props.theme.colors.shade.dark};
`;

const Footer = (props) => {

    return (

        <FooterContainer tag={'footer'}>
            <Title color="#fff">Footer</Title>
            <DefinitionList inverted={true} />
        </FooterContainer>
    );
    
};

export default Footer;