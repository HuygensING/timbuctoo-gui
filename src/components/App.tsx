import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './Routes';
import { ThemeProvider } from 'styled-components';
import theme from '../theme';
import Header from './header/Header';
import Footer from './footer/Footer';
import { Grid } from './layout/Grid';

class App extends Component {
    render() {
        return (
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <Grid>
                        <Header />
                        <Router />
                        <Footer />
                    </Grid>
                </BrowserRouter>
            </ThemeProvider>
        );
    }
}

export default App;
