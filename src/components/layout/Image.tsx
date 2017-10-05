import React, { PureComponent } from 'react';
import styled from '../../styled-components';
import { ImageProps } from '../../typings/layout';

interface State {
    src: string | null | undefined;
    src2x: string | null | undefined;
}

const ImageWrapper = styled.figure`
    position: relative;
    overflow: hidden;
    top: 0;
    left: 0;
    margin: 0;
    width: 100%;
    height: ${(props: ImageProps) => props.fill ? '100%' : 'initial'};
    
    &:before {
        content: '';
        display: block;
        padding-bottom: ${(props: ImageProps) => {
            if (props.fill) {
                return 0;
            }
            return props.ratio ? `${ 100 / props.ratio }%` : '100%';
        }};
    }

    ${(props: ImageProps) => {
        if (props.hover) {
            return `
                &:hover {
                    > img {
                        transform: scale(1.05);
                    }
                }
            `;
        }
        return '';
    }};
`;

const Img = styled.img`
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: ${(props: ImageProps) => props.contain ? 'contain' : 'cover'};
    top: 0;
    left: 0;
    transform: scale(1);
    transition: transform 0.3s ease-in-out;
    background-color: grey;
`;

class Image extends PureComponent<ImageProps, State> {

    image: HTMLImageElement;

    constructor(props: ImageProps) {
        super(props);

        this.state = {
            src: props.src,
            src2x: props.src2x
        };

        this.onLoad = this.onLoad.bind(this);
        this.onError = this.onError.bind(this);
    }
    
    componentDidMount() {
        if (this.image && this.image.complete) {
            this.onLoad();
        }
    }
    
    onLoad() {
        const { onLoad } = this.props;
        this.image.style.opacity = '1';
        if (onLoad) {
            onLoad();
        }
    }

    onError() {
        const { onError, defaultSrc, defaultSrc2x } = this.props;
        this.setState({
            src: defaultSrc,
            src2x: defaultSrc2x || defaultSrc
        });
        if (onError) {
            onError();
        }
    }

    render() {
        const { ratio, fill, alt, contain, hover } = this.props;
        const { src, src2x } = this.state;
        return (
            <ImageWrapper ratio={ratio} fill={fill} hover={hover}>
                <Img
                    contain={contain}
                    onLoad={this.onLoad}
                    onError={this.onError}
                    innerRef={image => this.image = image}
                    srcSet={`${src} 1x, ${src2x || src} 2x`}
                    alt={alt}
                />
            </ImageWrapper>
        );
    }
}

export default Image;