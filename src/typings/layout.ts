export interface Colors {
    readonly primary: {
        medium: string
    };
    readonly shade: {
        light: string,
        medium: string,
        dark: string
    };
}

export interface Fonts {
    readonly heading: string;
    readonly title: string;
    readonly subTitle: string;
    readonly body: string;
    readonly small: string;
}

export type Color = 'primary' | 'shade' | string;

export interface ThemeProps {
    colors: Colors;
    fonts: Fonts;
}

export interface StyledProps {
    theme?: ThemeProps;
    children?: any;
}

export interface ElementProps {
    theme: ThemeProps;
    isCaps?: boolean;
    color?: Color;
    children?: any;
    align?: 'left' | 'right' | 'center';
}

export interface LinkProps {
    /*
     * React Router specific
     */
    to: string | Object;
    exact?: boolean;
    replace?: boolean;

    /*
     * StyledCopy specific
     */
    children?: any;
    tag?: string;
    size?: string;
    theme?: ThemeProps;
    color?: Color;
    align?: 'left' | 'right' | 'center';
    hoverColor?: 'primary' | 'shade' | string;
    weight?: string;
    isCaps?: boolean;
}

export interface GridProps {
    innerRef?: Function;
    xs?: number;
    sm?: number;
    md?: number;

    xsOffset?: number;
    smOffset?: number;
    mdOffset?: number;
}

export interface ColProps {
    xs?: number;
    sm?: number;
    md?: number;

    xsOffset?: number;
    smOffset?: number;
    mdOffset?: number;

    xsPadding?: number;
    smPadding?: number;
    mdPadding?: number;

    xsPaddingX?: number;
    smPaddingX?: number;
    mdPaddingX?: number;

    xsPaddingY?: number;
    smPaddingY?: number;
    mdPaddingY?: number;

    xsPaddingTop?: number;
    smPaddingTop?: number;
    mdPaddingTop?: number;

    xsPaddingRight?: number;
    smPaddingRight?: number;
    mdPaddingRight?: number;

    xsPaddingBottom?: number;
    smPaddingBottom?: number;
    mdPaddingBottom?: number;

    xsPaddingLeft?: number;
    smPaddingLeft?: number;
    mdPaddingLeft?: number;

    xsHidden?: boolean;
    smHidden?: boolean;
    mdHidden?: boolean;

    xsOrder?: number;
    smOrder?: number;
    mdOrder?: number;

    isCentered?: boolean;
}

export interface ImageProps {
    src?: string;
    src2x?: string;
    alt?: string;
    ratio?: number;
    fill?: boolean;
    contain?: boolean;
    hover?: boolean;
    preload?: boolean;
    onLoad?: Function;
    onError?: Function;
    pageLoadingItemLoading?: Function;
    pageLoadingItemLoaded?: Function;
};