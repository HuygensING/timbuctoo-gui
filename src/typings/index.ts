export interface IAction {
  type: string,
  payload: {
      [name: string]: any
  },
  error: any
}