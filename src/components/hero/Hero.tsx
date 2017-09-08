import * as React from 'react';
import styled from '../../styled-components';

import theme from '../../theme';

import { Col } from '../layout/Grid';
import Image from '../layout/Image';
import { Title, Content } from '../layout/StyledCopy';
import Button from '../layout/Button';

const HeroImageWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 80vh;
`;

const DarkenImage = styled.figure`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    background-color: rgba(0, 0, 0, 0.4);
    content: '';
`;

const CenteredContent = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const ButtonContainer = styled.div`
    position: relative;
    padding: 1rem;
    text-align: center;
`;

interface HeroProps {
    search?: boolean;
}

const Hero = (props: HeroProps) => {

    return (
        <Col>
            <HeroImageWrapper>
                <Image src={'/assets/_tmp/header--library.jpg'} fill={true} />
                <DarkenImage />
            </HeroImageWrapper>
            <CenteredContent>
                <Title align="center" color={theme.colors.shade.light}>We care for your data</Title>
                <Content align="center" color={theme.colors.shade.light}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim in nisi, dolorem, ipsum labore sint voluptatibus tempora itaque eius maxime mollitia aliquid ex soluta. Voluptate quam quidem quia ipsa dolores?    
                </Content>
                <ButtonContainer>
                    <Button to="/" align="center">Browse datasets</Button>
                </ButtonContainer>
            </CenteredContent>
        </Col>
    );
};

export default Hero;