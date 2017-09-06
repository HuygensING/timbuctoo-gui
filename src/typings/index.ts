export interface Action {
  type: string,
  payload: {
      [name: string]: any
  },
  error: any
}