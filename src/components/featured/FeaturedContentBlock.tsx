import * as React from 'react';

import { ROUTE_PATHS } from '../../constants/routeNaming';
import { DataSetProps } from '../../typings';
import { UserReducer } from '../../typings/store';
import { Subtitle, Content, Link } from '../layout/StyledCopy';
import Image from '../layout/Image';

const FeaturedContentBlock = (props: DataSetProps & UserReducer) => {
    return (
        <section>
            <Link to={`${ROUTE_PATHS.details}/${props.hsid}/${props.datasetId}`}>
                <Image src={props.imageUrl} ratio={1} />
                <Subtitle>{props.title}</Subtitle>
                <Content>{props.description && props.description.substr(0, 100)}...</Content>
            </Link>
        </section>
    );
};

export default FeaturedContentBlock;