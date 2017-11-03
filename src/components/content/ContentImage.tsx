import React from 'react';
import styled from '../../styled-components';

import Image from '../layout/Image';

const IMAGE_TYPES = {
    normal: 'normal',
    rounded: 'rounded'
};

const IMAGE_RATIO = {
    landscape: 16 / 9,
    portrait: 9 / 16,
    square: 1
};

const ImageWrapper = styled.figure`
    position: relative;
    overflow: hidden;
    width: ${props => props.width || '100%'};
    margin: 1rem auto;

    border-radius: ${props => {
        if (props.type === IMAGE_TYPES.rounded) {
            return '50%';
        }
        return 0;
    }};
`;

const ContentImage = (props: {src?: string, alt?: string, options: {ratio?: number}}) => {
    const options = {
        type: IMAGE_TYPES.normal,
        ratio: IMAGE_RATIO.landscape
    };
    const { src, alt } = props;
    if (props.options.ratio !== undefined) {
        options.ratio = props.options.ratio;
    }

    return (
        <ImageWrapper {...options}>
            <Image src={src} alt={alt} ratio={options.ratio}/>
        </ImageWrapper>
    );
};

export default ContentImage;