import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './Routes';
import { ThemeProvider } from 'styled-components';
import theme from '../theme';
import Header from './header/Header';
import Footer from './footer/Footer';

class App extends Component {
    render() {
        return (
            <ThemeProvider theme={theme}>
                <div>
                    <BrowserRouter>
                        <div>
                            <Header />
                            <Router />
                            <Footer />
                        </div>
                    </BrowserRouter>
                </div>
            </ThemeProvider>
        );
    }
}

export default App;
