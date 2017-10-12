import React, { PureComponent } from 'react';
import { Router } from 'react-router-dom';
import { connect } from 'react-redux';

import { graphql, gql, ChildProps } from 'react-apollo';

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
import createBrowserHistory from 'history/createBrowserHistory';

if (process.env.NODE_ENV !== 'production') {
    // /* eslint-disable-next-line no-unused-vars,react/no-deprecated */
    // let createClass = React.createClass;
    // Object.defineProperty(React, 'createClass', {
    //     set: (nextCreateClass) => {
    //         createClass = nextCreateClass;
    //     }
    // });
    // /* eslint-disable-next-line global-require */
    // const { whyDidYouUpdate } = require('why-did-you-update');
    // whyDidYouUpdate(React);
}

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
    logInUser: (hsid: string) => void;
    logOutUser: () => void;
}

interface State {

}

class App extends PureComponent<ChildProps<Props, Response>, State> {
    renderLoad: boolean = true;
    history = createBrowserHistory({
        basename: process.env.REACT_APP_REL_PATH || '/'
    });

    componentWillMount () {
        this.checkRenderLoad(this.props.user);
        
        this.history.listen((location) => {
            const { state } = location;
            if ((state && !state.dontJumpToTop) || !state) {
                window.scrollTo(0, 0);
            }
        });
    }

    componentWillReceiveProps ({ data, user }: Props) {
        if (!user.loggedIn && data.aboutMe && data.aboutMe.id && this.props.data.aboutMe !== data.aboutMe && user.hsid.length > 0) {
            this.props.logInUser(user.hsid);
        }

        if (this.renderLoad && (data.error || data.aboutMe === null)) {
            this.renderLoad = false;
            this.props.logOutUser();
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
                        : <Router history={this.history}>
                            <GridWithMargin>
                                <Header height={headerHeight}/>
                                <Main>
                                    <Routes />
                                </Main>
                                <Footer/>
                                <PoweredBy/>
                            </GridWithMargin>
                        </Router>
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
    logInUser: (val) => dispatch(LogInUser(val)),
    logOutUser: () => dispatch(LogOutUser())
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
