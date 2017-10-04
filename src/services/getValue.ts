import { Value } from '../typings/timbuctoo/schema';

type ObjProps = Value | null;

const getValue = (obj: ObjProps) => (
    obj && obj.hasOwnProperty('value') && typeof obj.value === 'string'
        ? obj.value
        : null
);

export default getValue;