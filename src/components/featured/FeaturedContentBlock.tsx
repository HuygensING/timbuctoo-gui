import * as React from 'react';

import { ContentProps } from '../../typings';
import { Subtitle, Content } from '../layout/StyledCopy';
import Image from '../layout/Image';

const FeaturedContentBlock = (props: ContentProps) => {
    return (
        <section>
            <Image src={props.imageUrl} ratio={1} />
            <Subtitle>{props.caption}</Subtitle>
            <Content>{props.description && props.description.substr(0, 100)}...</Content>
        </section>
    );
};

export default FeaturedContentBlock;