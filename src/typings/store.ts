export interface State {
    user: UserReducer;
}

export interface UserReducer {
    hsid: string;
    language: string;
    loggedIn: boolean;

    avatar: string;
    name: string;
    profession: string;
}

export interface SearchReducer {
    dataset: string;
    collection: string;
    filter: string;
}