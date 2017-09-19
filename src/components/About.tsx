import React, { SFC } from 'react';
import styled from 'styled-components';
import { Col, FullSection } from './layout/Grid';
import { Content, Title } from './layout/StyledCopy';

interface Props {
    title: string | null;
    body: string | null;
}

const AboutSection = styled(FullSection)`
    
`;

const About: SFC<Props> = ({ title, body }) => (
    <AboutSection>
        <Col sm={14}>
            <Title>{title}</Title>
            <Content>{body}</Content>
        </Col>
    </AboutSection>
);

export default About;