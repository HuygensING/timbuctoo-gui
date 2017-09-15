export interface State {
    user: UserReducer;
}

export interface UserReducer {
    hsid: string;
    language: string;
    loggedIn: boolean;
}