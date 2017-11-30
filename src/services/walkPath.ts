import { Entity, FormatterConfig, Value } from '../typings/schema';
import { valueToString } from './getValue';
import { ReferencePath } from '../typings/index';
import { URI, VALUE } from '../constants/global';

export interface TypedUri {
    uri: string;
    type: string;
}
export type uriOrString = string | TypedUri;
export type pathResult = uriOrString[] | uriOrString | null;

export const PATH_SPLIT = '.';
export const PATH_SEGMENT_SPLIT = '||';

export const DEFAULT_FORMATTERS: FormatterConfig = [
    {
        type: 'http://timbuctoo.huygens.knaw.nl/datatypes/person-name',
        name: 'PERSON_NAMES'
    }
];

export const mendPath = (pathArray: ReferencePath): string =>
    pathArray.map(path => path.join(PATH_SEGMENT_SPLIT)).join(PATH_SPLIT);

export const splitPath = (pathStr: string, onlyKey: boolean = false): (string | string[])[] => {
    return pathStr
        .split(PATH_SPLIT)
        .filter(segment => segment.indexOf(PATH_SEGMENT_SPLIT) > -1)
        .map(segment => (onlyKey ? segment.split(PATH_SEGMENT_SPLIT)[1] : segment.split(PATH_SEGMENT_SPLIT)));
};

export const walkPath = (pathStr: string | undefined, formatters: FormatterConfig, entity: Entity): pathResult => {
    if (!pathStr) {
        return null;
    }

    const splittedPath = splitPath(pathStr, true) as string[];
    return walkPathStep(splittedPath, formatters, entity);
};

export const createReferencePath = (path: string, collectionId: string): ReferencePath =>
    path.length > 0 ? [[collectionId], ...(splitPath(path) as ReferencePath)] : [[collectionId]];

function isValue(obj: Value | Entity): obj is Value {
    return obj.hasOwnProperty(VALUE);
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
            if (path[0] === URI) {
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
