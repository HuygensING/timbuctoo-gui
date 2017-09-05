import styled from 'styled-components';
import CreateElementWithTag from '../../services/CreateElementWithTag';
import { Color, ThemeProps } from '../../typings/layout';

const setColor = props =>
    (props.theme.colors[props.color] && props.theme.colors[props.color].medium)
    || props.color
    || props.theme.colors.shade.dark;
const setCaps = props => props.isCaps ? 'uppercase' : 'initial';
const setLetterSpacing = props => props.isCapse ? '0.13em' : '0';

interface ElementProps {
    theme: ThemeProps;
    isCaps?: boolean;
    color?: Color;
    children?: any;
}

/*
 * Title
 * Available props: TextProps
 *
 * Usage:
 * <Title tag='h1' size='xxl' weight='bold' color='quarts' isCaps={false}>This is a title</Title>
 */
export const Title = styled((props: ElementProps) => CreateElementWithTag(props, 'h1'))`
    margin: 1.1vw 0;
    font: ${(props: ElementProps) => props.theme.fonts.heading};
    text-transform: ${setCaps};
    color: ${setColor};
    letter-spacing: ${setLetterSpacing};
`;

/*
* Subtitle
* Available props: TextProps
*
* Usage:
* <Subtitle tag='h2' size='m' weight='light' color='quarts' isCaps={true}>This is a subtitle</Subtitle>
*/
export const Subtitle = styled((props: ElementProps) => CreateElementWithTag(props, 'h2'))`
    margin: 1.1vw 0;
    font: ${(props: ElementProps) => props.theme.fonts.title};
    text-transform: ${setCaps};
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
export const Content = styled((props: ElementProps) => CreateElementWithTag(props, 'p'))`
    margin: 0;
    font: ${(props: ElementProps) => props.theme.fonts.body};
    text-transform: ${setCaps};
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
export const Label = styled((props: ElementProps) => CreateElementWithTag(props, 'span'))`
    margin: 0;
    font: ${(props: ElementProps) => props.theme.fonts.small};
    text-transform: ${setCaps};
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

interface LinkProps {
    /*
     * React Router specific
     */
    to: string | Object;
    exact: boolean;
    replace: boolean;

    /*
     * StyledCopy specific
     */
    children: any;
    tag: string;
    size: string;
    theme: ThemeProps;
    color: Color;
    hoverColor: 'primary' | 'shade' | string;
    weight: string;
    isCaps: boolean;
}

export const Link = styled((props: LinkProps) => CreateElementWithTag(props, 'Link'))`
    margin: 0;
    
    font: ${(props: LinkProps) => props.theme.fonts.body};
    text-transform: ${setCaps};
    color: ${setColor};
    letter-spacing: ${setLetterSpacing};

    text-decoration: none;
    
    line-height: 1.6;

    &:hover {
        color: ${(props: LinkProps) => 
        (props.theme.colors[props.hoverColor] && props.theme.colors[props.hoverColor].medium ) 
        || props.hoverColor 
        || props.theme.colors.shade.dark};
    }
`;