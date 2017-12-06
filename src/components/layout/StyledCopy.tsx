import styled, { css, withProps } from '../../styled-components';
import { Color, Colors, ElementProps, ThemeProps } from '../../typings/layout';
import { keyframes } from '../../styled-components';
import { lighten } from 'polished';
import { Link as ReactRouterLink, LinkProps } from 'react-router-dom';

const setColor = (props: ElementProps & { theme: ThemeProps }) =>
    (props.color &&
        props.theme.colors[props.color as keyof Colors] &&
        props.theme.colors[props.color as 'primary' | 'shade'].medium) ||
    props.color ||
    props.theme.colors.black;
const setCaps = (props: ElementProps) => (props.isCaps ? 'uppercase' : 'initial');
const setLetterSpacing = (props: ElementProps) => (props.isCaps ? '0.13em' : '0');
const setAlignment = (props: ElementProps) => (props.align ? props.align : 'left');

export interface StyledCopyLinkProps {
    children?: any;
    tag?: string;
    size?: string;
    color?: Color;
    align?: 'left' | 'right' | 'center';
    hoverColor?: 'primary' | 'shade' | string;
    weight?: string;
    isCaps?: boolean;
}

const anim = keyframes`
    from {
        transform: translateX(-100%);
    }
    
    to {
        transform: translateX(100%);
    }
`;

const EmptyStyle = css`
    &:empty {
        width: ${props => `${Math.random() * 200}px`};
        display: block;
        background: ${props => lighten(0.2, props.theme.colors.shade.light)};
        height: 1rem;

        &:before {
            content: '';
            display: block;
            width: 100%;
            height: 1.5rem;
            background: linear-gradient(
                to right,
                rgba(255, 255, 255, 0) 0%,
                rgba(255, 255, 255, 1) 50%,
                rgba(255, 255, 255, 0) 100%
            );
            animation: ${anim} 1.7s infinite;
            opacity: 0.5;
        }
    }
`;

/*
 * Title
 * Available props: TextProps
 *
 * Usage:
 * <Title size='xxl' weight='bold' color='quarts' isCaps={false}>This is a title</Title>
 */
export const Heading = withProps<ElementProps>(styled.h1)`
    margin: 1.1vw 0;
    font: ${props => props.theme.fonts.heading};
    text-transform: ${setCaps};
    text-align: ${setAlignment};
    color: ${setColor};
    letter-spacing: ${setLetterSpacing};
`;

/*
 * Title
 * Available props: TextProps
 *
 * Usage:
 * <Title size='xxl' weight='bold' color='quarts' isCaps={false}>This is a title</Title>
 */
export const Title = withProps<ElementProps>(styled.h1)`
    margin: 1.1vw 0;
    font: ${props => props.theme.fonts.title};
    text-transform: ${setCaps};
    text-align: ${setAlignment};
    color: ${setColor};
    letter-spacing: ${setLetterSpacing};

    ${EmptyStyle};
`;

/*
* Subtitle
* Available props: TextProps
*
* Usage:
* <Subtitle size='m' weight='light' color='quarts' isCaps={true}>This is a subtitle</Subtitle>
*/
export const Subtitle = withProps<ElementProps>(styled.h2)`
    margin: 1.1vw 0;
    font: ${props => props.theme.fonts.subTitle};
    text-transform: ${setCaps};
    text-align: ${setAlignment};
    color: ${setColor};
    letter-spacing: ${setLetterSpacing};
`;

/*
* Content
* Available props: TextProps
*
* Usage:
* <Content tag='p' size='m' weight='medium' color='quarts' isCaps={false}>This is some content</Content>
*/
export const Content = withProps<ElementProps>(styled.p)`
    margin: 0;
    font: ${props => props.theme.fonts.body};
    text-transform: ${setCaps};
    text-align: ${setAlignment};
    color: ${setColor};
    letter-spacing: ${setLetterSpacing};
`;

/*
 * Label
 * Available props: TextProps
 *
 * Usage:
 * <Label tag='span' size='xl' weight='semibold' color='quarts' isCaps={false}>This is a label</Label>
 */
export const Label = withProps<ElementProps>(styled.span)`
    margin: 0;
    font: ${props => props.theme.fonts.body};
    text-transform: ${setCaps};
    text-align: ${setAlignment};
    color: ${setColor};
    letter-spacing: ${setLetterSpacing};
`;

/*
 * Link
 * Available props: LinkProps
 *
 * Usage:
 * <Link to="/route" >
 */

export const Link = withProps<ElementProps & StyledCopyLinkProps & LinkProps>(styled(ReactRouterLink))`
    margin: 0;
    font: ${props => props.theme.fonts.body};
    text-transform: ${setCaps};
    text-align: ${setAlignment};
    color: ${setColor};
    letter-spacing: ${setLetterSpacing};

    text-decoration: none;

    &:hover {
        color: ${props =>
            (props.hoverColor &&
                props.theme.colors[props.hoverColor as keyof Colors] &&
                props.theme.colors[props.hoverColor as 'primary' | 'shade'].medium) ||
            props.hoverColor ||
            props.theme.colors.shade.dark};
    }
`;

export const srOnly = css`
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
`;
