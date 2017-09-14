import * as React from 'react';

import { ROUTE_PATHS } from '../../constants/routeNaming';
import { DataSetProps } from '../../typings';
import { Subtitle, Content, Link } from '../layout/StyledCopy';
import Image from '../layout/Image';

const FeaturedContentBlock = (props: DataSetProps) => {
    return (
        <section>
            <Link to={`${ROUTE_PATHS.details}/userId/${props.datasetId}`}>
                <Image src={props.imageUrl} ratio={1} />
                <Subtitle>{props.title}</Subtitle>
                <Content>{props.description && props.description.substr(0, 100)}...</Content>
            </Link>
        </section>
    );
};

export default FeaturedContentBlock;