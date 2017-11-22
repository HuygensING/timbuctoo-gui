import { Entity, FormatterConfig, Value } from '../typings/schema';
import { valueToString } from './getValue';

export interface TypedUri {
    uri: string;
    type: string;
}
export type uriOrString = string | TypedUri;
export type pathResult = uriOrString[] | uriOrString | null;

// TODO: Need to refactor this to make sure it uses the JSON.parse instead of iterating on string

export const splitPath = (pathStr: string, onlyKey: boolean = false): (string | string[])[] => (
    pathStr
        .split('.')
        .map(segment => onlyKey
            ? segment.split(':')[0]
            : segment.split(':')
    )
);

export const walkPath = (pathStr: string | undefined, formatters: FormatterConfig, entity: Entity): pathResult => (
    pathStr
        ? walkPathStep(splitPath(pathStr, true) as string[], formatters, entity)
        : null
);

export const DEFAULT_FORMATTERS: FormatterConfig = [{
    type: 'http://timbuctoo.huygens.knaw.nl/datatypes/person-name',
    name: 'PERSON_NAMES'
}];

function isValue(obj: Value | Entity): obj is Value {
    return obj.hasOwnProperty('value');
}

export function walkPathStep(path: string[], formatters: FormatterConfig, entity: Value | Entity): pathResult {
    if (isValue(entity)) {
        return valueToString(entity, formatters.concat(DEFAULT_FORMATTERS));
    } else {
        if (path.length === 0) {
            return {
                uri: entity.uri,
                type: entity.__typename
            };
        }
        let result = entity[path[0]];

        if (!result) {
            return null;
        } else if (Array.isArray(result)) {
            let retVal: uriOrString[] = [];
            for (const item of result) {
                const subResult = walkPathStep(path.slice(1), formatters, item);
                if (subResult) {
                    if (Array.isArray(subResult)) {
                        retVal = retVal.concat(subResult);
                    } else {
                        retVal.push(subResult);
                    }
                }
            }
            return retVal;
        } else if (typeof result === 'string') {
            if (path[0] === 'uri') {
                return {
                    uri: result,
                    type: entity.__typename
                };
            } else {
                return result;
            }
        } else {
            return walkPathStep(path.slice(1), formatters, result);
        }
    }
}