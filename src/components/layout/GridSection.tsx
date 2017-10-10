import React, { Children, ReactChild, SFC } from 'react';

import { Col, Grid } from './Grid';
import { Title } from './StyledCopy';

interface Props {
    tag?: string;
    title?: string;
    gridSize?: number;
    gridOffset?: number;
    colSizeOffset?: number;
    cols?: number;
    rowSpacing?: number;
    gridSpacing?: number;
}

const GridSection: SFC<Props> = ({ tag = 'section', children, title, gridSize = 42, gridOffset = 3, colSizeOffset = gridOffset, cols = 2, rowSpacing = colSizeOffset, gridSpacing = 0 }) => {
    if (!children) { return null; }

    const calcColSize = () => {
        const amountOffsetPerRow = cols - 1;
        const offsetPerRow = amountOffsetPerRow * colSizeOffset;
        const totalSize = gridSize - offsetPerRow;

        return totalSize / cols;
    };

    const colSize = calcColSize();

    const offset = (idx) => {
        if (cols <= 1 || idx === 0 || idx % cols === 0) { return 0; }
        return colSizeOffset;
    };

    const renderItem = (child: ReactChild, idx: number) => (
        <Col key={idx} sm={colSize} smOffset={offset(idx)} smPaddingBottom={rowSpacing}>
            {child}
        </Col>
    );

    const renderAllItems = Children.map(children, renderItem);

    return (
        <Grid tag={tag} sm={gridSize} smOffset={gridOffset}>
            {title && title.length > 0 && <Col sm={gridSize} smPaddingTop={gridSpacing}><Title>{title}</Title></Col>}
            {renderAllItems}
        </Grid>
    );
};

export default GridSection;