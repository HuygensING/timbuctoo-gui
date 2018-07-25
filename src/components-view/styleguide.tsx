import React, { SFC } from 'react';
import { StyleGuide, DescribedMock, Embed, ContentBlock } from './styleguide-tools';
import { AppContainer } from './AppContainer';
import { ThemeProvider } from 'styled-components';
import theme from '../theme';

const defaults = {
    homeUrl: 'http://example.org',
    menuIsExpanded: false,
    logo: { alt: 'LOGO ALT', url: 'http://placekitten.com/270/40' },
    onLoginClick: () => console.log('onLoginClick'),
    onLogoutClick: () => console.log('onLogoutClick'),
    onOpenMenuClick: () => console.log('onOpenMenuClick')
};

export const Storybook: SFC<{}> = () => (
    <ThemeProvider theme={theme}>
        <StyleGuide>
            <DescribedMock title="Data entry">
                <Embed caption="Small" description="" fullscreen="SMALL">
                    <AppContainer {...defaults}>
                        <ContentBlock width="20vw" height="20vh" />
                    </AppContainer>
                </Embed>
                <Embed caption="With large content" description="" fullscreen="SMALL">
                    <AppContainer {...defaults}>
                        <ContentBlock width="100vw" height="100vh" />
                    </AppContainer>
                </Embed>
                <Embed caption="With a section home link" description="" fullscreen="SMALL">
                    <AppContainer
                        {...defaults}
                        sectionHomeLink={{ caption: 'My Awesome Dataset', url: '/myAwesomeDataSet' }}
                    />
                </Embed>
                <Embed caption="With a logged in user" description="" fullscreen="SMALL">
                    <AppContainer
                        {...defaults}
                        loggedInUser={{ avatarUrl: 'http://placekitten.com/300/300', username: 'Mr. T' }}
                    />
                </Embed>
                <Embed caption="With an opened menu" description="" fullscreen="SMALL">
                    <AppContainer
                        {...defaults}
                        menuIsExpanded={true}
                        loggedInUser={{ avatarUrl: 'http://placekitten.com/300/300', username: 'Mr. T' }}
                    />
                </Embed>
            </DescribedMock>
            <DescribedMock title="Data entry2">SECOND Components for data entry, forms and uploads.</DescribedMock>
        </StyleGuide>
    </ThemeProvider>
);
