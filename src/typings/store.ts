export interface IState {
    user: IUserReducer
}

export interface IUserReducer {
    loggedIn: boolean,
    roles: string[]
}