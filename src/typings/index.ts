export interface KeyValueObject {
    [name: string]: string;
}

export interface Action {
  type: string;
  payload: {
      [name: string]: any
  };
  error: any;
}