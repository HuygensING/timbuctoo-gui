import * as React from 'react';

import { Grid, FullSection } from '../layout/Grid';
import { Title } from '../layout/StyledCopy';

import FeaturedContentBlock from './FeaturedContentBlock';

const PromotedContent = (props) => {

    function renderContent(data: any) {
        return data && data.map( (content, index) => <FeaturedContentBlock key={index} {...content} /> ) || <div>Loading</div>;
    }

    return (
        <FullSection>
            <Title>{props.title}</Title>
            <Grid sm={42}>
                {renderContent(props.data)}
            </Grid>
            {/* <pre>{JSON.stringify(props, null, 4)}</pre> */}
        </FullSection>
    );
};

export default PromotedContent;