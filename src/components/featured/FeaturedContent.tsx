import * as React from 'react';

import { Grid, Col } from '../layout/Grid';
import { Title } from '../layout/StyledCopy';

import FeaturedContentBlock from './FeaturedContentBlock';

const PromotedContent = (props) => {

    function renderContent(data: any) {
        return data && data.map( (content, index) => <FeaturedContentBlock key={index} {...content} /> ) || <div>Loading</div>;
    }

    return (
        <Col sm={42} smOffset={3} smPaddingY={2}>
            <Title>{props.title}</Title>
            <Grid sm={42}>
                {renderContent(props.data)}
            </Grid>
            {/* <pre>{JSON.stringify(props, null, 4)}</pre> */}
        </Col>
    );
};

export default PromotedContent;