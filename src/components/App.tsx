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
import Loading from './Loading';

const headerHeight: string = '4rem';

const GridWithMargin = styled(Grid)`
    padding-top: ${headerHeight};
    min-height: 100vh;
    display: flex;
    flex-direction: column;
`;

const Main = styled.div`
  flex: 1;
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
    renderLoad: boolean = true;

    componentWillMount () {
        this.checkRenderLoad(this.props.user);
    }

    componentWillReceiveProps ({data, user}: Props) {
        if (!user.loggedIn && data.aboutMe && data.aboutMe.id && this.props.data.aboutMe !== data.aboutMe) {
            this.props.logInUser();
        }
    }

    componentWillUpdate (nextProps: Props) {
        this.checkRenderLoad(nextProps.user);
    }

    render () {
        // TODO: switch <Loading/> for an <Authenticating /> component
        return (
            <ThemeProvider theme={theme}>
                {
                    this.renderLoad
                        ? <Loading/>
                        : <BrowserRouter>
                            <GridWithMargin>
                                <Header height={headerHeight}/>
                                <Main>
                                    <Router/>
                                </Main>
                                <Footer/>
                                <PoweredBy/>
                            </GridWithMargin>
                        </BrowserRouter>
                }
            </ThemeProvider>
        );
    }

    private checkRenderLoad (user: UserReducer) {
        if (!user.hsid || user.loggedIn) {
            this.renderLoad = false;
        }
    }
}

const mapStateToProps = state => ({
    user: state.user
});

const mapDispatchToProps = dispatch => ({
    logInUser: () => dispatch(LogInUser())
});

const query = gql`
    query App {
        aboutMe {
            id
        }
    }
`;

export default graphql(query)(
    connect(mapStateToProps, mapDispatchToProps)(App)
);
