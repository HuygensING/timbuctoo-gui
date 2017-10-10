export interface State {
    user: UserReducer;
}

export interface UserReducer {
    hsid: Readonly<string>;
    language: Readonly<string>;
    loggedIn: Readonly<boolean>;
    avatar: Readonly<string>;
    name: Readonly<string>;
    profession: Readonly<string>;
}

export interface SearchReducer {
    dataset: Readonly<string>;
    collection: Readonly<string>;
    filter: Readonly<string>;
}