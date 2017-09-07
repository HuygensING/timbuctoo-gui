export interface State {
    user: UserReducer;
}

export interface UserReducer {
    hsid: string;
    loggedIn: boolean;
}