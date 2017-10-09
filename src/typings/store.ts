export interface State {
    user: UserReducer;
}

export interface UserReducer {
    hsid: Readonly<string>;
    language: Readonly<string>;
    loggedIn: Readonly<boolean>;
}

export interface SearchReducer {
    dataset: Readonly<string>;
    collection: Readonly<string>;
    filter: Readonly<string>;
}