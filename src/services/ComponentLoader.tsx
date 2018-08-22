import React from 'react';

import ContentTitle from '../components/content/ContentTitle';
import ContentImage from '../components/content/ContentImage';
import ContentLink from '../components/content/ContentLink';
import ContentKeyValue from '../components/content/ContentKeyValue';
import ContentDivider from '../components/content/ContentDivider';
import ContentValue from '../components/content/ContentValue';

import { pathResult, walkPath } from './propertyPath';
import { safeGet } from './GetDataSetValues';

import { ComponentConfig, Entity, LeafComponentConfig } from '../typings/schema';

// `type: never` makes the type checker report an error if the case switch does not handle all types
function checkUnknownComponent(type: never) {}

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

function getUriWithType(
    component: LeafComponentConfig | null,
    data: Entity
): Array<{ uri: string; __typename: string }> {
    if (!component) {
        return [];
    } else {
        if (component.type !== 'PATH') {
            return [];
        } else {
            try {
                const uris = walkPath(component.value, [], data);
                const typenames = walkPath(
                    JSON.stringify(
                        JSON.parse(component.value as string)
                            .slice(0, -1)
                            .concat([['Entity', '__typename']])
                    ),
                    [],
                    data
                );
                if (uris === null || typenames == null) {
                    return [];
                } else if (Array.isArray(uris)) {
                    return uris.map((uri, i) => ({ uri, __typename: typenames[i] }));
                } else {
                    return [{ uri: uris, __typename: typenames as string }];
                }
            } catch (e) {
                return [];
            }
        }
    }
}

function normalize(result: pathResult): { normalized: string[]; wasSingle: boolean } {
    if (!result) {
        return { normalized: [], wasSingle: true };
    } else if (Array.isArray(result)) {
        return { normalized: result, wasSingle: false };
    } else if (result === '') {
        return { normalized: [], wasSingle: true };
    } else {
        return { normalized: [result], wasSingle: true };
    }
}

function makeArraysOfSameLength(arrA: pathResult, arrB: pathResult): [string[], string[]] {
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

function asArray(input: pathResult, length?: number): string[] {
    if (input == null) {
        return [];
    } else if (Array.isArray(input)) {
        return input;
    } else {
        const result = [];
        for (let i = 0; i < (length || 1); i++) {
            result[i] = input;
        }
        return result;
    }
}

export class ComponentLoader extends React.Component<
    { data: Entity; componentConfig: ComponentConfig; idPerUri: { [key: string]: string | undefined } },
    {}
> {
    render(): JSX.Element | JSX.Element[] | null | string {
        const { data, componentConfig } = this.props;

        switch (componentConfig.type) {
            case 'DIVIDER':
                return (
                    <ContentDivider>
                        {normalize(getValueOrLiteral(safeGet(componentConfig.subComponents, '0'), data)).normalized[0]}
                    </ContentDivider>
                );
            case 'TITLE':
                return (
                    <ContentTitle>
                        {normalize(getValueOrLiteral(safeGet(componentConfig.subComponents, '0'), data)).normalized[0]}
                    </ContentTitle>
                );
            case 'LITERAL':
                return <ContentValue value={componentConfig.value} />;
            case 'PATH':
                return normalize(walkPath(componentConfig.value, componentConfig.formatter, data)).normalized.map(
                    (x, i) => <ContentValue key={i} value={x as string} />
                );
            case 'IMAGE':
                const [srcs, alts] = makeArraysOfSameLength(
                    getValueOrLiteral(safeGet(componentConfig.subComponents, '0'), data),
                    getValueOrLiteral(safeGet(componentConfig.subComponents, '1'), data)
                );
                // What to do if the arrays are of a different size? use empty string for all the different items
                return srcs.map((src, i) => <ContentImage key={i} src={src} alt={alts[i]} options={{}} />);
            case 'INTERNAL_LINK':
            case 'LINK':
                const uris =
                    componentConfig.type === 'INTERNAL_LINK'
                        ? getUriWithType(safeGet(componentConfig.subComponents, '0'), data).map(
                              (to, i) => '../' + this.props.idPerUri[to.__typename] + '/' + encodeURIComponent(to.uri)
                          )
                        : asArray(getValueOrLiteral(safeGet(componentConfig.subComponents, '0'), data));
                const values = asArray(
                    getValueOrLiteral(safeGet(componentConfig.subComponents, '1'), data),
                    uris.length
                );
                return uris.map((uri, i) => <ContentLink key={i} to={uri} value={values[i]} />);
            case 'KEYVALUE':
                return (
                    <ContentKeyValue label={componentConfig.value} data={data}>
                        {(componentConfig.subComponents || []).map((component: ComponentConfig, index: number) => (
                            <ComponentLoader
                                key={index}
                                componentConfig={component}
                                data={data}
                                idPerUri={this.props.idPerUri}
                            />
                        ))}
                    </ContentKeyValue>
                );
            default:
                checkUnknownComponent(componentConfig);
                return process.env.NODE_ENV === 'development' ? (
                    <span style={{ color: 'white', background: 'red' }}>
                        unhandled: {JSON.stringify(componentConfig)}
                    </span>
                ) : null;
        }
    }
}
