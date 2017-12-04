import React, { SFC } from 'react';
import { Router } from 'react-router-dom';
import { connect, Dispatch } from 'react-redux';

import { graphql, gql } from 'react-apollo';

import Routes from './Routes';
import { default as styled, ThemeProvider } from 'styled-components';
import theme from '../theme';

import Header from './header/Header';
import Footer from './footer/Footer';
import PoweredBy from './PoweredBy';
import { Grid } from './layout/Grid';
import { AboutMe } from '../typings/schema';
import { LogInUser, LogOutUser, UserReducer } from '../reducers/user';
import createBrowserHistory from 'history/createBrowserHistory';
import { History, Location } from 'history';
import { RootState } from '../reducers/rootReducer';
import { compose } from 'redux';
import { lifecycle } from 'recompose';
import { HEADER_HEIGHT } from '../constants/global';
import renderLoader from '../services/renderLoader';

const GridWithMargin = styled(Grid)`
    padding-top: ${HEADER_HEIGHT};
    min-height: 100vh;
    display: flex;
    flex-direction: column;
`;

const Main = styled.div`
    flex: 1;
`;

const history: History = createBrowserHistory();

interface ApolloProps {
    data: {
        error: boolean;
        loading: boolean;
        aboutMe: AboutMe;
    };
}

interface StateProps {
    user: UserReducer;
}

interface DispatchProps {
    logInUser: (hsid: string) => void;
    logOutUser: () => void;
}

type FullProps = ApolloProps & StateProps & DispatchProps;

const App: SFC<FullProps> = () => (
    <ThemeProvider theme={theme}>
        <Router history={history}>
            <GridWithMargin>
                <Header />
                <Main>
                    <Routes />
                </Main>
                <Footer />
                <PoweredBy />
            </GridWithMargin>
        </Router>
    </ThemeProvider>
);

const mapStateToProps = (state: RootState) => ({
    user: state.user
});

const mapDispatchToProps = (dispatch: Dispatch<ApolloProps>) => ({
    logInUser: (val: string) => dispatch(LogInUser(val)),
    logOutUser: () => dispatch(LogOutUser())
});

const query = gql`
    query App {
        aboutMe {
            id
        }
    }
`;

export default compose<SFC<{}>>(
    graphql(query),
    renderLoader(),
    connect(mapStateToProps, mapDispatchToProps),
    lifecycle<FullProps, {}>({
        componentWillMount() {
            history.listen((location: Location) => {
                const { state } = location;
                if ((state && !state.keepPosition) || !state) {
                    window.scrollTo(0, 0);
                }
            });
        },
        componentWillReceiveProps({ data, user }: FullProps) {
            if (
                !user.loggedIn &&
                data.aboutMe &&
                data.aboutMe.id &&
                this.props.data.aboutMe !== data.aboutMe &&
                user.hsid.length > 0
            ) {
                this.props.logInUser(user.hsid);
            }

            if ((user.hsid || user.loggedIn) && (data.error || data.aboutMe === null)) {
                // todo: remove this check once there's a real authentication system
                if (process.env.NODE_ENV !== 'development') {
                    this.props.logOutUser();
                } else {
                    this.props.logInUser(user.hsid);
                }
            }
        }
    })
)(App);
