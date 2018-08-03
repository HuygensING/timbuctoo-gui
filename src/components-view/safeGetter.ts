type Gettable<T> = Exclude<T, undefined | null | string | number | boolean>;
type UnwrapArray<T> = T extends (infer U)[] ? U : T;
type IsArray<T> = T extends any[] ? true : false;
// type DefOrArray<T, TIsArray> = TIsArray extends true
//     ? () => T[]
//     : <TDefault>(def: TDefault) => NonNullable<T> | TDefault;
type IsStillArray<T, PrevIsArray extends true | false> = PrevIsArray extends true ? true : IsArray<T>;

interface SafeGetter<TCur, TIsArray extends true | false> {
    path: string[];
    <Tkey extends keyof Gettable<TCur>>(key: Tkey): SafeGetter<
        UnwrapArray<Gettable<TCur>[Tkey]>,
        IsStillArray<Gettable<TCur>[Tkey], TIsArray>
    >;
    val: TIsArray extends true ? never : <TDefault, Y>(def: TDefault) => NonNullable<TCur> | TDefault;
    vals: TIsArray extends true ? () => Array<NonNullable<TCur>> : never;
    t: <U extends TCur>(test: (input: TCur) => input is U) => SafeGetter<U, TIsArray>;
    map: <U extends TCur>(proj: (input: TCur) => U) => SafeGetter<U, TIsArray>;
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
            t: function() {
                return makeSafeGetter(obj, path);
            }
        }
    ) as any) as SafeGetter<T, IsArray<T>>;
}

function* generateValues(obj: any, path: string[]): IterableIterator<any> {
    if (obj == null) {
        return; // stop generating
    } else if (Array.isArray(obj)) {
        for (let item of obj) {
            yield* generateValues(item, path);
        }
    } else if (path.length === 0) {
        yield obj;
    } else {
        yield* generateValues(obj[path[0]], path.slice(1));
    }
}

export function testCases() {
    const input: {
        a:
            | string
            | {
                  b?: {
                      someUndef?: string;
                      number: 1;
                      someSimpleArray: string[];
                      c:
                          | Array<{ otherNumber: number; subArray?: number[] }>
                          | { otherNumber: number; subArray?: number[] };
                  };
              };
    } = {
        a: { b: { number: 1, someSimpleArray: ['a'], c: [{ otherNumber: 2 }, { otherNumber: 3, subArray: [4, 5] }] } }
    };
    const safe = makeSafeGetter(input);

    // console.log(input.a.b.number) // will not pass the type checker
    console.log(safe('a')('b')('number'), 'This should show a function object in the console'); // will pass the type checker an show the wrapper object in the console
    // console.log(safe("a")("b")("____number")) // will still not pass the type checker
    console.log(safe('a')('b')('number').val('DEFAULT'), 'This should show the value 1');
    console.log(safe('a')('b')('someUndef').val(undefined), "This should show the value 'undefined'");
    console.log(safe('a')('b')('someUndef').val('DEFAULT'), "This should show the string 'DEFAULT'");
    console.log(JSON.stringify(safe('a')('b')('c')('otherNumber').vals()), 'This should show [2, 3]');
    // console.log(safe('a')('b')('someSimpleArray').val()) // doesn't pass the type checker because this is always an array
    console.log(safe('a')('b')('someSimpleArray').vals(), "this should be ['a']");
    console.log(JSON.stringify(safe('a')('b')('c')('otherNumber').val('Default')), 'This should show 2'); // DOES type check because this is not always an array. It will return the first found value in case of an array
    console.log(JSON.stringify(safe('a')('b')('c')('subArray').vals()), 'This should show [4, 5]');

    // note that the string properties still give you autocomplete
}
