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
    title: string | null;
    content?: string | null;
    searchPath?: string | null;
    buttonText?: string;
    imgUrl?: string | null;
}

const defaultImgUrl = '/assets/_tmp/header--library.jpg';
const Hero = ({ title, content, searchPath, buttonText, imgUrl = defaultImgUrl }: HeroProps) => {
    return (
        <Col>
            <HeroImageWrapper>
                <Image
                    src={imgUrl}
                    fill={true}
                    defaultSrc={defaultImgUrl}
                />
                <DarkenImage />
            </HeroImageWrapper>
            <CenteredContent>
                <Title align="center" color={theme.colors.white}>{title}</Title>
                {content && <Content align="center" color={theme.colors.white}>{content}</Content>}
                { searchPath && buttonText &&
                    <ButtonContainer>
                        <Button to={searchPath} align="center">{buttonText}</Button>
                    </ButtonContainer>
                }
            </CenteredContent>
        </Col>
    );
};

export default Hero;