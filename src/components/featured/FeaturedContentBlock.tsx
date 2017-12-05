import * as React from 'react';

import { ROUTE_PATHS } from '../../constants/routeNaming';
import { Subtitle, Content, Link } from '../layout/StyledCopy';
import Image from '../layout/Image';
import { DataSetMetadata } from '../../typings/schema';
import { getValue } from '../../services/getValue';
import { UserReducer } from '../../reducers/user';

const FeaturedContentBlock = ({ imageUrl, title, description, dataSetId }: DataSetMetadata & UserReducer) => {
    const imageUrlField = getValue(imageUrl);
    const titleField = getValue(title);
    const descrField = getValue(description);

    if (!imageUrlField && !titleField && !descrField) {
        return null;
    }

    return (
        <section>
            <Link to={`/${ROUTE_PATHS.details}/${dataSetId}`}>
                {imageUrlField && <Image src={imageUrlField} ratio={1} />}
                {titleField && <Subtitle>{titleField}</Subtitle>}
                {descrField && <Content>{descrField.substr(0, 100)}...</Content>}
            </Link>
        </section>
    );
};

export default FeaturedContentBlock;
