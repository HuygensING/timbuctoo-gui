import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './Routes';
import { ThemeProvider } from 'styled-components';
import theme from '../theme';

class App extends Component {
    render() {
        return (
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <Router />
                </BrowserRouter>
            </ThemeProvider>
        );
    }
}

export default App;
