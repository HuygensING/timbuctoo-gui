import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './Routes';
import { default as styled, ThemeProvider } from 'styled-components';
import theme from '../theme';
import Header from './header/Header';
import Footer from './footer/Footer';
import PoweredBy from './PoweredBy';
import { Grid } from './layout/Grid';

const headerHeight: string = '4rem';

const GridWithMargin = styled(Grid)`
    padding-top: ${headerHeight};
`;

class App extends Component {
    render() {
        return (
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <GridWithMargin>
                        <Header height={headerHeight} />
                        <Router />
                        <Footer />
                        <PoweredBy />
                    </GridWithMargin>
                </BrowserRouter>
            </ThemeProvider>
        );
    }
}

export default App;
