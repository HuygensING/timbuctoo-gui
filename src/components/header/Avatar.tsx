import React, { SFC } from 'react';
import styled from '../../styled-components';

import Image from '../layout/Image';

export enum SIZE { small, large }
interface Props {
    size: SIZE.small | SIZE.large;
    src: string;
}

const setSize = (size) => {
    switch (size) {
        case SIZE.small:    return '2rem';
        case SIZE.large:    return '4rem';
        default:            return '3rem';
    }
};

const AvatarMask = styled.figure`
    position: relative;
    display: inline-block;
    overflow: hidden;
    width: ${props => setSize(props.size)};
    height: ${props => setSize(props.size)};
    border-radius: 50%;
    vertical-align: middle;
`;

const Avatar: SFC<Props> = ({ size, src }) => {
    return (
        <AvatarMask size={size}>
            <Image src={src} ratio={1}/>
        </AvatarMask>
    );
};

export default Avatar;
