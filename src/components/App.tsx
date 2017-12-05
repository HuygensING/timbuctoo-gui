import React, { ComponentType, PureComponent } from 'react';
import { connect } from 'react-redux';
import { ChildProps, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Routes from './Routes';
import { default as styled, ThemeProvider } from 'styled-components';
import theme from '../theme';
import Header from './header/Header';
import Footer from './footer/Footer';
import PoweredBy from './PoweredBy';
import { Grid } from './layout/Grid';
import { AboutMe } from '../typings/schema';
import { LogInUser, LogOutUser, UserReducer } from '../reducers/user';
import Loading from './Loading';
import { History, Location } from 'history';
import { compose } from 'redux';
import { ConnectedRouter } from 'react-router-redux';
import { RootState } from '../reducers/rootReducer';
import Error from './Error';
import { ErrorReducer } from '../reducers/error';

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

class App extends PureComponent<FullProps> {
    renderLoad: boolean = true;

    componentWillMount() {
        this.checkRenderLoad(this.props.user);

        this.props.history.listen((location: Location) => {
            const { state } = location;
            if ((state && !state.keepPosition) || !state) {
                window.scrollTo(0, 0);
            }
        });
    }

    componentWillReceiveProps({ data, user }: FullProps) {
        if (
            !user.loggedIn &&
            data &&
            data.aboutMe &&
            data.aboutMe.id &&
            (this.props.data && this.props.data.aboutMe !== data.aboutMe) &&
            user.hsid.length > 0
        ) {
            this.props.logInUser(user.hsid);
        }

        if (this.renderLoad && (data && (data.error || data.aboutMe === null))) {
            this.renderLoad = false;

            // todo: remove this check once there's a real authentication system
            if (process.env.NODE_ENV !== 'development') {
                this.props.logOutUser();
            } else {
                this.props.logInUser(user.hsid);
            }
        }
    }

    componentWillUpdate(nextProps: FullProps) {
        this.checkRenderLoad(nextProps.user);
    }

    render() {
        const hasError = this.props.errors.length > 0 || this.props.data!.error;
        return (
            <ThemeProvider theme={theme}>
                {this.renderLoad ? (
                    // TODO: switch <Loading/> for an <Authenticating /> component
                    <Loading />
                ) : (
                    <ConnectedRouter history={this.props.history}>
                        <GridWithMargin>
                            <Header height={headerHeight} />
                            <Main>
                                {hasError ? (
                                    this.props.errors.length > 0 ? (
                                        <Error errors={this.props.errors} status={this.props.status} />
                                    ) : (
                                        <Error errors={[this.props.data!.error as Error]} status={500} />
                                    )
                                ) : (
                                    <Routes />
                                )}
                            </Main>
                            <Footer />
                            <PoweredBy />
                        </GridWithMargin>
                    </ConnectedRouter>
                )}
            </ThemeProvider>
        );
    }

    private checkRenderLoad(user: UserReducer) {
        if (!user.hsid || user.loggedIn) {
            this.renderLoad = false;
        }
    }
}

const mapStateToProps = (state: RootState) => ({
    user: state.user,
    ...state.error
});

const mapDispatchToProps = dispatch => ({
    logInUser: val => dispatch(LogInUser(val)),
    logOutUser: () => dispatch(LogOutUser())
});

const query = gql`
    query App {
        aboutMe {
            id
        }
    }
`;

export default compose<ComponentType<OwnProps>>(graphql(query), connect(mapStateToProps, mapDispatchToProps))(App);
