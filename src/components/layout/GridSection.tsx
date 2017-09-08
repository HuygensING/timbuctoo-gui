import React, { Children, ReactChild, SFC } from 'react';

import { Col, Grid } from './Grid';
import { Title } from './StyledCopy';

interface Props {
    title: string;
    gridSize?: number;
    gridOffset?: number;
    colSizeOffset?: number;
    cols?: number;
    rowSpacing?: number;
}

const GridSection: SFC<Props> = ({ children, title, gridSize = 42, gridOffset = 3, colSizeOffset = gridOffset, cols = 2, rowSpacing = colSizeOffset}) => {
    if (!children) { return null; }

    const calcColSize = () => {
        const amountOffsetPerRow = cols - 1;
        const offsetPerRow = amountOffsetPerRow * colSizeOffset;
        const totalSize = gridSize - offsetPerRow;

        return totalSize / cols;
    };

    const colSize = calcColSize();

    const offset = (idx) => {
        if ( cols <= 1 || idx === 0 || idx % cols === 0 ) { return 0; }
        return colSizeOffset;
    };

    const renderItem = (child: ReactChild, idx: number) => (
        <Col key={idx} sm={colSize} smOffset={offset(idx)} smPaddingBottom={rowSpacing}>
            {child}
        </Col>
    );

    const renderAllItems = Children.map(children, renderItem);

    return (
        <Grid tag={'section'} sm={gridSize} smOffset={gridOffset}>
            <Col sm={gridSize}><Title>{title}</Title></Col>
            {renderAllItems}
        </Grid>
    );
};

export default GridSection;