type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;

type FilterAvailableType<U, TKey extends keyof UnionToIntersection<U>> = U extends any
    ? TKey extends keyof U ? U : never
    : never;

type UnwrapArray<T> = T extends (infer U)[] ? U : T;
type IsArray<T> = T extends any[] ? true : false;
type IsStillArray<T, PrevIsArray extends true | false> = PrevIsArray extends true ? true : IsArray<T>;

export interface SafeGetter<TCur, TIsArray extends true | false> {
    path: string[];
    <Tkey extends keyof UnionToIntersection<TCur>>(key: Tkey): SafeGetter<
        UnwrapArray<FilterAvailableType<TCur, Tkey>[Tkey]>,
        IsStillArray<FilterAvailableType<TCur, Tkey>[Tkey], TIsArray>
    >;
    val: true extends TIsArray ? never : <TDefault, Y>(def: TDefault) => NonNullable<TCur> | TDefault;
    vals: true extends TIsArray ? () => Array<NonNullable<TCur>> : never;
    filter: true extends TIsArray
        ? (filter: (input: SafeGetter<TCur, false>, idx: number) => boolean) => SafeGetter<TCur, TIsArray>
        : never;
}

/**
 * This function creates a proxy around the input object where you can traverse properties as deep as you want without
 * getting a null pointer. It also transparently traverses arrays, even nested ones, in a depth first order.
 *
 * At some point you can call val("someDefault") to get the value or a default if the value is null || undefined
 */
export function makeSafeGetter<T>(obj: T, path?: string[]): SafeGetter<T, IsArray<T>> {
    function val(def: any) {
        if (!path) {
            return obj == null ? def : obj;
        } else {
            const firstResult = generateValues(obj, path).next();
            if (firstResult.done) {
                // no values were generated
                return def;
            } else {
                return firstResult.value;
            }
        }
    }
    return (Object.assign(
        function(key: string) {
            return makeSafeGetter(obj, (path || []).concat([key]));
        },
        {
            path: path || [],
            val: val,
            vals: function(def: any) {
                if (!path) {
                    if (Array.isArray(obj)) {
                        return obj;
                    } else {
                        if (obj == null) {
                            return [];
                        } else {
                            return [obj];
                        }
                    }
                } else {
                    return Array.from(generateValues(obj, path));
                }
            },
            filter: function(func: any) {
                return makeSafeGetter(obj, (path || []).concat([func]));
            }
        }
    ) as any) as SafeGetter<T, IsArray<T>>;
}

function* generateValues(obj: any, path: any[]): IterableIterator<any> {
    if (obj == null) {
        return; // stop generating
    } else if (Array.isArray(obj)) {
        for (let item of obj) {
            yield* generateValues(item, path);
        }
    } else if (path.length === 0) {
        yield obj;
    } else if (typeof path[0] === 'function') {
        let i = 0;
        for (let item of generateValues(obj, path.slice(1))) {
            if (path[0](makeSafeGetter(item), i++)) {
                yield item;
            }
        }
    } else {
        yield* generateValues(obj[path[0]], path.slice(1));
    }
}

// const input: {
//     d:
//         | {
//                 a: {
//                     b: number;
//                 };
//             }
//         | {
//                 c: {
//                     d: number;
//                 };
//             }
//         | {};
//     a:
//         | string
//         | {
//                 b?: {
//                     someUndef?: string;
//                     number: 1;
//                     someSimpleArray: string[];
//                     c: { otherNumber: number; subArray?: number[] }[] | { otherNumber: number; subArray?: number[] };
//                 };
//             };
// } = {
//     d: { a: { b: 1 } },
//     a: { b: { number: 1, someSimpleArray: ['a'], c: [{ otherNumber: 2 }, { otherNumber: 3, subArray: [4, 5] }] } }
// };
// const safe = makeSafeGetter(input);

// function assert<T>(test: () => T, expected: T) {
//     const testResult = test();
//     const testResultString = JSON.stringify(testResult);
//     const expectedString = JSON.stringify(expected);
//     const testString = test.toString().substring(21, test.toString().length - 3);
//     if (testResultString === expectedString) {
//         console.log(testString, testResult, "==", expected)
//     } else {
//         console.error(testString, testResult, "!=", expected)
//     }
// }

// // input.a.b.number // will not pass the type checker
// // safe("a")("b")("____number") // this also will not pass the type checker
// assert(() => safe('a')('b')('number').val(0), 1); // will pass the type checker an show the wrapper object in the console
// assert(() => safe('d')('a')('b').val('default'), 1); // this is valid, note that D is a union type
// assert(() => safe('d')('c')('d').val('default'), 'default'); // this too
// // safe("d")("b")("b").val("default") // but _this_ (mixing the two paths of the union) isn't!
// assert(() => safe('a')('b')('number').val('DEFAULT'), 1);
// assert(() => safe('a')('b')('someUndef').val(undefined), undefined);
// assert(() => safe('a')('b')('someUndef').val('DEFAULT'), "DEFAULT");
// // safe('a')('b')('someSimpleArray').val('default'); // doesn't pass the type checker because this is always an array (the function will work though and return a one element array)
// assert(() => safe('a')('b')('someSimpleArray').vals(), ['a']);
// // JSON.stringify(safe('a')('b')('c')('otherNumber').val('default'); // doesn't pass the type checker because this is sometimes an array (the function will work though and return a the first element as a one element array)
// assert(() => safe('a')('b')('c')('otherNumber').vals(), [2, 3]);
// assert(() => safe('a')('b')('c')('subArray').vals(), [4, 5]);

// // note that the string properties still give you autocomplete
