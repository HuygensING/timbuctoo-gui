import React from 'react';
import styled, { withProps } from '../../styled-components';
import { GridProps, ColProps } from '../../typings/layout';

export const BREAKPOINT = {
    MOBILE: '767px',
    TABLET: '1024px'
};

const BREAKPOINT_KEYS = {
    MOBILE: ['xs'],
    TABLET: ['xs', 'sm'],
    DESKTOP: ['xs', 'sm', 'md']
};

export const TOTAL_COLUMNS = 48;
const calcColWidth = (cols: number) => `${cols / TOTAL_COLUMNS * 100}vw`;

// const calcToCol = (px: number) => calc px to percentages using innerWidth and divide by total columns;

const getProp = (props: GridProps, queries: string[] = BREAKPOINT_KEYS.DESKTOP, prop: string): number => {
    if (!prop) {
        return 0;
    }
    let _prop: number = 0;
    for (let key of queries) {
        const actualKey = `${key}${prop}` as keyof GridProps;

        if (props[actualKey]) {
            _prop = props[actualKey] as number;
        }
        if ((props[actualKey] as boolean) === false) {
            _prop = 0;
        }
    }
    return _prop;
};

const getOffset = (props: GridProps, queries?: string[]) => getProp(props, queries, 'Offset');
const getPadding = (props: GridProps, queries?: string[]) => getProp(props, queries, 'Padding');
const getPaddingX = (props: GridProps, queries?: string[]) => getProp(props, queries, 'PaddingX');
const getPaddingY = (props: GridProps, queries?: string[]) => getProp(props, queries, 'PaddingY');
const getPaddingTop = (props: GridProps, queries?: string[]) => getProp(props, queries, 'PaddingTop');
const getPaddingRight = (props: GridProps, queries?: string[]) => getProp(props, queries, 'PaddingRight');
const getPaddingBottom = (props: GridProps, queries?: string[]) => getProp(props, queries, 'PaddingBottom');
const getPaddingLeft = (props: GridProps, queries?: string[]) => getProp(props, queries, 'PaddingLeft');
const getOrder = (props: GridProps, queries?: string[]) => getProp(props, queries, 'Order');

const isHidden = (props: GridProps, breakpoint: 'sm' | 'md' | 'xs') => {
    if (breakpoint) {
        return props[`${breakpoint}Hidden` as 'smHidden'];
    }
    return false;
};

const Grid = withProps<GridProps>(styled.section)`
    display: flex;
    flex: 0 1 auto;
    flex-direction: row;
    position: relative;
    flex-wrap: wrap;
    width: ${(props: GridProps) =>
        calcColWidth(
            (props.md as number) || (props.sm as number) || (props.xs as number) || TOTAL_COLUMNS - getOffset(props)
        )};
    margin-top: 0;
    margin-left: ${(props: GridProps) => calcColWidth(getOffset(props))};

    /*
     * Tablet specific rules
     */
    @media (max-width: ${BREAKPOINT.TABLET}) {
        width: ${(props: GridProps) =>
            calcColWidth(
                (props.sm as number) || (props.xs as number) || TOTAL_COLUMNS - getOffset(props, BREAKPOINT_KEYS.TABLET)
            )};
        margin-left: ${(props: GridProps) => `${calcColWidth(getOffset(props, BREAKPOINT_KEYS.TABLET))}`};
    }

    /*
     * Mobile specific rules
     */
    @media (max-width: ${BREAKPOINT.MOBILE}) {
        width: ${(props: GridProps) =>
            calcColWidth((props.xs as number) || TOTAL_COLUMNS - getOffset(props, BREAKPOINT_KEYS.MOBILE))};
        margin-left: ${(props: GridProps) => `${calcColWidth((props.xsOffset as number) || 0)}`};
    }
`;

const Col = withProps<ColProps>(styled.div)`
    ${props => {
        if (isHidden(props, 'md')) {
            return 'display: none;';
        }
        return '';
    }} ${props => {
    if (props.isCentered) {
        return 'display: flex; align-items: center;';
    }
    return '';
}} position: relative;
    order: ${props => getOrder(props) || 'initial'};

    width: ${props => calcColWidth(props.md || props.sm || props.xs || TOTAL_COLUMNS - getOffset(props))};

    margin-left: ${props => calcColWidth(getOffset(props))};

    padding-top: ${props => calcColWidth(getPaddingTop(props) || getPaddingY(props) || getPadding(props))};
    padding-right: ${props => calcColWidth(getPaddingRight(props) || getPaddingX(props) || getPadding(props))};
    padding-bottom: ${props => calcColWidth(getPaddingBottom(props) || getPaddingY(props) || getPadding(props))};
    padding-left: ${props => calcColWidth(getPaddingLeft(props) || getPaddingX(props) || getPadding(props))};

    /*
     * Tablet specific rules
     */
    @media (max-width: ${BREAKPOINT.TABLET}) {
        ${props => {
            if (isHidden(props, 'sm')) {
                return 'display: none;';
            }
            return '';
        }} order: ${props => getOrder(props, BREAKPOINT_KEYS.TABLET) || 'initial'};

        width: ${props =>
            calcColWidth(props.sm || props.xs || TOTAL_COLUMNS - getOffset(props, BREAKPOINT_KEYS.TABLET))};

        margin-left: ${props => `${calcColWidth(getOffset(props, BREAKPOINT_KEYS.TABLET))}`};

        padding-top: ${props =>
            calcColWidth(
                getPaddingTop(props, BREAKPOINT_KEYS.TABLET) ||
                    getPaddingY(props, BREAKPOINT_KEYS.TABLET) ||
                    getPadding(props, BREAKPOINT_KEYS.TABLET)
            )};
        padding-right: ${props =>
            calcColWidth(
                getPaddingRight(props, BREAKPOINT_KEYS.TABLET) ||
                    getPaddingX(props, BREAKPOINT_KEYS.TABLET) ||
                    getPadding(props, BREAKPOINT_KEYS.TABLET)
            )};
        padding-bottom: ${props =>
            calcColWidth(
                getPaddingBottom(props, BREAKPOINT_KEYS.TABLET) ||
                    getPaddingY(props, BREAKPOINT_KEYS.TABLET) ||
                    getPadding(props, BREAKPOINT_KEYS.TABLET)
            )};
        padding-left: ${props =>
            calcColWidth(
                getPaddingLeft(props, BREAKPOINT_KEYS.TABLET) ||
                    getPaddingX(props, BREAKPOINT_KEYS.TABLET) ||
                    getPadding(props, BREAKPOINT_KEYS.TABLET)
            )};
    }

    /*
    * Mobile specific rules
    */
    @media (max-width: ${BREAKPOINT.MOBILE}) {
        ${props => {
            if (isHidden(props, 'xs')) {
                return 'display: none;';
            }
            return '';
        }} 
        
        order:${props => getOrder(props, BREAKPOINT_KEYS.MOBILE) || 'initial'};

        width: ${props => calcColWidth(props.xs || TOTAL_COLUMNS - getOffset(props, BREAKPOINT_KEYS.MOBILE))};
        margin-left: ${props => `${calcColWidth(getOffset(props, BREAKPOINT_KEYS.MOBILE))}`};

        padding-top: ${props =>
            calcColWidth(
                getPaddingTop(props, BREAKPOINT_KEYS.MOBILE) ||
                    getPaddingY(props, BREAKPOINT_KEYS.MOBILE) ||
                    getPadding(props, BREAKPOINT_KEYS.MOBILE)
            )};
        padding-right: ${props =>
            calcColWidth(
                getPaddingRight(props, BREAKPOINT_KEYS.MOBILE) ||
                    getPaddingX(props, BREAKPOINT_KEYS.MOBILE) ||
                    getPadding(props, BREAKPOINT_KEYS.MOBILE)
            )};
        padding-bottom: ${props =>
            calcColWidth(
                getPaddingBottom(props, BREAKPOINT_KEYS.MOBILE) ||
                    getPaddingY(props, BREAKPOINT_KEYS.MOBILE) ||
                    getPadding(props, BREAKPOINT_KEYS.MOBILE)
            )};
        padding-left: ${props =>
            calcColWidth(
                getPaddingLeft(props, BREAKPOINT_KEYS.MOBILE) ||
                    getPaddingX(props, BREAKPOINT_KEYS.MOBILE) ||
                    getPadding(props, BREAKPOINT_KEYS.MOBILE)
            )};
    }
`;

const FullSection = ({ children }: { children: any }) => (
    <Grid tag={'section'} sm={42} smOffset={3}>
        {children}
    </Grid>
);

export { Grid, Col, calcColWidth, FullSection };
