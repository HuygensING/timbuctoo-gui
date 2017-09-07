import * as React from 'react';
import styled from '../../styled-components';

import { ContentProps } from '../../typings';
import { Col, calcColWidth } from '../layout/Grid';
import { Subtitle, Content } from '../layout/StyledCopy';
import Image from '../layout/Image';

const ContentBlock = styled(Col)`
    &:not(:first-child) {
        margin-left: ${calcColWidth(1)};
    }
`;

const PromotedContentBlock = (props: ContentProps) => {
    return (
        <ContentBlock sm={7}>
            <Image src={props.imageUrl} ratio={1} />
            <Subtitle>{props.caption}</Subtitle>
            <Content>{props.description && props.description.substr(0, 100)}...</Content>
        </ContentBlock>
    );
};

export default PromotedContentBlock;