import React, { SFC } from 'react';
import { StyleGuide, DescribedMock, Embed, ContentBlock, withDefaults } from './styleguide-tools';
import { AppContainer, AppProps } from './AppContainer';
import { ThemeProvider } from 'styled-components';
import theme from '../theme';
import { EmPlaces, HistoricalHierarchies, dummyData } from './emplaces';

const defaultAppProps = {
    homeUrl: 'http://example.org',
    menuIsExpanded: false,
    logo: { alt: 'LOGO ALT', url: 'http://placekitten.com/270/40' },
    onLoginClick: () => {},
    onLogoutClick: () => {},
    onOpenMenuClick: () => {}
};

const AppContainer$ = withDefaults<AppProps>('AppContainer', props => <AppContainer {...props} />, defaultAppProps);

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
                    <EmPlaces
                        place={dummyData.place}
                        onSwitchHierarchyClick={(type, id) => {}}
                        containerProps={defaultAppProps}
                    />
                </Embed>
                <Embed caption="Hierarchies empty">
                    <HistoricalHierarchies data={{}} placeName="City of Opole" selectedRange={0} selectedType="" />
                </Embed>
                <Embed caption="Hierarchies with default data">
                    <HistoricalHierarchies
                        data={{
                            'Administrative division': [
                                {
                                    from: 1348,
                                    to: 1521,
                                    items: [
                                        { label: 'Holy Roman Empire', date: '1348-1806' },
                                        { label: 'Bohemian Crown', date: '1348-1806' },
                                        { label: 'Duchy of Opole', date: '1281-1521' }
                                    ]
                                },
                                {
                                    from: 1521,
                                    to: 1806,
                                    items: [
                                        { label: 'Holy Roman Empire', date: '1348-1806' },
                                        { label: 'Bohemian Crown', date: '1348-1806' },
                                        { label: 'Duchy of Opole and Racibórz', date: '1521-1809' }
                                    ]
                                },
                                {
                                    from: 1742,
                                    to: 1806,
                                    items: [
                                        { label: 'Holy Roman Empire', date: '1348-1806' },
                                        { label: 'Bohemian Crown', date: '1348-1806' },
                                        { label: 'Duchy of Opole', date: '1521-1809' },
                                        { label: 'County of Opole', date: '1742-1945' }
                                    ]
                                }
                            ]
                        }}
                        placeName="City of Opole"
                        selectedRange={0}
                        selectedType="Administrative division"
                    />
                </Embed>
                <Embed caption="Hierarchies with the second range selected">
                    <HistoricalHierarchies
                        data={{
                            'Administrative division': [
                                {
                                    from: 1348,
                                    to: 1521,
                                    items: [
                                        { label: 'Holy Roman Empire', date: '1348-1806' },
                                        { label: 'Bohemian Crown', date: '1348-1806' },
                                        { label: 'Duchy of Opole', date: '1281-1521' }
                                    ]
                                },
                                {
                                    from: 1521,
                                    to: 1806,
                                    items: [
                                        { label: 'Holy Roman Empire', date: '1348-1806' },
                                        { label: 'Bohemian Crown', date: '1348-1806' },
                                        { label: 'Duchy of Opole and Racibórz', date: '1521-1809' }
                                    ]
                                },
                                {
                                    from: 1742,
                                    to: 1806,
                                    items: [
                                        { label: 'Holy Roman Empire', date: '1348-1806' },
                                        { label: 'Bohemian Crown', date: '1348-1806' },
                                        { label: 'Duchy of Opole', date: '1521-1809' },
                                        { label: 'County of Opole', date: '1742-1945' }
                                    ]
                                }
                            ]
                        }}
                        placeName="City of Opole"
                        selectedRange={1}
                        selectedType="Administrative division"
                    />
                </Embed>
                <Embed caption="Hierarchies with multiple types of data">
                    <HistoricalHierarchies
                        data={{
                            'Administrative division': [
                                {
                                    from: 1348,
                                    to: 1521,
                                    items: [
                                        { label: 'Holy Roman Empire', date: '1348-1806' },
                                        { label: 'Bohemian Crown', date: '1348-1806' },
                                        { label: 'Duchy of Opole', date: '1281-1521' }
                                    ]
                                }
                            ],
                            Ecclesiastical: [
                                {
                                    from: 1521,
                                    to: 1806,
                                    items: [
                                        { label: 'Holy Roman Empire', date: '1348-1806' },
                                        { label: 'Bohemian Crown', date: '1348-1806' },
                                        { label: 'Duchy of Opole and Racibórz', date: '1521-1809' }
                                    ]
                                },
                                {
                                    from: 1742,
                                    to: 1806,
                                    items: [
                                        { label: 'Holy Roman Empire', date: '1348-1806' },
                                        { label: 'Bohemian Crown', date: '1348-1806' },
                                        { label: 'Duchy of Opole', date: '1521-1809' },
                                        { label: 'County of Opole', date: '1742-1945' }
                                    ]
                                }
                            ],
                            Military: []
                        }}
                        placeName="City of Opole"
                        selectedRange={0}
                        selectedType="Ecclesiastical"
                    />
                </Embed>
                <Embed caption="Hierarchies with many types of data">
                    <HistoricalHierarchies
                        data={{
                            'Administrative division': [],
                            Ecclesiastical: [],
                            Military: [],
                            'Administrative division2': [],
                            Ecclesiastical2: [],
                            Military2: [],
                            'Administrative division3': [],
                            Ecclesiastical3: [],
                            Military3: [],
                            'Administrative division4': [],
                            Ecclesiastical4: [],
                            Military4: []
                        }}
                        placeName=""
                        selectedRange={0}
                        selectedType="Ecclesiastical"
                    />
                </Embed>
            </DescribedMock>
        </StyleGuide>
    </ThemeProvider>
);
