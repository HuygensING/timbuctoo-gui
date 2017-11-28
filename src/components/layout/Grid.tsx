import React from 'react';
import styled from '../../styled-components';
import { GridProps, ColProps } from '../../typings/layout';
import CreateElementWithTag from '../../services/CreateElementWithTag';

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

const getProp = (props: number, queries: string[] = BREAKPOINT_KEYS.DESKTOP, prop: string) => {
    if (!prop) {
        return 0;
    }
    let _prop = 0;
    for (let key of queries) {
        if (props[`${key}${prop}`]) {
            _prop = props[`${key}${prop}`];
        }
        if (props[`${key}${prop}`] === false) {
            _prop = 0;
        }
    }
    return _prop;
};

const getOffset = (props, queries?: string[]) => getProp(props, queries, 'Offset');
const getPadding = (props, queries?: string[]) => getProp(props, queries, 'Padding');
const getPaddingX = (props, queries?: string[]) => getProp(props, queries, 'PaddingX');
const getPaddingY = (props, queries?: string[]) => getProp(props, queries, 'PaddingY');
const getPaddingTop = (props, queries?: string[]) => getProp(props, queries, 'PaddingTop');
const getPaddingRight = (props, queries?: string[]) => getProp(props, queries, 'PaddingRight');
const getPaddingBottom = (props, queries?: string[]) => getProp(props, queries, 'PaddingBottom');
const getPaddingLeft = (props, queries?: string[]) => getProp(props, queries, 'PaddingLeft');
const getOrder = (props, queries?: string[]) => getProp(props, queries, 'Order');

const isHidden = (props, breakpoint) => {
    if (breakpoint) {
        return props[`${breakpoint}Hidden`];
    }
    return false;
};

const Grid = styled((props: GridProps) => CreateElementWithTag(props, 'section'))`
    display: flex;
    flex: 0 1 auto;
    flex-direction: row;
    position: relative;
    flex-wrap: wrap;
    width: ${(props: GridProps) => calcColWidth(props.md || props.sm || props.xs || TOTAL_COLUMNS - getOffset(props))};
    margin-top: 0;
    margin-left: ${(props: GridProps) => calcColWidth(getOffset(props))};

    /*
     * Tablet specific rules
     */
    @media (max-width: ${BREAKPOINT.TABLET}) {
        width: ${(props: GridProps) =>
            calcColWidth(props.sm || props.xs || TOTAL_COLUMNS - getOffset(props, BREAKPOINT_KEYS.TABLET))};
        margin-left: ${(props: GridProps) => `${calcColWidth(getOffset(props, BREAKPOINT_KEYS.TABLET))}`};
    }

    /*
     * Mobile specific rules
     */
    @media (max-width: ${BREAKPOINT.MOBILE}) {
        width: ${(props: GridProps) =>
            calcColWidth(props.xs || TOTAL_COLUMNS - getOffset(props, BREAKPOINT_KEYS.MOBILE))};
        margin-left: ${(props: GridProps) => `${calcColWidth(props.xsOffset || 0)}`};
    }
`;

const Col = styled((props: ColProps) => CreateElementWithTag(props, 'div'))`
    ${(props: ColProps) => {
        if (isHidden(props, 'md')) {
            return 'display: none;';
        }
        return '';
    }} ${(props: ColProps) => {
            if (props.isCentered) {
                return 'display: flex; align-items: center;';
            }
            return '';
        }} position: relative;
    order: ${(props: ColProps) => getOrder(props) || 'initial'};

    width: ${(props: ColProps) => calcColWidth(props.md || props.sm || props.xs || TOTAL_COLUMNS - getOffset(props))};

    margin-left: ${(props: ColProps) => calcColWidth(getOffset(props))};

    padding-top: ${(props: ColProps) => calcColWidth(getPaddingTop(props) || getPaddingY(props) || getPadding(props))};
    padding-right: ${(props: ColProps) =>
        calcColWidth(getPaddingRight(props) || getPaddingX(props) || getPadding(props))};
    padding-bottom: ${(props: ColProps) =>
        calcColWidth(getPaddingBottom(props) || getPaddingY(props) || getPadding(props))};
    padding-left: ${(props: ColProps) =>
        calcColWidth(getPaddingLeft(props) || getPaddingX(props) || getPadding(props))};

    /*
     * Tablet specific rules
     */
    @media (max-width: ${BREAKPOINT.TABLET}) {
        ${(props: ColProps) => {
            if (isHidden(props, 'sm')) {
                return 'display: none;';
            }
            return '';
        }} order: ${(props: ColProps) => getOrder(props, BREAKPOINT_KEYS.TABLET) || 'initial'};

        width: ${(props: ColProps) =>
            calcColWidth(props.sm || props.xs || TOTAL_COLUMNS - getOffset(props, BREAKPOINT_KEYS.TABLET))};

        margin-left: ${(props: ColProps) => `${calcColWidth(getOffset(props, BREAKPOINT_KEYS.TABLET))}`};

        padding-top: ${(props: ColProps) =>
            calcColWidth(
                getPaddingTop(props, BREAKPOINT_KEYS.TABLET) ||
                    getPaddingY(props, BREAKPOINT_KEYS.TABLET) ||
                    getPadding(props, BREAKPOINT_KEYS.TABLET)
            )};
        padding-right: ${(props: ColProps) =>
            calcColWidth(
                getPaddingRight(props, BREAKPOINT_KEYS.TABLET) ||
                    getPaddingX(props, BREAKPOINT_KEYS.TABLET) ||
                    getPadding(props, BREAKPOINT_KEYS.TABLET)
            )};
        padding-bottom: ${(props: ColProps) =>
            calcColWidth(
                getPaddingBottom(props, BREAKPOINT_KEYS.TABLET) ||
                    getPaddingY(props, BREAKPOINT_KEYS.TABLET) ||
                    getPadding(props, BREAKPOINT_KEYS.TABLET)
            )};
        padding-left: ${(props: ColProps) =>
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
        ${(props: ColProps) => {
            if (isHidden(props, 'xs')) {
                return 'display: none;';
            }
            return '';
        }} order: ${(props: ColProps) => getOrder(props, BREAKPOINT_KEYS.MOBILE) || 'initial'};

        width: ${(props: ColProps) =>
            calcColWidth(props.xs || TOTAL_COLUMNS - getOffset(props, BREAKPOINT_KEYS.MOBILE))};
        margin-left: ${(props: ColProps) => `${calcColWidth(getOffset(props, BREAKPOINT_KEYS.MOBILE))}`};

        padding-top: ${(props: ColProps) =>
            calcColWidth(
                getPaddingTop(props, BREAKPOINT_KEYS.MOBILE) ||
                    getPaddingY(props, BREAKPOINT_KEYS.MOBILE) ||
                    getPadding(props, BREAKPOINT_KEYS.MOBILE)
            )};
        padding-right: ${(props: ColProps) =>
            calcColWidth(
                getPaddingRight(props, BREAKPOINT_KEYS.MOBILE) ||
                    getPaddingX(props, BREAKPOINT_KEYS.MOBILE) ||
                    getPadding(props, BREAKPOINT_KEYS.MOBILE)
            )};
        padding-bottom: ${(props: ColProps) =>
            calcColWidth(
                getPaddingBottom(props, BREAKPOINT_KEYS.MOBILE) ||
                    getPaddingY(props, BREAKPOINT_KEYS.MOBILE) ||
                    getPadding(props, BREAKPOINT_KEYS.MOBILE)
            )};
        padding-left: ${(props: ColProps) =>
            calcColWidth(
                getPaddingLeft(props, BREAKPOINT_KEYS.MOBILE) ||
                    getPaddingX(props, BREAKPOINT_KEYS.MOBILE) ||
                    getPadding(props, BREAKPOINT_KEYS.MOBILE)
            )};
    }
`;

const FullSection = ({ children }) => (
    <Grid tag={'section'} sm={42} smOffset={3}>
        {children}
    </Grid>
);

export { Grid, Col, calcColWidth, FullSection };
