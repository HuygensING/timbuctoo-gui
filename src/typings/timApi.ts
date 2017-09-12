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

/*
 * Type: clusius_Persons
 */
export interface clusiusPerons {
    timNames: timNames
}

/*
 * Type: clusius_PersonsList
 */
export interface clusiusPersonsList {
    items: clusiusPerons[];
}

/*
 * Type tim_names
 */
export interface timNames {
    prevCursor: Cursor;
    nextCursor: Cursor;
}