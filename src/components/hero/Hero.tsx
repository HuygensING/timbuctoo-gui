import * as React from 'react';
import styled from '../../styled-components';

import theme from '../../theme';

import { Col } from '../layout/Grid';
import Image from '../layout/Image';
import { Content, HeroTitle } from '../layout/StyledCopy';
import { ButtonLink } from '../layout/Button';
import getEnvVar from '../../services/getEnvVar';

const HeroImageWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 40vh;
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
    white-space: pre-line;
`;

const ButtonContainer = styled.div`
    position: relative;
    padding: 1rem;
    text-align: center;
`;

interface HeroProps {
    title: string | null;
    content: string | null;
    searchPath: string | null;
    buttonText?: string | null;
    imgUrl: string | null;
}
const defaultImgUrl = getEnvVar('REACT_APP_DEFAULT_HERO_IMAGE');
const Hero = ({ title, content, searchPath, buttonText, imgUrl }: HeroProps) => {
    return (
        <Col>
            <HeroImageWrapper>
                <Image src={imgUrl} fillOut={true} defaultSrc={defaultImgUrl} />
                <DarkenImage />
            </HeroImageWrapper>
            <CenteredContent>
                <HeroTitle align="center" color={theme.colors.white}>
                    {title}
                </HeroTitle>
                {content && (
                    <Content align="center" color={theme.colors.white}>
                        {content}
                    </Content>
                )}
                {searchPath &&
                    buttonText && (
                        <ButtonContainer>
                            <ButtonLink to={searchPath}>{buttonText}</ButtonLink>
                        </ButtonContainer>
                    )}
            </CenteredContent>
        </Col>
    );
};

export default Hero;
