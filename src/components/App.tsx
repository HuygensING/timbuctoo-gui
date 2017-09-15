import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { graphql, gql, ChildProps } from 'react-apollo';

import Router from './Routes';
import { default as styled, ThemeProvider } from 'styled-components';
import theme from '../theme';

import Header from './header/Header';
import Footer from './footer/Footer';
import PoweredBy from './PoweredBy';
import { Grid } from './layout/Grid';
import { AboutMe } from '../typings/timbuctoo/schema';
import { UserReducer } from '../typings/store';
import { LogInUser } from '../reducers/user';

const headerHeight: string = '4rem';

const GridWithMargin = styled(Grid)`
    padding-top: ${headerHeight};
`;

interface Props {
    data: {
        error: boolean,
        loading: boolean,
        aboutMe: AboutMe
    };
    user: UserReducer;
    logInUser: () => void;
}

interface State {

}

class App extends Component<ChildProps<Props, Response>, State> {

    componentWillReceiveProps ({data, user}: Props) {
        if (!user.loggedIn && data.aboutMe && data.aboutMe.id && this.props.data.aboutMe !== data.aboutMe) {
            this.props.logInUser();
        }
    }

    render () {
        return (
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <GridWithMargin>
                        <Header height={headerHeight}/>
                        <Router/>
                        <Footer/>
                        <PoweredBy/>
                    </GridWithMargin>
                </BrowserRouter>
            </ThemeProvider>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user
});

const mapDispatchToProps = dispatch => ({
    logInUser: () => dispatch(LogInUser())
});

const query = gql`
    query {
        aboutMe {
            id
        }
    }
`;

export default graphql(query)(
    connect(mapStateToProps, mapDispatchToProps)(App)
);
