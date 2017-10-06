export interface State {
    user: UserReducer;
}

export interface UserReducer {
    hsid: string;
    language: string;
    loggedIn: boolean;
    loading: boolean;
}

export interface SearchReducer {
    dataset: string;
    collection: string;
    filter: string;
}