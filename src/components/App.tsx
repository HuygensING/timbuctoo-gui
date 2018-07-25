import React, { SFC } from 'react';
import { connect, Dispatch } from 'react-redux';

import { graphql, ChildProps } from 'react-apollo';

import Routes from './Routes';
import { AboutMe } from '../typings/schema';
import { LogInUser, LogOutUser, UserReducer } from '../reducers/user';
import { History, Location } from 'history';
import { compose } from 'redux';
import { RootState } from '../reducers/rootReducer';
import Error from './Error';
import { HISTORY_REPLACE } from '../constants/global';
import { ErrorReducer } from '../reducers/error';
import renderLoader from '../services/renderLoader';
import { lifecycle } from 'recompose';
import gql from 'graphql-tag';
import { ConnectedRouter } from 'react-router-redux';
import { AppContainer } from '../components-view/AppContainer';
import getEnvVar from '../services/getEnvVar';
import translate from '../services/translate';
import { ROUTE_PATHS } from '../constants/routeNaming';
import { LOGIN_URL } from '../constants/api';

interface OwnProps {
    history: History;
}

interface DispatchProps {
    logInUser: (hsid: string) => void;
    logOutUser: () => void;
}

interface StateProps extends ErrorReducer {
    user: UserReducer;
    routing: { location: Location } | null;
}

const regex = new RegExp(`${ROUTE_PATHS.details}|${ROUTE_PATHS.edit}|${ROUTE_PATHS.search}`);
function getDataSetFromRoute(location: Location | null): { key: string; value: string } | null {
    if (location && location.pathname) {
        const locationList = location.pathname.split('/');

        for (const [idx, segment] of locationList.entries()) {
            if (segment.search(regex) > -1) {
                const activeDataSet = locationList[idx + 1];
                const activeDataSetList = activeDataSet.split('__');

                return {
                    key: activeDataSetList[1] || `...${activeDataSet.substr(-10)}`,
                    value: activeDataSet
                };
            }
        }
    }
    return null;
}

type FullProps = ChildProps<OwnProps & DispatchProps & StateProps, { aboutMe: AboutMe }>;

function doLogin() {
    console.log('logging in');
    const form = document.createElement('form');
    form.action = LOGIN_URL;
    form.method = 'POST';
    form.innerHTML = `<input name="hsurl" value=${window.location} type="hidden" />`;
    form.style.display = 'none';
    document.body.appendChild(form);
    form.submit();
    console.log('submitted!');
}

class App extends React.Component<FullProps, { menuOpen: boolean }> {
    constructor(props: FullProps, context?: any) {
        super(props, context);
        this.state = { menuOpen: false };
    }
    render() {
        const { errors, status, routing, data, history, query: queryString, variables, logOutUser, user } = this.props;
        const dataSetName = getDataSetFromRoute(routing ? routing.location : null);
        return (
            <ConnectedRouter history={history}>
                <AppContainer
                    homeUrl={ROUTE_PATHS.root}
                    loggedInUser={user.loggedIn ? { avatarUrl: user.avatar, username: user.name } : undefined}
                    sectionHomeLink={
                        dataSetName
                            ? { caption: dataSetName.key, url: `/${ROUTE_PATHS.details}/${dataSetName.value}` }
                            : undefined
                    }
                    menuIsExpanded={this.state.menuOpen}
                    logo={{ alt: translate('globals.app_title'), url: getEnvVar('REACT_APP_LOGO_URL') }}
                    onLoginClick={doLogin}
                    onLogoutClick={logOutUser}
                    onOpenMenuClick={() => this.setState(s => ({ menuOpen: !s.menuOpen }))}
                >
                    {errors.length > 0 || data!.error ? (
                        errors.length > 0 ? (
                            <Error errors={errors} status={status} query={queryString} variables={variables} />
                        ) : (
                            <Error
                                errors={[data!.error as Error]}
                                status={500}
                                query={queryString}
                                variables={variables}
                            />
                        )
                    ) : (
                        <Routes />
                    )}
                </AppContainer>
            </ConnectedRouter>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    user: state.user,
    routing: state.routing,
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
