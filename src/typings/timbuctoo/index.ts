import { TimNames } from './timPersons';

/*
 * Typings for the graphql api datastructure
 */



/*
 * General types
 */
export type Cursor = String;
export interface Cursors {
    prevCursor: Cursor;
    nextCursor: Cursor;
}

export interface TypeValue {
    type: string;
    value: string;
}

/*
 * Type: clusius_PersonsList
 */
export interface clusiusPersonsList {
    items: clusiusPerons[];
}

/*
 * Type: clusius_Persons
 */
export interface clusiusPerons {
    timNames: TimNames
}