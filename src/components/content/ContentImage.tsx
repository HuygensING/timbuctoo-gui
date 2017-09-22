import React from 'react';
import styled from '../../styled-components';

import Image from '../layout/Image';

const IMAGE_TYPES = {
    square: 'square',
    circle: 'circle'
};

const ImageWrapper = styled.figure`
    position: relative;
    width: 200px;
`;

const ContentImage = (props) => {
    const defaultOptions = {
        type: IMAGE_TYPES.square
    };
    const { src, alt, options = defaultOptions } = props;
    return (
        <ImageWrapper {...options}>
            <Image src={src} alt={alt}/>
        </ImageWrapper>
    );
};

export default ContentImage;