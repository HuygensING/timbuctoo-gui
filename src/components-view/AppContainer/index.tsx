import React, { SFC } from 'react';
import { default as styled } from 'styled-components';
import { UnstyledAnchor as A, StyledAnchor } from './HyperLink';
import Tooltip, { ALIGN } from '../../components/Tooltip';
import PoweredBy from '../../components/PoweredBy';
import { Grid, calcColWidth, Col } from '../../components/layout/Grid';
import Logout from '../../components/icons/Logout';
import theme from '../../theme';
import { srOnly, Content } from '../../components/layout/StyledCopy';
import translate from '../../services/translate';
import { addressData } from '../../constants/address';
import { MenuItem } from './MenuItem';
import { NameAndAvatar } from './NameAndAvatar';
import Book from '../../components/icons/Book';

const HEADER_HEIGHT: string = '4rem';

/*
  - when a parent component interacts with a child component: put it in one SFC
  - when a "thing" is repeated across multiple places in the app (from the viewpoint of the user) make an SFC (or
    multiple if they are different from a technical point of view) and put all of them in a separate file
  - use styledcomponents for adding style,
    - try not to use properties and all that stuff. It's often more complicating then
    - feel free to use extend to add more specific styling though
*/

const GridWithMarginForHeader = Grid.extend`
    padding-top: ${HEADER_HEIGHT};
    min-height: 100vh; /*make sure it fills the whole screen, even when the content is too small*/
    flex-direction: column;
`;

const Main = styled.div`
    overflow: scroll;
    flex: 1; /*make it fill all columns of the grid */
`;

const Header = styled.div`
    border-top: 0.5rem solid ${theme.colors.primary.medium};
    display: flex;
    width: 100vw;
    padding: 0.5rem;
    position: fixed;
    top: 0;
    height: ${HEADER_HEIGHT};
    background: ${theme.colors.black};
    backface-visibility: hidden;
    z-index: 100;
`;

// const HomeLink = styled.div`
//     display: inline-block;
// `;

const SectionHomeLink = StyledAnchor.extend`
    display: inline-block;
    color: ${props => props.theme.colors.white};
    border: 1px solid ${props => props.theme.colors.shade.medium};
    border-radius: 0.125rem;
    padding: 0.25rem 0.5rem;
    align-self: center;
    margin-left: 0.5rem;
    transition: all 0.2s ease;

    &:hover {
        color: ${props => props.theme.colors.primary.light};
        border-color: ${props => props.theme.colors.primary.light};
    }
`;

const HomeImage = styled.img`
    margin-left: 1rem;
    height: 2.5rem;
    display: inline-block;
`;

const MenuButton = styled.button`
    padding: 0.25rem 1rem;
    border: 1px solid #fff;
    border-radius: 0.25rem;
    position: absolute;
    background: transparent;
    font: ${props => props.theme.fonts.body};
    right: 1rem;
    top: 50%;
    color: #fff;
    text-decoration: none;
    cursor: pointer;
    transform: translateY(-50%);
`;

interface AppProps {
    homeUrl: string;
    menuIsExpanded: boolean;
    logo: {
        url: string;
        alt: string;
    };
    sectionHomeLink?: {
        url: string;
        caption: string;
    };
    loggedInUser?: {
        username: string;
        avatarUrl: string;
    };
    onLogoutClick: () => void;
    onLoginClick: () => void;
    onOpenMenuClick: () => void;
}

const HomeLink: SFC<{ homeUrl: string; logo: { url: string; alt: string } }> = props => (
    <A href={props.homeUrl}>
        <HomeImage src={props.logo.url} alt={props.logo.alt} />
    </A>
);

const FooterContainer = styled(Grid)`
    flex-shrink: 0;
    padding: ${calcColWidth(1)} ${calcColWidth(3)};
    background-color: ${props => props.theme.colors.black};
`;

const WhiteCol = styled(Col)`
    color: #fff;
`;

const H1 = styled.h1`
    ${srOnly};
`;

const Dt = styled.dt`
    ${srOnly};
`;

const Dd = styled.dd`
    color: ${props => props.theme.colors.white};
    margin: 0;
    padding: 0;
    white-space: nowrap;
`;

const Dl = styled.dl`
    margin: 0;
    padding: 0;
    color: #fff;
    font: ${p => p.theme.fonts.body};
`;

export const AppContainer: SFC<AppProps> = props => (
    <GridWithMarginForHeader>
        <Header>
            <HomeLink homeUrl={props.homeUrl} logo={props.logo} />
            {props.sectionHomeLink && (
                <SectionHomeLink href={props.sectionHomeLink.url}>{props.sectionHomeLink.caption}</SectionHomeLink>
            )}
            {props.loggedInUser === undefined ? (
                <MenuButton onClick={props.onLoginClick}>Login</MenuButton>
            ) : (
                <NameAndAvatar
                    onClick={props.onOpenMenuClick}
                    avatarUrl={props.loggedInUser.avatarUrl}
                    username={props.loggedInUser.username}
                />
            )}
            {props.loggedInUser !== undefined &&
                props.menuIsExpanded && (
                    <Tooltip align={ALIGN.right} alignOffset={'1.5rem'} interactable={true}>
                        <ul>
                            <MenuItem
                                icon={Book}
                                type="anchor"
                                href="/account/datasets"
                                onClick={props.onOpenMenuClick}
                            >
                                My Datasets
                            </MenuItem>
                            <MenuItem
                                icon={Logout}
                                type="button"
                                onClick={() => {
                                    props.onLogoutClick();
                                    props.onLogoutClick();
                                }}
                            >
                                Log out
                            </MenuItem>
                        </ul>
                    </Tooltip>
                )}
        </Header>
        <Main>{props.children}</Main>
        <FooterContainer tag={'footer'}>
            <H1>Footer</H1>
            {props.loggedInUser && (
                <WhiteCol sm={8}>
                    {/* <button onClick={() => switchLanguage('nl')}>NL</button> |{' '}
              <button onClick={() => switchLanguage('en')}>EN</button> */}
                </WhiteCol>
            )}
            <WhiteCol sm={8} smOffset={props.loggedInUser ? 26 : 34}>
                <Content color={'#fff'}>{translate('footer.powered_by')}:</Content>
                <Dl>
                    <Dt>{translate('footer.company_name')}</Dt>
                    <Dd>{addressData.company}</Dd>

                    <Dt>{translate('footer.street')}</Dt>
                    <Dd>{addressData.street}</Dd>

                    <Dt>{translate('footer.address')}</Dt>
                    <Dd>
                        {addressData.zip} {addressData.city}
                    </Dd>

                    <Dt>{translate('footer.phone')}</Dt>
                    <Dd>{addressData.phone}</Dd>

                    <Dt>{translate('footer.opening_hours')}</Dt>
                    <Dd>{addressData.openingHours}</Dd>
                </Dl>
            </WhiteCol>
        </FooterContainer>
        <PoweredBy />
    </GridWithMarginForHeader>
);
