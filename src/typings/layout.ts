export interface Colors {
    readonly primary: {
        medium: string
    };
    readonly shade: {
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
    isCaps?: boolean;
    color?: Color;
    children?: any;
}

export interface ColProps {
    xs: number;
    sm: number;
    md: number;

    xsOffset: number;
    smOffset: number;
    mdOffset: number;

    xsPadding: number;
    smPadding: number;
    mdPadding: number;

    xsPaddingX: number;
    smPaddingX: number;
    mdPaddingX: number;

    xsPaddingY: number;
    smPaddingY: number;
    mdPaddingY: number;

    xsPaddingTop: number;
    smPaddingTop: number;
    mdPaddingTop: number;

    xsPaddingRight: number;
    smPaddingRight: number;
    mdPaddingRight: number;

    xsPaddingBottom: number;
    smPaddingBottom: number;
    mdPaddingBottom: number;

    xsPaddingLeft: number;
    smPaddingLeft: number;
    mdPaddingLeft: number;

    xsHidden: boolean;
    smHidden: boolean;
    mdHidden: boolean;

    xsOrder: number;
    smOrder: number;
    mdOrder: number;

    isCentered: boolean;
}