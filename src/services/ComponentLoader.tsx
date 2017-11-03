import React from 'react';

import ContentTitle from '../components/content/ContentTitle';
import ContentImage from '../components/content/ContentImage';
import ContentLink from '../components/content/ContentLink';
import ContentKeyValue from '../components/content/ContentKeyValue';
import ContentDivider from '../components/content/ContentDivider';
import { ComponentConfig, Entity, Value, LeafComponentConfig, FormatterConfig } from '../typings/schema';
import { valueToString } from '../services/getValue';

interface TypedUri { 
    uri: string; 
    type: string;
}
type uriOrString = string | TypedUri;

type pathResult = uriOrString[] | uriOrString | undefined;

// `type: never` makes the type checker report an error if the case switch does not handle all types
function checkUnknownComponent(type: never) {
    console.error(`Type ${(type as ComponentConfig).type} is not handled!`);
}

function isValue(obj: Value | Entity): obj is Value {
    return obj.hasOwnProperty('value');
}

function walkPath(pathStr: string | undefined, formatters: FormatterConfig, entity: Entity): pathResult {
    if (pathStr) {
        const path = pathStr.split('.').map(segment => segment.split(':')[0]);
        
        return walkPathStep(path, formatters, entity);
    }
    return undefined;
}

function walkPathStep(path: string[], formatters: FormatterConfig, entity: Entity): pathResult {
    if (path.length === 0) {
        return entity.uri;
    }
    let result = entity[path[0]];

    if (!result) {
        return undefined;
    } else if (Array.isArray(result)) {
        let retVal: uriOrString[] = [];
        for (const item of result) {
            if (isValue(item)) {
                retVal.push(valueToString(item, formatters.concat([{
                    type: 'http://timbuctoo.huygens.knaw.nl/datatypes/person-name',
                    name: 'PERSON_NAMES'
                }])));
            } else {
                const subResult = walkPathStep(path.slice(1), formatters, item);
                if (subResult) {
                    if (Array.isArray(subResult)) {
                        retVal = retVal.concat(subResult);
                    } else {
                        retVal.push(subResult);
                    }
                }
            }
        }
        return retVal;
    } else if (typeof result === 'string') {
        console.log(entity, entity.__typename);
        return {
            uri: result,
            type: entity.__typename
        };
    } else if (isValue(result)) {
        return valueToString(result, formatters.concat([{
            type: 'http://timbuctoo.huygens.knaw.nl/datatypes/person-name',
            name: 'PERSON_NAMES'
        }]));
    } else {
        return walkPathStep(path.slice(1), formatters, result);
    }
}

function getValueOrLiteral(component: LeafComponentConfig | undefined, data: Entity): pathResult {
    if (!component) {
        return undefined;
    } else {
        switch (component.type) {
            case 'PATH':
                return walkPath(component.value, component.formatter, data);
            case 'LITERAL':
                return component.value;
            default:
                checkUnknownComponent(component);
                return undefined;
        }
    }
}

function normalize(result: pathResult): {normalized: uriOrString[], wasSingle: boolean} {
    if (!result) {
        return { normalized: [], wasSingle: true };
    } else if (Array.isArray(result)) {
        return { normalized: result, wasSingle: false };
    } else if (typeof result === 'string') {
        if (!result || result === '') {
            return { normalized: [], wasSingle: true };
        } else {
            return { normalized: [result], wasSingle: true };
        }
    } else {
        if (!result.uri || result.uri === '') {
            return { normalized: [], wasSingle: true };
        } else {
            return { normalized: [result], wasSingle: true };
        }
    }
}

function join(result: uriOrString[]): string | null {
    if (result.length === 0) {
        return null;
    } else {
        return result.join(', ');
    }
}

function makeArraysOfSameLength(arrA: pathResult, arrB: pathResult): [uriOrString[], uriOrString[]] {
    let { normalized: normalizedA, wasSingle: wasSingleA } = normalize(arrA);
    let { normalized: normalizedB, wasSingle: wasSingleB } = normalize(arrB);
    
    if (wasSingleA && !wasSingleB) {
        normalizedA = normalizedB.map(() => normalizedA[0]);
    }
    if (wasSingleB && !wasSingleA) {
        normalizedB = normalizedA.map(() => normalizedB[0]);
    }

    if (normalizedA.length > normalizedB.length) {
        normalizedB.length = normalizedA.length;
    }
    if (normalizedB.length > normalizedA.length) {
        normalizedA.length = normalizedB.length;
    }
    return [normalizedA, normalizedB];
}

function valOrUri(item: string | {uri: string}): string {
    return typeof item === 'string' ? item : item.uri;
}

function safeGet<T, U extends keyof T>(arr: T | undefined, index: U): T[U] | undefined {
    if (arr) {
        return arr[index];
    } else {
        return undefined;
    }
}

export class ComponentLoader extends React.Component<{ data: Entity, componentConfig: ComponentConfig, idPerUri: { [key: string]: string | undefined } }, {}> {
    render(): JSX.Element | JSX.Element[] | null | string {
        const { data, componentConfig } = this.props;
        switch (componentConfig.type) {
            case 'DIVIDER':
                return <ContentDivider>{join(normalize(getValueOrLiteral(safeGet(componentConfig.subComponents, '0'), data)).normalized)}</ContentDivider>;
            case 'TITLE':
                return <ContentTitle>{normalize(getValueOrLiteral(safeGet(componentConfig.subComponents, '0'), data)).normalized[0]}</ContentTitle>;
            case 'LITERAL':
                return componentConfig.value || null;
            case 'PATH':
                return normalize(walkPath(componentConfig.value, componentConfig.formatter, data)).normalized.map((x, i) => <li key={i}>{x}</li>);
            case 'IMAGE':
                const [srcs, alts] = makeArraysOfSameLength(
                    getValueOrLiteral(safeGet(componentConfig.subComponents, '0'), data),
                    getValueOrLiteral(safeGet(componentConfig.subComponents, '1'), data)
                );
                // What to do if the arrays are of a different size? use empty string for all the different items
                return srcs.map((src, i) => (
                    <ContentImage
                        key={i}
                        src={valOrUri(src)}
                        alt={valOrUri(alts[i])}
                        options={{}}
                    />
                ));
            case 'LINK':
                const [tos, values] = makeArraysOfSameLength(
                    getValueOrLiteral(safeGet(componentConfig.subComponents, '0'), data),
                    getValueOrLiteral(safeGet(componentConfig.subComponents, '1'), data)
                );
                const retVal: JSX.Element[] = [];
                tos.forEach((to, i) => {
                    if (typeof to !== 'string') {
                        console.log(this.props.idPerUri, to.type, this.props.idPerUri[to.type]);
                        retVal.push(
                            <ContentLink
                                key={i}
                                to={'../' + this.props.idPerUri[to.type] + '/' + encodeURIComponent(to.uri)}
                                value={valOrUri(values[i])}
                            />
                        );
                    }
                });
                return retVal;
            case 'KEYVALUE':
                return <ContentKeyValue label={componentConfig.value} data={data} >{(componentConfig.subComponents || []).map((component: ComponentConfig, index: number) => <ComponentLoader key={index} componentConfig={component} data={data} idPerUri={this.props.idPerUri} />)}</ContentKeyValue>;
            default:
                checkUnknownComponent(componentConfig);
                return process.env.NODE_ENV === 'development' ? 
                    <span style={{ color: 'white', background: 'red' }}>unhandled: {JSON.stringify(componentConfig)}</span> : 
                    null;
        }
    }
}
