import React, { SFC } from 'react';
import { StyleGuide, DescribedMock, Embed, ContentBlock, withDefaults } from './styleguide-tools';
import { AppContainer, AppProps } from './AppContainer';
import { ThemeProvider } from 'styled-components';
import theme from '../theme';
import { EmPlaces, dummyData } from './emplaces';
import { em_Place } from './emplaces/types/emlo2';

const AppContainer$ = withDefaults<AppProps>('AppContainer', props => <AppContainer {...props} />, {
    homeUrl: 'http://example.org',
    menuIsExpanded: false,
    logo: { alt: 'LOGO ALT', url: 'http://placekitten.com/270/40' },
    onLoginClick: () => {},
    onLogoutClick: () => {},
    onOpenMenuClick: () => {}
});

const EmPlaces$ = withDefaults<em_Place>('EmPlaces', props => <EmPlaces {...props} />, dummyData);

export const Storybook: SFC<{}> = () => (
    <ThemeProvider theme={theme}>
        <StyleGuide>
            <DescribedMock title="AppContainer">
                <Embed fullscreen="SMALL" caption="Small">
                    <AppContainer$>
                        <ContentBlock width="20vw" height="20vh" />
                    </AppContainer$>
                </Embed>
                <Embed fullscreen="SMALL" caption="With large content">
                    <AppContainer$>
                        <ContentBlock width="110vw" height="110vh" />
                    </AppContainer$>
                </Embed>
                <Embed fullscreen="SMALL" caption="With a section home link">
                    <AppContainer$ sectionHomeLink={{ caption: 'My Awesome Dataset', url: '/myAwesomeDataSet' }} />
                </Embed>
                <Embed fullscreen="SMALL" caption="With a logged in user">
                    <AppContainer$ loggedInUser={{ avatarUrl: 'http://placekitten.com/300/300', username: 'Mr. T' }} />
                </Embed>
                <Embed fullscreen="SMALL" caption="With an opened menu">
                    <AppContainer$
                        menuIsExpanded={true}
                        loggedInUser={{ avatarUrl: 'http://placekitten.com/300/300', username: 'Mr. T' }}
                    />
                </Embed>
            </DescribedMock>
            <DescribedMock title="Emplaces">
                <Embed fullscreen="BIG" caption="">
                    <EmPlaces$ />
                </Embed>
            </DescribedMock>
        </StyleGuide>
    </ThemeProvider>
);
