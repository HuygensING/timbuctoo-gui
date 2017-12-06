import React, { SFC } from 'react';
import { connect, Dispatch } from 'react-redux';

import { graphql, ChildProps } from 'react-apollo';

import Routes from './Routes';
import { default as styled, ThemeProvider } from 'styled-components';
import theme from '../theme';
import Header from './header/Header';
import Footer from './footer/Footer';
import PoweredBy from './PoweredBy';
import { Grid } from './layout/Grid';
import { AboutMe } from '../typings/schema';
import { LogInUser, LogOutUser, UserReducer } from '../reducers/user';
import { History, Location } from 'history';
import { compose } from 'redux';
import { RootState } from '../reducers/rootReducer';
import Error from './Error';
import { HEADER_HEIGHT, HISTORY_REPLACE } from '../constants/global';
import { ErrorReducer } from '../reducers/error';
import renderLoader from '../services/renderLoader';
import { lifecycle } from 'recompose';
import gql from 'graphql-tag';
import { ConnectedRouter } from 'react-router-redux';

const GridWithMargin = styled(Grid)`
    padding-top: ${HEADER_HEIGHT};
    min-height: 100vh;
    display: flex;
    flex-direction: column;
`;

const Main = styled.div`
    flex: 1;
`;

interface OwnProps {
    history: History;
}

interface DispatchProps {
    logInUser: (hsid: string) => void;
    logOutUser: () => void;
}

interface StateProps extends ErrorReducer {
    user: UserReducer;
}

type FullProps = ChildProps<OwnProps & DispatchProps & StateProps, { aboutMe: AboutMe }>;

const App: SFC<FullProps> = ({ errors, status, data, history }) => (
    <ThemeProvider theme={theme}>
        <ConnectedRouter history={history}>
            <GridWithMargin>
                <Header />
                <Main>
                    {errors.length > 0 || data!.error ? (
                        errors.length > 0 ? (
                            <Error errors={errors} status={status} />
                        ) : (
                            <Error errors={[data!.error as Error]} status={500} />
                        )
                    ) : (
                        <Routes />
                    )}
                </Main>
                <Footer />
                <PoweredBy />
            </GridWithMargin>
        </ConnectedRouter>
    </ThemeProvider>
);

const mapStateToProps = (state: RootState) => ({
    user: state.user,
    ...state.error
});

const mapDispatchToProps = (dispatch: Dispatch<{}>) => ({
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

export default compose<SFC<OwnProps>>(
    graphql(query),
    renderLoader(),
    connect(mapStateToProps, mapDispatchToProps),
    lifecycle<FullProps, {}>({
        componentWillMount() {
            if (
                !this.props.user.loggedIn &&
                this.props.data!.aboutMe &&
                this.props.data!.aboutMe!.id &&
                this.props.user.hsid.length > 0
            ) {
                this.props.logInUser(this.props.user.hsid);
            }

            this.props.history.listen((location: Location, action: string) => {
                const { state } = location;

                if (action !== HISTORY_REPLACE && ((state && !state.keepPosition) || !state)) {
                    window.scrollTo(0, 0);
                }
            });
        },
        componentWillReceiveProps({ data, user }: FullProps) {
            if (
                !user.loggedIn &&
                data!.aboutMe &&
                data!.aboutMe!.id &&
                this.props.data!.aboutMe !== data!.aboutMe &&
                user.hsid.length > 0
            ) {
                this.props.logInUser(user.hsid);
            }

            if ((user.hsid || user.loggedIn) && (data!.error || data!.aboutMe === null)) {
                this.props.logOutUser();
            }
        }
    })
)(App);
