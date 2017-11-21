import React from 'react';

import ContentTitle from '../components/content/ContentTitle';
import ContentImage from '../components/content/ContentImage';
import ContentLink from '../components/content/ContentLink';
import ContentKeyValue from '../components/content/ContentKeyValue';
import ContentDivider from '../components/content/ContentDivider';
import ContentValue from '../components/content/ContentValue';

import { pathResult, uriOrString, walkPath } from './walkPath';
import { safeGet } from './GetDataSetValues';

import { ComponentConfig, Entity, LeafComponentConfig } from '../typings/schema';

// `type: never` makes the type checker report an error if the case switch does not handle all types
function checkUnknownComponent(type: never) {
    console.error(`Type ${(type as ComponentConfig).type} is not handled!`);
}

function getValueOrLiteral(component: LeafComponentConfig | null, data: Entity): pathResult {
    if (!component) {
        return null;
    } else {
        switch (component.type) {
            case 'PATH':
                return walkPath(component.value, component.formatter, data);
            case 'LITERAL':
                return component.value || null;
            default:
                checkUnknownComponent(component);
                return null;
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

export class ComponentLoader extends React.Component<{ data: Entity, componentConfig: ComponentConfig, idPerUri: { [key: string]: string | undefined } }, {}> {

    render(): JSX.Element | JSX.Element[] | null | string {
        const { data, componentConfig } = this.props;

        console.log(componentConfig);

        switch (componentConfig.type) {
            case 'DIVIDER':
                return <ContentDivider>{normalize(getValueOrLiteral(safeGet(componentConfig.subComponents, '0'), data)).normalized[0]}</ContentDivider>;
            case 'TITLE':
                return <ContentTitle>{normalize(getValueOrLiteral(safeGet(componentConfig.subComponents, '0'), data)).normalized[0]}</ContentTitle>;
            case 'LITERAL':
                return <ContentValue value={componentConfig.value} />;
            case 'PATH':
                return normalize(walkPath(componentConfig.value, componentConfig.formatter, data)).normalized.map((x, i) => <ContentValue key={i} value={x as string} />);
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
