import React, { SFC } from 'react';
import styled, { withProps } from '../../styled-components';

import Image from '../layout/Image';

export enum SIZE {
    small = '2rem',
    large = '4rem'
}

interface Props {
    size: SIZE;
    src: string;
}

const AvatarMask = withProps<{ propSize: SIZE }>(styled.figure)`
    position: relative;
    display: inline-block;
    overflow: hidden;
    width: ${props => props.propSize};
    height: ${props => props.propSize};
    border-radius: 50%;
    vertical-align: middle;
`;

const Avatar: SFC<Props> = ({ size, src }) => {
    return (
        <AvatarMask propSize={size}>
            <Image src={src} ratio={1}/>
        </AvatarMask>
    );
};

export default Avatar;
