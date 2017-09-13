import { Cursors, TypeValue } from './index';
/*
 * Type tim_names
 */
export type NameTypes = 'SURNAME' | 'FORENAME' | 'ROLE_NAME' | 'ADD_NAME' | 'NAME_LINK' | 'GEN_NAME';

export interface TimNames extends Cursors {
    items: TypeValue[];
}