import * as React from 'react';

import { ROUTE_PATHS } from '../../constants/routeNaming';
import { UserReducer } from '../../typings/store';
import { Subtitle, Content, Link } from '../layout/StyledCopy';
import Image from '../layout/Image';
import { DataSetMetadata } from '../../typings/timbuctoo/schema';

const FeaturedContentBlock = (props: DataSetMetadata & UserReducer) => {
    return (
        <section>
            <Link to={`${ROUTE_PATHS.details}/${props.datasetId}`}>
                <Image src={props.imageUrl} ratio={1} />
                <Subtitle>{props.title}</Subtitle>
                <Content>{props.description && props.description.substr(0, 100)}...</Content>
            </Link>
        </section>
    );
};

export default FeaturedContentBlock;